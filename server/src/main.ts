import apiPlugin from '@server/plugins/api';
import fastify, { FastifyPluginAsync } from 'fastify';

const app = fastify({
	ignoreDuplicateSlashes: true,
	ignoreTrailingSlash: true,
	logger: true,
});

const serverURL = new URL(import.meta.env.SERVER_URL);

async function main() {
	await app.register(apiPlugin, {
		prefix: import.meta.env.SERVER_API_PATH,
	});

	await app.listen({
		port: parseInt(serverURL.port),
	});

	console.log(
		app.printRoutes({
			commonPrefix: true,
			includeHooks: true,
			includeMeta: true,
		}),
	);
}

main();
