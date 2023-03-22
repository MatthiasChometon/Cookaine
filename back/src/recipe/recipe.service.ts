import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Recipe } from './entities/recipe.entity'
import { Repository } from 'typeorm'
import { RecipeSearchInput } from './dto/recipe-search.input'
import { RecipeOutput } from './dto/recipe.output'
import { IngredientService } from 'src/ingredient/ingredient.service'

@Injectable()
export class RecipeService {
	constructor(
		@InjectRepository(Recipe)
		private readonly recipeRepository: Repository<Recipe>,
		private readonly ingredientService: IngredientService,
	) {}

	async search(input: RecipeSearchInput, userId?: string): Promise<RecipeOutput[]> {
		const { orderBy, filterBy } = input
		const { pagination, search, isFromConnectedUser } = filterBy
		const searchKeys = ['title', 'steps', 'ingredient.name']

		let query = this.recipeRepository
			.createQueryBuilder('recipe')
			.leftJoinAndSelect('recipe.creator', 'creator')
			.leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
			.leftJoinAndSelect('recipeIngredients.ingredient', 'ingredient')

		if (isFromConnectedUser) query = query.where('creator.id = :id', { id: userId })
		if (filterBy.userId) query = query.where('creator.id = :id', { id: filterBy.userId })
		if (search) {
			searchKeys.forEach(
				(key) =>
					(query = query.orWhere(`LOWER(${key}::text) LIKE :${key}`, {
						[key]: `%${search.toLowerCase()}%`,
					})),
			)
		}
		if (orderBy) query = query.orderBy(orderBy.name, orderBy.direction)
		if (pagination) {
			const { itemsPerPage, page } = pagination
			query = query.skip(itemsPerPage * (page - 1)).take(itemsPerPage)
		}

		const result = await query.getMany()
		const recipes = this.convertToRecipeOutputList(result)
		return recipes
	}

	convertToRecipeOutputList(recipes: Recipe[]): RecipeOutput[] {
		const recipesOuput = recipes.map(({ recipeIngredients, ...recipe }) => ({
			...recipe,
			ingredients: this.ingredientService.convertToIngredientListOuput(recipeIngredients),
		}))
		return recipesOuput
	}
}
