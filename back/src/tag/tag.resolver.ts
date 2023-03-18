import { Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Tag } from './entities/tag.entity'
import { Repository } from 'typeorm'
import { UseGuards } from '@nestjs/common'
import { IsAdminGuard } from 'src/user/guards/is-admin.guard'

@Resolver(Tag)
export class TagResolver {
	constructor(
		@InjectRepository(Tag)
		private tagRepository: Repository<Tag>,
	) {}

	@Query(() => [Tag])
	@UseGuards(IsAdminGuard)
	tags(): Promise<Tag[]> {
		return this.tagRepository.find()
	}
}
