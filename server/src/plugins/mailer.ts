import { demandEnv } from '@gardenia/shared'
import { FastifyInstance } from 'fastify'
import {
	Transporter,
	createTransport,
	type SendMailOptions,
	type SentMessageInfo,
} from 'nodemailer'

declare module 'fastify' {
	interface FastifyInstance {
		mailer: Transporter
		sendMail: (
			options: Omit<SendMailOptions, 'from'>,
		) => Promise<SentMessageInfo | false>
	}
}

export default async function mailerPlugin(instance: FastifyInstance) {
	const mailer = createTransport({
		host: demandEnv('SERVER_SMTP_HOST'),
		port: Number(demandEnv('SERVER_SMTP_PORT')),
		auth: {
			user: demandEnv('SERVER_SMTP_USER'),
			pass: demandEnv('SERVER_SMTP_PASS'),
		},
	})

	let isVerified = false
	instance.log.info('Verifying SMTP connection...')
	// do not wait for this to finish, may take longer than fastify allows for plugins
	mailer
		.verify()
		.then(() => {
			instance.log.info('SMTP connection verified.')
			isVerified = true
		})
		.catch(err => instance.log.error(err, 'SMTP connection failed.'))

	instance.decorate('mailer', mailer)
	instance.decorate('sendMail', async (options: SendMailOptions) => {
		if (!isVerified) return false
		return await mailer.sendMail({
			...options,
			from: demandEnv('SERVER_SMTP_FROM'),
		})
	})
}
