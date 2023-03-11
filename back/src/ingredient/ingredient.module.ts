import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientResolver } from './ingredient.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { Ingredient } from './entities/ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeIngredient, Ingredient]),
  ],
  providers: [IngredientResolver, IngredientService],
  exports: [TypeOrmModule],
})
export class IngredientModule { }
