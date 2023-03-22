import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Ingredient } from './entities/ingredient.entity'
import { Repository } from 'typeorm'
import { CreateIngredientInput } from './dto/create-ingredient.input'
import { UpdateIngredientInput } from './dto/update-ingredient.input'
import { IngredientOuput } from 'src/recipe/dto/ingredient.output'
import { RecipeIngredient } from './entities/recipe-ingredient.entity'

@Injectable()
export class IngredientService {
	constructor(
		@InjectRepository(Ingredient)
		private readonly ingredientRepository: Repository<Ingredient>,
	) {}

	async updateIngredient(id: string, input: UpdateIngredientInput): Promise<Ingredient> {
		await this.ingredientRepository.update({ id }, input)
		return await this.ingredientRepository.findOneByOrFail({ id })
	}

	async createIngredient(input: CreateIngredientInput): Promise<Ingredient> {
		const result = await this.ingredientRepository.insert(input)
		const id = result.identifiers[0].id
		return await this.ingredientRepository.findOneByOrFail({ id })
	}

	convertToIngredientListOuput(recipeIngredientList: RecipeIngredient[]): IngredientOuput[] {
		return recipeIngredientList.map((recipeIngredient) =>
			this.convertToIngredientOuput(recipeIngredient),
		)
	}

	convertToIngredientOuput(recipeIngredient: RecipeIngredient): IngredientOuput {
		const { quantity, mesureUnit, id: recipeIngredientId, ingredient } = recipeIngredient
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
}
