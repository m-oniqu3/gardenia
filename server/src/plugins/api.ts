import { FastifyInstance, FastifyPluginAsync } from 'fastify'

const apiImports = import.meta.glob<{
	default: FastifyPluginAsync
}>('../api/**/*.ts', {
	eager: true,
})

export default async function apiPlugin(instance: FastifyInstance) {
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
