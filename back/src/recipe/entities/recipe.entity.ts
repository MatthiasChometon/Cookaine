import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
} from 'typeorm'
import { Difficulty } from '../enums/difficulty.enum'
import { BaseEntity } from 'src/database/objects/base-entity'
import { RecipeIngredient } from 'src/ingredient/entities/recipe-ingredient.entity'
import { RecipeTag } from 'src/tag/entities/recipe-tag.entity'
import { User } from 'src/user/methods/user.methods'
import { GraphQLLocalTime } from 'graphql-scalars'

@Entity({ name: 'recipe' })
@ObjectType()
export class Recipe extends BaseEntity {
	@Column()
	@Field()
	@Index()
	title: string

	@Column({ length: 510 })
	@Field()
	previewPicture: string

	@Column({ length: 510 })
	@Field()
	tutorialVideo: string

	@Column('time')
	@Field(() => GraphQLLocalTime)
	cookingTime: string

	@Column({ type: 'enum', enum: Difficulty })
	@Field(() => Difficulty)
	difficulty: Difficulty

	@Column({ type: 'int' })
	@Field(() => Int)
	portion: number

	@Column('text', { array: true })
	@Field(() => [String])
	@Index()
	steps: string[]

	@Field(() => User)
	@ManyToOne(() => User, ({ recipes }) => recipes)
	creator: User

	@CreateDateColumn()
	@Field(() => Date)
	creationDate: Date

	@OneToMany(() => RecipeIngredient, ({ recipe }) => recipe, { cascade: true })
	recipeIngredients: RecipeIngredient[]

	@OneToMany(() => RecipeTag, ({ recipe }) => recipe, { cascade: true })
	recipeTags: RecipeTag[]

	@DeleteDateColumn()
	deletedAt: Date
}
