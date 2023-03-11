import { Field, ID, ObjectType } from '@nestjs/graphql'
import { PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
export abstract class BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: number
}
