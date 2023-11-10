import {
	demandEnv,
	validateEmail,
	validatePassword,
	validateUsername,
} from '@gardenia/shared'
import { inRecord } from '@sa-net/utils'
import { User } from '@server/database/models/User'
import { UserRegistration } from '@server/database/models/UserRegistration'
import { ServerError } from '@server/includes/ServerError'
import { type FastifyInstance, type FastifyRequest } from 'fastify'

async function registerEndpoint(
	this: FastifyInstance,
	request: FastifyRequest<{
		Body: {
			name: string
			email: string
			password: string
		}
	}>,
) {
	const validateBody = () => {
		if (!inRecord(request.body, ['name', 'email', 'password']))
			throw new ServerError('Missing required fields', 400)
		const { name, email, password } = request.body

		const checks = {
			name: validateUsername(name),
			email: validateEmail(email),
			password: validatePassword(password),
		}

		// every check must be true
		if (!checks.name || !checks.email || !checks.password) {
			const errors = []
			if (!checks.name) errors.push('name')
			if (!checks.email) errors.push('email')
			if (!checks.password) errors.push('password')

			throw new ServerError(`Invalid input: ${errors.join(', ')}`, 400)
		}
	}

	const checkForExistingUser = async () => {
		const { name, email } = request.body

		// check if user exists
		const existing = await User.findOne({
			where: [{ name }, { email }],
		})

		if (existing) throw new ServerError('User already exists', 400)
	}

	const createUserAndRegistration = async () => {
		const { name, email, password } = request.body

		// create new user
		const user = await User.init({
			name,
			email,
			password,
		}).save()

		const registration = await UserRegistration.init({
			userName: user.name,
		}).save()

		return { user, registration }
	}

	const sendMail = async (user: User, reg: UserRegistration) => {
		// we want to try catch this so we can delete the user and registration if it fails
		try {
			const registrationURL = new URL(
				`/register/${reg.uuid}`,
				demandEnv('CLIENT_URL'),
			)

			const sent = await this.sendMail({
				to: user.email,
				subject: 'Gardenia - Verify your email',
				text: `Please verify your email by clicking the link below:\n\n${registrationURL}`,
			})

			return sent && sent.accepted.includes(user.email)
		} catch (error) {
			this.log.warn(error, 'Failed to send verification email')
			return false
		}
	}

	try {
		validateBody()
		await checkForExistingUser()
		const { user, registration } = await createUserAndRegistration()
		const sent = await sendMail(user, registration)

		if (sent) return { success: true }

		await user.remove()
		await registration.remove()
		throw new ServerError('Failed to send verification email', 500)
	} catch (error) {
		this.log.warn(error, 'Failed to register user')
		if (error instanceof ServerError) throw error
		throw new ServerError('unknown error', 500)
	}
}

async function registerVerifyEndpoint(
	this: FastifyInstance,
	request: FastifyRequest<{
		Params: { code: string }
	}>,
) {
	const { code } = request.params
	const registration = await UserRegistration.findOneBy({ uuid: code })

	if (!registration) throw new ServerError('Invalid registration code', 400)

	const user = await User.findOneBy({ name: registration.userName })
	await registration.remove()

	return user
}

export default async function registerRoute(instance: FastifyInstance) {
	instance
		.post('/register', registerEndpoint)
		.get('/register/:code', registerVerifyEndpoint)
}
