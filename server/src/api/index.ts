import type { FastifyInstance } from 'fastify'

export default async function indexRoute(instance: FastifyInstance) {
	instance.get('/', async () => {
		return 'hello, world!'
	})
}
