import type { UserData } from '@gardenia/shared'
import { Model } from '@server/database/Model'
import { Column, Entity } from 'typeorm'

@Entity()
export class User extends Model<UserData> implements UserData {
	@Column('varchar', { length: 255, primary: true })
	declare name: string

	@Column('varchar', { length: 255, unique: true })
	declare email: string

	@Column('varchar', { length: 255, select: false, nullable: true })
	declare password?: string

	@Column('varchar', { length: 255, nullable: true })
	declare registration: string | null
}

export const model = User
