import { UserData } from '@gardenia/shared'
import { Model } from '@server/database/Model'
import { Column, Entity } from 'typeorm'

@Entity()
export class User extends Model<UserData> implements UserData {
	@Column('varchar', { length: 255, primary: true })
	declare name: string

	@Column('varchar', { length: 255, select: false })
	declare password?: string
}
