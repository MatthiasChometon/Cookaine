import { InputType, IntersectionType, PickType } from '@nestjs/graphql'
import { Ingredient } from 'src/ingredient/entities/ingredient.entity'
import { RecipeIngredient } from 'src/ingredient/entities/recipe-ingredient.entity'

@InputType()
class CreateRecipeIngredientInputData extends PickType(RecipeIngredient, [
	'quantity',
	'mesureUnit',
]) {}

@InputType()
class CreateIngredientInputData extends PickType(Ingredient, ['id']) {}

@InputType()
export class CreateRecipeIngredientInput extends IntersectionType(
	CreateRecipeIngredientInputData,
	CreateIngredientInputData,
) {}
