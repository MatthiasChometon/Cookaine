import { Field, ObjectType, OmitType } from '@nestjs/graphql'
import { Recipe } from '../entities/recipe.entity'
import { IngredientOuput } from './ingredient.output'

@ObjectType()
export class RecipeOutput extends OmitType(Recipe, ['recipeIngredients']) {
	@Field(() => [IngredientOuput], { defaultValue: [] })
	ingredients: IngredientOuput[]
}
