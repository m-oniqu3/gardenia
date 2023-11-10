export interface ModelData {
	created: string
	updated: string
	deleted?: string
}

export interface ModelIDData extends ModelData {
	id: number
}

export interface ModelUUIDData extends ModelData {
	uuid: string
}

export interface UserData extends ModelData {
	name: string
	email: string
	password?: string
	registration: string | null
}

export interface UserRegistrationData extends ModelUUIDData {
	userName: string
	user?: UserData
}
