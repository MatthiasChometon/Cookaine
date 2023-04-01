import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Tag } from './entities/tag.entity'
import { Repository } from 'typeorm'
import { UseGuards } from '@nestjs/common'
import { IsAdminGuard } from 'src/user/guards/is-admin.guard'
import { TagService } from './tag.service'
import { IsPublic } from 'src/auth/guards/is-public.guard'
import { CreateTagInput } from './dto/create-tag.input'
import { UpdateTagInput } from './dto/update-tag.input'

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
	@IsPublic()
	tags(): Promise<Tag[]> {
		return this.tagRepository.find()
	}
	@Query(() => Tag)
	@IsPublic()
	tag(@Args('id') id: string): Promise<Tag> {
		return this.tagRepository.findOneBy({ id })
	}

	@Mutation(() => Tag)
	@IsPublic()
	createTag(@Args('input') input: CreateTagInput): Promise<Tag> {
		return this.tagService.createTag(input)
	}

	@Mutation(() => Tag)
	@UseGuards(IsAdminGuard)
	updateTag(@Args('id') id: string, @Args('input') input: UpdateTagInput): Promise<Tag> {
		return this.tagService.updateTag(id, input)
	}
}
