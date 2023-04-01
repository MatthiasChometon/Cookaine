import { Module } from '@nestjs/common'
import { RecipeService } from './recipe.service'
import { RecipeResolver } from './recipe.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Recipe } from './entities/recipe.entity'
import { IngredientModule } from 'src/ingredient/ingredient.module'
import { TagModule } from 'src/tag/tag.module'
import { Tag } from 'src/tag/entities/tag.entity'
import { RecipeTag } from 'src/tag/entities/recipe-tag.entity'
import { UpdateRecipeService } from './services/update-recipe.service'

@Module({
	imports: [TypeOrmModule.forFeature([Recipe, Tag, RecipeTag]), IngredientModule, TagModule],
	providers: [RecipeResolver, RecipeService, UpdateRecipeService],
})
export class RecipeModule {}
