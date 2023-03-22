import { Field, InputType } from '@nestjs/graphql'
import { PaginationInput } from './pagination.input'

@InputType()
export class FilterInput {
	@Field(() => String, { nullable: true })
	userId?: string

	@Field(() => Boolean, { nullable: true })
	isFromConnectedUser?: boolean

	@Field({ nullable: true })
	search?: string

	@Field({ nullable: true })
	pagination?: PaginationInput
}
