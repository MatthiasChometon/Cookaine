import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class PaginationInput {
	@Field(() => Int)
	itemsPerPage: number

	@Field(() => Int)
	page: number
}
