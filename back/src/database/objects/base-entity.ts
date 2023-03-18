import { Field, ID, ObjectType } from '@nestjs/graphql'
import { PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
export abstract class BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID)
	id: string
}
