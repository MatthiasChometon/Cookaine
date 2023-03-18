import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from 'src/database/objects/base-entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { MesureUnit } from '../enums/mesure-unit.enum'
import { RecipeIngredient } from './recipe-ingredient.entity'

@Entity({ name: 'ingredient' })
@ObjectType()
export class Ingredient extends BaseEntity {
	@Column({ unique: true })
	@Field()
	@Index()
	name: string

	@Column({ length: 510, unique: true })
	@Field()
	previewPicture: string

	@Column({ type: 'enum', enum: MesureUnit, array: true })
	@Field(() => [MesureUnit], { defaultValue: [] })
	mesureUnits: MesureUnit[]

	@Field(() => [RecipeIngredient], { defaultValue: [] })
	@OneToMany(() => RecipeIngredient, ({ ingredient }) => ingredient)
	recipeIngredients: RecipeIngredient[]
}
