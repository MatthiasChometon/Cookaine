import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Tag } from './entities/tag.entity'
import { Repository } from 'typeorm'
import { UseGuards } from '@nestjs/common'
import { IsAdminGuard } from 'src/user/guards/is-admin.guard'
import { TagService } from './tag.service'

@Resolver(Tag)
export class TagResolver {
	constructor(
		@InjectRepository(Tag)
		private tagRepository: Repository<Tag>,
		private readonly tagService: TagService,
	) {}

	@Mutation(() => Tag)
	@UseGuards(IsAdminGuard)
	removeTag(@Args('id') id: string): Promise<Tag> {
		return this.tagService.removeTag(id)
	}

	@Query(() => [Tag])
	@UseGuards(IsAdminGuard)
	tags(): Promise<Tag[]> {
		return this.tagRepository.find()
	}
}
