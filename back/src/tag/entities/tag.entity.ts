import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from 'src/database/objects/base-entity'
import { Column, DeleteDateColumn, Entity, Index, OneToMany } from 'typeorm'
import { RecipeTag } from './recipe-tag.entity'

@Entity({ name: 'tag' })
@ObjectType()
export class Tag extends BaseEntity {
	@Field()
	@Index()
	@Column()
	name: string

	@Field(() => [RecipeTag], { defaultValue: [] })
	@OneToMany(() => RecipeTag, ({ tag }) => tag)
	recipeTags: RecipeTag[]

	@DeleteDateColumn({ name: 'deletedAt' })
	deletedAt: Date
}
