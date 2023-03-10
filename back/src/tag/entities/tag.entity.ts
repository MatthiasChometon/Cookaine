import { Field, ObjectType } from "@nestjs/graphql"
import { BaseEntity } from "src/database/objects/base-entity"
import { Entity, OneToMany } from "typeorm"
import { RecipeTag } from "./recipe-tag.entity"

@Entity({ name: 'tag' })
@ObjectType()
export class Tag extends BaseEntity {
    name: string

    @Field(() => [RecipeTag], { defaultValue: [] })
    @OneToMany(() => RecipeTag, ({ tag }) => tag)
    recipeTags: RecipeTag[]
}