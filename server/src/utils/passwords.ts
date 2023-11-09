import { demandEnv } from '@gardenia/shared'
import { compare, hash } from 'bcrypt'

const salt = demandEnv('SERVER_PASSWORD_SALT')

export function hashPassword(input: string) {
	return hash(`${salt}:${input}`, 10)
}

export function comparePassword(input: string, hash: string) {
	return compare(`${salt}:${input}`, hash)
}
