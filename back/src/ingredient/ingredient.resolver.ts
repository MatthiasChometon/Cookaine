import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Ingredient } from './entities/ingredient.entity'
import { CreateIngredientInput } from './dto/create-ingredient.input'
import { IngredientService } from './ingredient.service'
import { UpdateIngredientInput } from './dto/update-ingredient.input'
import { UseGuards } from '@nestjs/common'
import { IsAdminGuard } from 'src/user/guards/is-admin.guard'
import { IsPublic } from 'src/auth/guards/is-public.guard'

@Resolver(() => Ingredient)
export class IngredientResolver {
	constructor(
		@InjectRepository(Ingredient)
		private readonly ingredientRepository: Repository<Ingredient>,
		private readonly ingredientService: IngredientService,
	) {}

	@Mutation(() => Ingredient)
	@UseGuards(IsAdminGuard)
	removeIngredient(@Args('id') id: string): Promise<Ingredient> {
		return this.ingredientService.removeIngredient(id)
	}

	@Mutation(() => Ingredient)
	@UseGuards(IsAdminGuard)
	updateIngredient(
		@Args('id') id: string,
		@Args('input') input: UpdateIngredientInput,
	): Promise<Ingredient> {
		return this.ingredientService.updateIngredient(id, input)
	}

	@Mutation(() => Ingredient)
	@UseGuards(IsAdminGuard)
	createIngredient(@Args('input') input: CreateIngredientInput): Promise<Ingredient> {
		return this.ingredientService.createIngredient(input)
	}

	@Query(() => [Ingredient])
	@IsPublic()
	ingredients(): Promise<Ingredient[]> {
		return this.ingredientRepository.find()
	}
}
