import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Difficulty } from '../enums/difficulty.enum'
import { BaseEntity } from 'src/database/objects/base-entity'
import { RecipeIngredient } from 'src/ingredient/entities/recipe-ingredient.entity'
import { RecipeTag } from 'src/tag/entities/recipe-tag.entity'

@Entity({ name: 'recipe' })
@ObjectType()
export class Recipe extends BaseEntity {
	@Column()
	@Field()
	title: string

	@Column({ length: 510 })
	@Field()
	previewPicture: string

	@Column({ length: 510 })
	@Field()
	tutorialVideo: string

	@Column('time')
	@Field()
	cookingTime: string

	@Column({ type: 'enum', enum: Difficulty })
	@Field()
	difficulty: Difficulty

	@Column({ type: 'int' })
	@Field(() => Int)
	portion: number

	@Column('text', { array: true })
	@Field(() => [String])
	steps: string[]

	@Field(() => User)
	@ManyToOne(() => User, ({ recipes }) => recipes)
	creator: User

	@Field(() => [RecipeIngredient], { defaultValue: [] })
	@OneToMany(() => RecipeIngredient, ({ recipe }) => recipe)
	recipeIngredients: RecipeIngredient[]

	@Field(() => [RecipeTag], { defaultValue: [] })
	@OneToMany(() => RecipeTag, ({ recipe }) => recipe)
	recipeTags: RecipeTag[]
}
