export function env(name: keyof ImportMetaEnv, backup: string): string
export function env(name: keyof ImportMetaEnv): string | null
export function env(name: keyof ImportMetaEnv, backup?: string): string | null {
	return import.meta.env[name] ?? backup ?? null
}

export function demandEnv(name: keyof ImportMetaEnv): string {
	const value = env(name)
	if (value === null) throw new Error(`Missing environment variable: ${name}`)
	return value
}
