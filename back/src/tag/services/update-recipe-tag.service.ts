import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RecipeTag } from '../entities/recipe-tag.entity'
import { Repository } from 'typeorm'
import { Recipe } from 'src/recipe/entities/recipe.entity'
import { TagService } from '../tag.service'

@Injectable()
export class UpdateRecipeTagService {
	constructor(
		@InjectRepository(RecipeTag)
		private readonly recipeTagRepository: Repository<RecipeTag>,
		private readonly tagService: TagService,
	) {}

	async run(tagIds: string[], recipe: Recipe): Promise<void> {
		await this.recipeTagRepository.delete({ recipe: { id: recipe.id } })
		await this.tagService.createRecipeTags(tagIds, recipe)
	}
}
