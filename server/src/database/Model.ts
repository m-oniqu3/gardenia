import { ModelData, ModelIDData, ModelUUIDData } from '@gardenia/shared'
import { ClassType, assign } from '@sa-net/utils'
import {
	BaseEntity,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

export abstract class Model<Data extends ModelData>
	extends BaseEntity
	implements ModelData
{
	static init<M extends Model<any>>(
		this: ClassType<M>,
		data: Partial<M['@data']>,
	) {
		const model = new this()
		return model.assign(data)
	}

	// type only property
	declare '@data': Data

	@CreateDateColumn()
	declare created: string

	@UpdateDateColumn()
	declare updated: string

	@DeleteDateColumn()
	declare deleted?: string | undefined

	assign(data: Partial<Data>) {
		assign(this, data)
		return this
	}
}

export abstract class ModelID<Data extends ModelIDData>
	extends Model<Data>
	implements ModelIDData
{
	@PrimaryGeneratedColumn('increment')
	declare id: number
}

export abstract class ModelUUID<Data extends ModelUUIDData>
	extends Model<Data>
	implements ModelUUIDData
{
	@PrimaryGeneratedColumn('uuid')
	declare uuid: string
}
