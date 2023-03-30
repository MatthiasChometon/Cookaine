import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Ingredient } from './entities/ingredient.entity'
import { Repository } from 'typeorm'
import { CreateIngredientInput } from './dto/create-ingredient.input'
import { UpdateIngredientInput } from './dto/update-ingredient.input'
import { IngredientOutput } from 'src/recipe/dto/ingredient.output'
import { RecipeIngredient } from './entities/recipe-ingredient.entity'
import { CreateRecipeIngredientInput } from 'src/recipe/dto/create-recipe-ingredient.input'
import { Recipe } from 'src/recipe/entities/recipe.entity'

@Injectable()
export class IngredientService {
	constructor(
		@InjectRepository(Ingredient)
		private readonly ingredientRepository: Repository<Ingredient>,
		@InjectRepository(RecipeIngredient)
		private readonly recipeIngredientRepository: Repository<RecipeIngredient>,
	) {}

	async removeIngredient(id: string): Promise<Ingredient> {
		const [ingredientRemoved] = await Promise.all([
			this.ingredientRepository.findOneByOrFail({ id }),
			this.recipeIngredientRepository.softDelete({ ingredient: { id } }),
		])

		await this.ingredientRepository.softDelete({ id })
		return ingredientRemoved
	}

	async updateIngredient(id: string, input: UpdateIngredientInput): Promise<Ingredient> {
		await this.ingredientRepository.update({ id }, input)
		return await this.ingredientRepository.findOneByOrFail({ id })
	}

	async createIngredient(input: CreateIngredientInput): Promise<Ingredient> {
		const result = await this.ingredientRepository.insert(input)
		const id = result.identifiers[0].id
		return await this.ingredientRepository.findOneByOrFail({ id })
	}

	convertToIngredientListOuput(recipeIngredientList: RecipeIngredient[]): IngredientOutput[] {
		return recipeIngredientList.map((recipeIngredient) =>
			this.convertToIngredientOutput(recipeIngredient),
		)
	}

	convertToIngredientOutput(recipeIngredient: RecipeIngredient): IngredientOutput {
		const { quantity, mesureUnit, id: recipeIngredientId, ingredient } = recipeIngredient
		if (ingredient == null) console.log(recipeIngredient)
		const { id: ingredientId, name, previewPicture, mesureUnits: possibleMesureUnits } = ingredient
		return {
			ingredientId,
			recipeIngredientId,
			name,
			previewPicture,
			quantity,
			possibleMesureUnits,
			mesureUnit,
		}
	}

	async createRecipeIngredients(
		ingredients: CreateRecipeIngredientInput[],
		recipe: Recipe,
	): Promise<RecipeIngredient[]> {
		return await Promise.all(
			ingredients.map(async ({ id, quantity, mesureUnit }) => {
				const ingredient = await this.ingredientRepository.findOneByOrFail({ id })
				const recipeIngredient = this.recipeIngredientRepository.create({
					quantity,
					mesureUnit,
					ingredient,
					recipe,
				})
				await this.recipeIngredientRepository.insert(recipeIngredient)
				return recipeIngredient
			}),
		)
	}
}
