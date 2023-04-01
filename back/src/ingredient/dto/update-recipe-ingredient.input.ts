import { InputType, PartialType } from '@nestjs/graphql'
import { CreateRecipeIngredientInput } from 'src/recipe/dto/create-recipe-ingredient.input'

@InputType()
export class UpdateRecipeIngredientInput extends PartialType(CreateRecipeIngredientInput) {}
