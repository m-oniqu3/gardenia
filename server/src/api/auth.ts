import { sleep } from '@sa-net/utils';
import { FastifyInstance } from 'fastify';

export default async function (instance: FastifyInstance) {
	instance.get('/auth', async (request, reply) => {
		await sleep(2000); // Simulate a slow request
		return request.cookies.name ?? null;
	});

	instance.post<{
		Body: {
			username: string;
		};
	}>('/auth', async (request, reply) => {
		await sleep(2000); // Simulate a slow request
		reply.setCookie('name', request.body.username);
		return request.body.username;
	});
}
