import { Field, ObjectType, OmitType } from '@nestjs/graphql'
import { Recipe } from '../entities/recipe.entity'
import { IngredientOutput } from './ingredient.output'
import { TagOutput } from 'src/tag/dto/tag.output'

@ObjectType()
export class RecipeOutput extends OmitType(Recipe, ['recipeIngredients', 'recipeTags']) {
	@Field(() => [IngredientOutput], { defaultValue: [] })
	ingredients: IngredientOutput[]

	@Field(() => [TagOutput], { defaultValue: [] })
	tags: TagOutput[]
}
