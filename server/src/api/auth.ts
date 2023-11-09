import { LoginCreds } from '@gardenia/shared'
import { inRecord, isString, sleep } from '@sa-net/utils'
import { User } from '@server/database/models/User'
import { ServerError } from '@server/includes/ServerError'
import { comparePassword } from '@server/utils/passwords'
import { FastifyInstance } from 'fastify'

export default async function authRoute(instance: FastifyInstance) {
	instance.get('/auth', async request => {
		if (!request.authed) throw new ServerError('Not authenticated', 401)
		return request.authed
	})

	const invalidCredsError = new ServerError('Invalid login credentials', 400)
	instance.post<{
		Body: LoginCreds
	}>('/auth', async request => {
		if (!inRecord(request.body, ['username', 'password']))
			throw invalidCredsError

		const { username, password } = request.body
		const areNotStrings = !isString(username) || !isString(password)
		const areEmpty = !username.length && !password.length

		if (areNotStrings || areEmpty) throw invalidCredsError

		const user = await User.findOne({
			where: { name: username },
			select: {
				name: true,
				password: true,
			},
		})
		if (!user) {
			await sleep(1000)
			throw invalidCredsError
		}

		const isValid = await comparePassword(password, user.password!)
		if (!isValid) {
			await sleep(1000)
			throw invalidCredsError
		}

		request.session.set('authed', user.name)
		await request.session.save()

		const fullUser = await User.findOneByOrFail({
			name: user.name,
		})

		return fullUser
	})

	instance.delete('/auth', async request => {
		if (!request.authed) throw new ServerError('Not authenticated', 401)
		await request.session.destroy()
		return { success: true }
	})
}
