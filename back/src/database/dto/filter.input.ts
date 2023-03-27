import { Field, InputType } from '@nestjs/graphql'
import { PaginationInput } from './pagination.input'
import { GraphQLLocalTime } from 'graphql-scalars'
import { Difficulty } from 'src/recipe/enums/difficulty.enum'

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

	@Field(() => GraphQLLocalTime, { nullable: true })
	maximumCookingTime?: string

	@Field(() => [Difficulty], { nullable: true })
	difficultiesSelected?: Difficulty[]
}
