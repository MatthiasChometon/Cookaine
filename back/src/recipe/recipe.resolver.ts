import { Args, Query, Resolver } from '@nestjs/graphql'
import { RecipeService } from './recipe.service'
import { Recipe } from './entities/recipe.entity'
import { RecipeSearchInput } from './dto/recipe-search.input'
import { RecipeOutput } from './dto/recipe.output'
import { IsPublic } from 'src/auth/guards/is-public.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { User } from 'src/user/methods/user.methods'

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
}
