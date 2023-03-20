import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { RecipeService } from './recipe.service'
import { Recipe } from './entities/recipe.entity'
import { RecipeSearchInput } from './dto/recipe-search.input'
import { RecipeOutput } from './dto/recipe.output'
import { IsPublic } from 'src/auth/guards/is-public.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { User } from 'src/user/methods/user.methods'
import { CreateRecipeInput } from './dto/create-recipe.input'

@Resolver(() => Recipe)
export class RecipeResolver {
	constructor(private readonly recipeService: RecipeService) {}

	@Query(() => [RecipeOutput])
	@IsPublic()
	recipes(
		@Args('options') options: RecipeSearchInput,
		@CurrentUser() { id }: User,
	): Promise<RecipeOutput[]> {
		return this.recipeService.search(options, id)
	}

	@Mutation(() => RecipeOutput)
	createRecipe(
		@Args('input') input: CreateRecipeInput,
		@CurrentUser() user: User,
	): Promise<RecipeOutput> {
		return this.recipeService.createRecipe(input, user)
	}

	@Mutation(() => Recipe)
	deleteRecipe(@Args('id') id: string, @CurrentUser() user: User): Promise<Recipe> {
		return this.recipeService.deleteRecipe(id, user)
	}
}
