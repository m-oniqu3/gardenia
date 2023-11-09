import { env } from '@gardenia/shared'
import { FastifyInstance } from 'fastify'
import path from 'path'
import fastifyStatic from '@fastify/static'
import { existsSync } from 'fs'

const clientDistDir = path.resolve(
	process.cwd(),
	env('CLIENT_DIST_DIR', 'dist/client')
)

export default async function clientPlugin(instance: FastifyInstance) {
	if (env('DEV')) return
	else if (!existsSync(clientDistDir))
		throw new Error(
			`Missing client dist directory: ${clientDistDir}. Did you forget to build the client?`
		)

	await instance.register(fastifyStatic, {
		root: clientDistDir,
		wildcard: false,
	})

	instance.get('*', async (_, reply) => {
		reply.sendFile('index.html')
	})
}
