import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from 'src/database/objects/base-entity'
import { Recipe } from 'src/recipe/entities/recipe.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { MesureUnit } from '../enums/mesure-unit.enum'
import { Ingredient } from './ingredient/ingredient.entity'

@Entity({ name: 'recipeIngredient' })
@ObjectType()
export class RecipeIngredient extends BaseEntity {
	@Field(() => Recipe)
	@ManyToOne(() => Recipe, ({ recipeIngredients }) => recipeIngredients)
	recipe: Recipe

	@Field(() => Ingredient)
	@ManyToOne(() => Ingredient, ({ recipeIngredients }) => recipeIngredients)
	ingredient: Ingredient

	@Column({ type: 'int' })
	@Field(() => Int)
	quantity: number

	@Column({ type: 'enum', enum: MesureUnit })
	@Field(() => MesureUnit)
	mesureUnit: MesureUnit
}
