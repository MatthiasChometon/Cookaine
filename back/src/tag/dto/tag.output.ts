import { Field, ID, ObjectType, PickType } from '@nestjs/graphql'
import { Tag } from '../entities/tag.entity'

@ObjectType()
export class TagOutput extends PickType(Tag, ['name']) {
	@Field(() => ID)
	tagId: string

	@Field(() => ID)
	recipeTagId: string

	@Field()
	name: string
}
