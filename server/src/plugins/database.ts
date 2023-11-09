import { env } from '@gardenia/shared'
import { User } from '@server/database/models/User'
import { hashPassword } from '@server/utils/passwords'
import { resolveFromRoot } from '@server/utils/resolveFromRoot'
import { FastifyInstance } from 'fastify'
import { DataSource } from 'typeorm'

declare module 'fastify' {
	interface FastifyInstance {
		database: DataSource
	}
}

export default async function databasePlugin(instance: FastifyInstance) {
	const source = new DataSource({
		type: 'sqlite',
		database: resolveFromRoot('data/database.sqlite'),
		entities: [User],
		synchronize: import.meta.env.DEV,
	})

	await source.initialize()
	instance.decorate('database', source)

	if (env('DEV')) {
		await User.init({
			name: 'admin',
			password: await hashPassword('admin'),
		}).save()
	}
}
