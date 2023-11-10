import { UserRegistrationData } from '@gardenia/shared'
import { ModelUUID } from '@server/database/Model'
import { User } from '@server/database/models/User'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

@Entity()
export class UserRegistration
	extends ModelUUID<UserRegistrationData>
	implements UserRegistrationData
{
	@Column('varchar', { length: 255 })
	declare userName: string

	@OneToOne(() => User, user => user.registration, { cascade: true })
	@JoinColumn({ name: 'userName', referencedColumnName: 'name' })
	declare user?: User
}

export const model = UserRegistration
