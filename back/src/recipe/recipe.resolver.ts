import { Query, Resolver } from '@nestjs/graphql';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';

@Resolver()
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) { }

  @Query(() => [Recipe])
  recipes(): Promise<Recipe[]> {
    return this.recipeService.all()
  }
}
