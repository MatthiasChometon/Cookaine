import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from './entities/tag.entity'
import { RecipeTag } from './entities/recipe-tag.entity'
import { TagOutput } from './dto/tag.output'

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

	async createRecipeTags(tagIds: string[]): Promise<RecipeTag[]> {
		return await Promise.all(
			tagIds.map(async (tagId) => {
				const tag = await this.tagRepository.findOneByOrFail({ id: tagId })
				return this.recipeTagRepository.create({
					tag,
				})
			}),
		)
	}
}
