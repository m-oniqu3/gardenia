import { env } from '@gardenia/shared'
import { ClassType, toEntries } from '@sa-net/utils'
import { User } from '@server/database/models/User'
import { hashPassword } from '@server/utils/passwords'
import { resolveFromRoot } from '@server/utils/resolveFromRoot'
import { FastifyInstance } from 'fastify'
import { BaseEntity, DataSource } from 'typeorm'

declare module 'fastify' {
	interface FastifyInstance {
		database: DataSource
	}
}

export default async function databasePlugin(instance: FastifyInstance) {
	const modelImports = import.meta.glob<{
		model?: ClassType<BaseEntity>
	}>('../database/models/**/*.ts', { eager: true })

	const models: ClassType<BaseEntity>[] = []
	for (const [path, im] of toEntries(modelImports)) {
		instance.log.info(`Importing model from: ${path}`)
		if (!im.model) instance.log.warn(`No model exported from ${path}`)
		else models.push(im.model)
	}

	const source = new DataSource({
		type: 'sqlite',
		database: resolveFromRoot('data/database.sqlite'),
		entities: models,
		synchronize: import.meta.env.DEV,
	})

	await source.initialize()
	instance.decorate('database', source)

	if (env('DEV')) {
		await User.init({
			name: 'admin',
			email: 'admin@dev.local',
			password: await hashPassword('admin'),
		}).save()
	}
}
