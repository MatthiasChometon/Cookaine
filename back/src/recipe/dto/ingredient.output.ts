import { Field, ID, IntersectionType, ObjectType, PickType } from '@nestjs/graphql'
import { Ingredient } from 'src/ingredient/entities/ingredient.entity'
import { RecipeIngredient } from 'src/ingredient/entities/recipe-ingredient.entity'
import { MesureUnit } from 'src/ingredient/enums/mesure-unit.enum'

@ObjectType()
class IngredientOutputData extends PickType(Ingredient, ['name', 'previewPicture']) {}
@ObjectType()
class RecipeIngredientOutputData extends PickType(RecipeIngredient, ['quantity', 'mesureUnit']) {}

@ObjectType()
export class IngredientOutput extends IntersectionType(
	IngredientOutputData,
	RecipeIngredientOutputData,
) {
	@Field(() => ID)
	ingredientId: string

	@Field(() => ID)
	recipeIngredientId: string

	@Field(() => [MesureUnit], { defaultValue: [] })
	possibleMesureUnits: MesureUnit[]
}
