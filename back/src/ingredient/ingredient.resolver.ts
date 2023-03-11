import { Resolver } from '@nestjs/graphql';
import { IngredientService } from './ingredient.service';

@Resolver()
export class IngredientResolver {
  constructor(private readonly ingredientService: IngredientService) {}
}
