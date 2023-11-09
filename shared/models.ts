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
	password?: string
}
