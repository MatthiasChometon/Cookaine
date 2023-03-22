import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Recipe } from './entities/recipe.entity'
import { Repository } from 'typeorm'
import { RecipeSearchInput } from './dto/recipe-search.input'
import { RecipeOutput } from './dto/recipe.output'
import { IngredientService } from 'src/ingredient/ingredient.service'
import { TagService } from 'src/tag/tag.service'
import { CreateRecipeInput } from './dto/create-recipe.input'
import { User } from 'src/user/methods/user.methods'
import { Tag } from 'src/tag/entities/tag.entity'
import { RecipeIngredient } from 'src/ingredient/entities/recipe-ingredient.entity'
import { Ingredient } from 'src/ingredient/entities/ingredient.entity'
import { RecipeTag } from 'src/tag/entities/recipe-tag.entity'

@Injectable()
export class RecipeService {
	constructor(
		@InjectRepository(Recipe)
		private readonly recipeRepository: Repository<Recipe>,
		@InjectRepository(Tag)
		private readonly tagRepository: Repository<Tag>,
		@InjectRepository(RecipeIngredient)
		private readonly recipeIngredientRepository: Repository<RecipeIngredient>,
		@InjectRepository(Ingredient)
		private readonly recipeTagRepository: Repository<RecipeTag>,
		@InjectRepository(RecipeTag)
		private readonly ingredientRepository: Repository<Ingredient>,
		private readonly ingredientService: IngredientService,
		private readonly tagService: TagService,
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
			.leftJoinAndSelect('recipe.recipeTags', 'recipeTags')
			.leftJoinAndSelect('recipeTags.tag', 'tag')
			.where('recipeIngredients.id IS NOT NULL')
			.where('recipeTags.id IS NOT NULL')

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

		const [recipeIngredients, recipeTags] = await Promise.all([
			this.tagService.createRecipeTags(tagIds),
			this.ingredientService.createRecipeIngredients(ingredients),
		])

		const result = await this.recipeRepository.insert({
			...recipe,
			recipeIngredients,
			recipeTags,
		})
		recipe.id = result.identifiers[0].id
		const { creationDate } = await this.recipeRepository
			.createQueryBuilder('recipe')
			.select('recipe.creationDate')
			.getOne()
		recipe.creationDate = creationDate
		return this.convertToRecipeOutput(recipe)
	}

	recipeTags
}
