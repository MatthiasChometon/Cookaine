import { Injectable, Scope } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RecipeIngredient } from '../entities/recipe-ingredient.entity'
import { Repository } from 'typeorm'
import { IngredientService } from '../ingredient.service'
import { CreateRecipeIngredientInput } from 'src/recipe/dto/create-recipe-ingredient.input'
import { Recipe } from 'src/recipe/entities/recipe.entity'

@Injectable({ scope: Scope.TRANSIENT })
export class UpdateRecipeIngredientService {
	constructor(
		@InjectRepository(RecipeIngredient)
		private readonly recipeIngredientRepository: Repository<RecipeIngredient>,
		private readonly ingredientService: IngredientService,
	) {}

	async run(ingredients: CreateRecipeIngredientInput[], recipe: Recipe): Promise<void> {
		await this.recipeIngredientRepository.delete({ recipe: { id: recipe.id } })
		await this.ingredientService.createRecipeIngredients(ingredients, recipe)
	}
}
