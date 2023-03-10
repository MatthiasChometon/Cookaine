import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, } from "typeorm";
import { UserRoles } from "../enums/user-roles.enum";
import { UserStatus } from "../enums/user-status.enum";
import { Recipe } from "src/recipe/entities/recipe.entity";
import { BaseEntity } from "src/database/objects/base-entity";

@Entity({ name: 'user' })
@ObjectType()
export class User extends BaseEntity {
    @Column({ unique: true })
    @Field()
    email: string

    @Column()
    password: string

    @Field(() => UserRoles)
    @Column({ type: 'enum', enum: UserRoles, default: UserRoles.user })
    role: UserRoles

    @Field(() => UserStatus)
    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.isPending })
    status: UserStatus

    @Column({ nullable: true })
    refreshToken: string

    @Column({ nullable: true })
    emailCode: number

    @Field(() => [Recipe], { defaultValue: [] })
    @OneToMany(() => Recipe, (recipe) => recipe.creator)
    recipes: Recipe[]
}