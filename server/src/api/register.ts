import { demandEnv, validateEmail, validatePassword } from '@gardenia/shared'
import { inRecord } from '@sa-net/utils'
import { User } from '@server/database/models/User'
import { UserRegistration } from '@server/database/models/UserRegistration'
import { ServerError } from '@server/includes/ServerError'
import { type FastifyInstance } from 'fastify'

export default async function registerEndpoint(instance: FastifyInstance) {
	instance.post<{
		Body: {
			name: string
			email: string
			password: string
		}
	}>('/register', async request => {
		if (!inRecord(request.body, ['name', 'email', 'password']))
			throw new ServerError('Missing required fields', 400)
		const { name, email, password } = request.body

		const checks = {
			invalidEmail: !validateEmail(email),
			invalidPassword: !validatePassword(password),
		}

		// every check must be true
		if (checks.invalidEmail || checks.invalidPassword) {
			const errors = []
			if (checks.invalidEmail) errors.push('email')
			if (checks.invalidPassword) errors.push('password')

			throw new ServerError(`Invalid input: ${errors.join(', ')}`, 400)
		}

		// check if user exists
		const existing = await User.findOne({
			where: [
				{
					name: request.body.name,
				},
				{
					email: request.body.email,
				},
			],
		})

		if (existing) throw new ServerError('User already exists', 400)

		// create new user
		const user = await User.init({
			name,
			email,
			password,
		}).save()

		const registration = await UserRegistration.init({
			userName: user.name,
		}).save()

		const registrationURL = new URL(
			`/register/${registration.uuid}`,
			demandEnv('CLIENT_URL'),
		)

		const sent = await instance.sendMail({
			to: user.email,
			subject: 'Gardenia - Verify your email',
			text: `Please verify your email by clicking the link below:\n\n${registrationURL}`,
		})

		if (sent && sent.accepted.includes(user.email)) return { success: true }

		await user.remove()
		await registration.remove()
		throw new ServerError('Failed to send email', 500)
	})

	instance.get<{
		Params: { code: string }
	}>('/register/:code', async request => {
		const { code } = request.params
		const registration = await UserRegistration.findOneBy({ uuid: code })

		if (!registration) throw new ServerError('Invalid registration code', 400)

		const user = await User.findOneBy({ name: registration.userName })
		await registration.remove()

		return user
	})
}
