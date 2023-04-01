import { Module } from '@nestjs/common'
import { IngredientService } from './ingredient.service'
import { IngredientResolver } from './ingredient.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecipeIngredient } from './entities/recipe-ingredient.entity'
import { Ingredient } from './entities/ingredient.entity'
import { UpdateRecipeIngredientService } from './services/updateRecipeIngredient.service'

@Module({
	imports: [TypeOrmModule.forFeature([RecipeIngredient, Ingredient])],
	providers: [IngredientResolver, IngredientService, UpdateRecipeIngredientService],
	exports: [TypeOrmModule, IngredientService, UpdateRecipeIngredientService],
})
export class IngredientModule {}
