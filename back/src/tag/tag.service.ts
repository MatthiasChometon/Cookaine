import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from './entities/tag.entity'
import { RecipeTag } from './entities/recipe-tag.entity'
import { TagOutput } from './dto/tag.output'
import { Recipe } from 'src/recipe/entities/recipe.entity'
import { CreateTagInput } from './dto/create-tag.input'
import { UpdateTagInput } from './dto/update-tag.input'

@Injectable()
export class TagService {
	constructor(
		@InjectRepository(Tag)
		private readonly tagRepository: Repository<Tag>,
		@InjectRepository(RecipeTag)
		private readonly recipeTagRepository: Repository<RecipeTag>,
	) {}

	async removeTag(id: string): Promise<Tag> {
		const [tag] = await Promise.all([
			this.tagRepository.findOneByOrFail({ id }),
			this.recipeTagRepository.softDelete({ tag: { id } }),
		])

		await this.tagRepository.softDelete({ id })
		return tag
	}

	convertToTagListOuput(recipeTagList: RecipeTag[]): TagOutput[] {
		return recipeTagList.map((recipeTag) => this.convertToTagOuput(recipeTag))
	}

	convertToTagOuput(recipeTag: RecipeTag): TagOutput {
		const { tag, id: recipeTagId } = recipeTag
		const { id: tagId, name } = tag
		return {
			tagId,
			recipeTagId,
			name,
		}
	}

	async createRecipeTags(tagIds: string[], recipe: Recipe): Promise<RecipeTag[]> {
		return await Promise.all(
			tagIds.map(async (tagId) => {
				const tag = await this.tagRepository.findOneByOrFail({ id: tagId })
				const recipeTag = this.recipeTagRepository.create({
					tag,
					recipe,
				})
				await this.recipeTagRepository.insert(recipeTag)
				return recipeTag
			}),
		)
	}
	async createTag(input: CreateTagInput): Promise<Tag> {
		const result = await this.tagRepository.insert(input)
		const id = result.identifiers[0].id
		return await this.tagRepository.findOneByOrFail({ id })
	}

	async updateTag(id: string, input: UpdateTagInput): Promise<Tag> {
		await this.tagRepository.update({ id }, input)
		return await this.tagRepository.findOneByOrFail({ id })
	}
}
