import { Module } from '@nestjs/common'
import { RecipeService } from './recipe.service'
import { RecipeResolver } from './recipe.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Recipe } from './entities/recipe.entity'
import { IngredientModule } from 'src/ingredient/ingredient.module'

@Module({
	imports: [TypeOrmModule.forFeature([Recipe]), IngredientModule],
	providers: [RecipeResolver, RecipeService],
})
export class RecipeModule {}
