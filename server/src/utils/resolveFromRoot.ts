import path from 'path'

export function resolveFromRoot(...paths: string[]) {
	return path.resolve(__APP_ROOT__, ...paths)
}
