import fastifyCookie from '@fastify/cookie';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

const apiRouteImports = import.meta.glob<{
	default: FastifyPluginAsync;
}>('../api/**/*.ts', {
	eager: true,
});

const apiRoutes = Object.values(apiRouteImports).map(i => i.default);

export default async function apiPlugin(instance: FastifyInstance) {
	await instance.register(fastifyCookie);

	for (const route of apiRoutes) {
		await instance.register(route);
	}
}
