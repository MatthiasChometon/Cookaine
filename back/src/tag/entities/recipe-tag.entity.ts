import { Field, ObjectType } from "@nestjs/graphql"
import { BaseEntity } from "src/database/objects/base-entity"
import { Recipe } from "src/recipe/entities/recipe.entity"
import { Entity, ManyToOne } from "typeorm"
import { Tag } from "./tag.entity"

@Entity({ name: 'recipeTag' })
@ObjectType()
export class RecipeTag extends BaseEntity {
    @Field(() => Recipe)
    @ManyToOne(() => Recipe, ({ recipeTags }) => recipeTags)
    recipe: Recipe

    @Field(() => Tag)
    @ManyToOne(() => Tag, ({ recipeTags }) => recipeTags)
    tag: Tag
}