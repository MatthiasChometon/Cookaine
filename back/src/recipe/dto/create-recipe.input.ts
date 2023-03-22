import { InputType, Field, OmitType, Int } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'
import { Recipe } from '../entities/recipe.entity'
import { Difficulty } from '../enums/difficulty.enum'
import { CreateRecipeIngredientInput } from './create-recipe-ingredient.input'
import { GraphQLTime } from 'graphql-scalars'

@InputType()
export class CreateRecipeInput extends OmitType(Recipe, [
	'creationDate',
	'recipeIngredients',
	'recipeTags',
	'creator',
]) {
	@MinLength(1)
	@MaxLength(255)
	@Field()
	title: string

	@MinLength(1)
	@MaxLength(510)
	@Field()
	previewPicture: string

	@MinLength(1)
	@MaxLength(510)
	@Field()
	tutorialVideo: string

	@Field(() => GraphQLTime)
	cookingTime: string

	@Field(() => Difficulty)
	difficulty: Difficulty

	@Field(() => Int)
	portion: number

	@Field(() => [String])
	steps: string[]

	@Field(() => [CreateRecipeIngredientInput])
	ingredients: CreateRecipeIngredientInput[]

	@Field(() => [String])
	tagIds: string[]
}
