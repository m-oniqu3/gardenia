import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifySession from '@fastify/session'
import { demandEnv } from '@gardenia/shared'
import authPlugin from '@server/plugins/auth'
import { FastifyInstance, FastifyPluginAsync } from 'fastify'

const apiImports = import.meta.glob<{
	default: FastifyPluginAsync
}>('../api/**/*.ts', {
	eager: true,
})

export default async function apiPlugin(instance: FastifyInstance) {
	await instance
		.register(fastifyCors, {
			origin: demandEnv('SERVER_URL'),
			credentials: true,
		})
		.register(fastifyCookie)
		.register(fastifySession, {
			secret: demandEnv('SERVER_SESSION_SECRET'),
		})

	await authPlugin(instance)

	const apiRoutes: FastifyPluginAsync[] = []
	for (const [path, apiImport] of Object.entries(apiImports)) {
		instance.log.info(`Loading API route: ${path}`)
		if (apiImport.default) apiRoutes.push(apiImport.default)
		else instance.log.error(`No default export found for ${path}`)
	}

	for (const apiRoute of apiRoutes)
		await instance.register(apiRoute, {
			prefix: import.meta.env.SERVER_API_PATH,
		})
}
