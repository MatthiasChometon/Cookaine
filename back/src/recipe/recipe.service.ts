import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Recipe } from './entities/recipe.entity'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { RecipeSearchInput } from './dto/recipe-search.input'
import { RecipeOutput } from './dto/recipe.output'
import { IngredientService } from 'src/ingredient/ingredient.service'
import { TagService } from 'src/tag/tag.service'
import { CreateRecipeInput } from './dto/create-recipe.input'
import { User } from 'src/user/methods/user.methods'

@Injectable()
export class RecipeService {
	constructor(
		@InjectRepository(Recipe)
		private readonly recipeRepository: Repository<Recipe>,
		private readonly ingredientService: IngredientService,
		private readonly tagService: TagService,
	) {}

	async deleteRecipe(id: string, user: User): Promise<Recipe> {
		const recipe = await this.recipeRepository.findOneOrFail({
			where: { id },
			relations: ['creator'],
		})
		if (!user.isCreatorOfRecipe(recipe.creator.id) && !user.isAdmin())
			throw new UnauthorizedException('You are not allowed to delete this recipe')
		await this.recipeRepository.softDelete(id)
		return recipe
	}

	async details(id: string): Promise<RecipeOutput> {
		const query = this.recipeRepository.createQueryBuilder('recipe').where('recipe.id = :id', { id })
		const recipe = await this.addTagsAndIngredientsToQuery(query).getOneOrFail()
		return this.convertToRecipeOutput(recipe)
	}

	addTagsAndIngredientsToQuery(query: SelectQueryBuilder<Recipe>): SelectQueryBuilder<Recipe> {
		return query
			.leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
			.leftJoinAndSelect('recipeIngredients.ingredient', 'ingredient', 'ingredient.id IS NOT NULL')
			.leftJoinAndSelect('recipe.recipeTags', 'recipeTags')
			.leftJoinAndSelect('recipeTags.tag', 'tag', 'tag.id IS NOT NULL')
	}

	async search(input: RecipeSearchInput, userId?: string): Promise<RecipeOutput[]> {
		const { orderBy, filterBy } = input
		const {
			pagination,
			search,
			isFromConnectedUser,
			maximumCookingTime,
			difficulties,
			tagNames,
			ingredientNames,
		} = filterBy
		const searchKeys = ['title', 'steps', 'ingredient.name', 'tag.name']

		let query = this.recipeRepository
			.createQueryBuilder('recipe')
			.leftJoinAndSelect('recipe.creator', 'creator')

		query = this.addTagsAndIngredientsToQuery(query)

		if (maximumCookingTime)
			query = query.andWhere('recipe.cookingTime <= :maximumCookingTime', { maximumCookingTime })
		if (difficulties?.length > 0)
			query = query.andWhere('recipe.difficulty IN (:...difficulties)', { difficulties })
		if (ingredientNames?.length > 0)
			query = query.andWhere('ingredient.name IN (:...ingredientNames)', { ingredientNames })
		if (tagNames?.length > 0) query = query.andWhere('tag.name IN (:...tagNames)', { tagNames })
		if (isFromConnectedUser) query = query.andWhere('creator.id = :id', { id: userId })
		if (filterBy.userId) query = query.andWhere('creator.id = :id', { id: filterBy.userId })
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
		const ouputRecipes = this.convertToRecipeOutputList(result)
		return ouputRecipes
	}

	convertToRecipeOutputList(recipes: Recipe[]): RecipeOutput[] {
		return recipes.map((recipe) => this.convertToRecipeOutput(recipe))
	}

	convertToRecipeOutput(recipe: Recipe): RecipeOutput {
		const { recipeIngredients, recipeTags, ...recipeOutput } = recipe
		const ingredients = this.ingredientService.convertToIngredientListOuput(recipeIngredients)
		const tags = this.tagService.convertToTagListOuput(recipeTags)
		return {
			...recipeOutput,
			ingredients,
			tags,
		}
	}

	async createRecipe(input: CreateRecipeInput, creator: User): Promise<RecipeOutput> {
		const { ingredients, tagIds, ...recipeInput } = input
		const recipe = this.recipeRepository.create({
			...recipeInput,
			creator,
			recipeIngredients: [],
			recipeTags: [],
		})

		const result = await this.recipeRepository.insert({
			...recipe,
			recipeIngredients: [],
			recipeTags: [],
		})
		recipe.id = result.identifiers[0].id

		await Promise.all([
			this.tagService.createRecipeTags(tagIds, recipe),
			this.ingredientService.createRecipeIngredients(ingredients, recipe),
		])

		recipe.creationDate = new Date()
		return this.convertToRecipeOutput(recipe)
	}
}
