import { Injectable, Scope } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Recipe } from '../entities/recipe.entity'
import { Repository } from 'typeorm'
import { UpdateRecipeInput } from '../dto/update-recipe.input'
import { RecipeOutput } from '../dto/recipe.output'
import { RecipeService } from '../recipe.service'
import { UpdateRecipeIngredientService } from 'src/ingredient/services/updateRecipeIngredient.service'
import { UpdateRecipeTagService } from 'src/tag/services/update-recipe-tag.service'

@Injectable({ scope: Scope.TRANSIENT })
export class UpdateRecipeService {
	constructor(
		@InjectRepository(Recipe)
		private readonly recipeRepository: Repository<Recipe>,
		private readonly recipeService: RecipeService,
		private readonly updateRecipeIngredientService: UpdateRecipeIngredientService,
		private readonly updateRecipeTagService: UpdateRecipeTagService,
	) {}

	async run(id: string, input: UpdateRecipeInput, userId: string): Promise<RecipeOutput> {
		const { ingredients, tagIds, ...inputWithoutIngredients } = input
		const recipe = await this.recipeRepository.findOneByOrFail({ id, creator: { id: userId } })
		await Promise.all([
			this.recipeRepository.update({ id }, inputWithoutIngredients),
			this.updateRecipeIngredientService.run(ingredients, recipe),
			this.updateRecipeTagService.run(tagIds, recipe),
		])

		return await this.recipeService.details(id)
	}
}
