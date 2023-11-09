import fastify from 'fastify'
import apiPlugin from './plugins/api'
import clientPlugin from './plugins/client'
import databasePlugin from '@server/plugins/database'

const app = fastify({
	ignoreDuplicateSlashes: true,
	ignoreTrailingSlash: true,
	logger: true,
})

async function main() {
	const serverURL = new URL(
		import.meta.env.SERVER_URL ?? 'http://localhost:3001',
	)

	await databasePlugin(app)
	await app.register(apiPlugin)
	await app.register(clientPlugin)

	await app.listen({
		port: parseInt(serverURL.port),
	})

	console.log(
		app.printRoutes({
			commonPrefix: true,
			includeHooks: true,
		}),
	)
}

main()
