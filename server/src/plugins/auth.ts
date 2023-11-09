import { User } from '@server/database/models/User'
import { ServerError } from '@server/includes/ServerError'
import { FastifyInstance } from 'fastify'

declare module 'fastify' {
	interface FastifyRequest {
		authed: User | null
	}

	interface Session {
		authed: string
	}
}

export default async function authPlugin(instance: FastifyInstance) {
	instance.decorateRequest('authed', null)

	instance.addHook('onRequest', async request => {
		const authedName = request.session.get('authed')
		if (!authedName) return

		try {
			const user = await User.findOneByOrFail({ name: authedName })
			request.authed = user
		} catch (error) {
			instance.log.error(
				error,
				'failed to load session authed user from database',
			)

			throw new ServerError('Unauthorized', 401, error)
		}
	})
}
