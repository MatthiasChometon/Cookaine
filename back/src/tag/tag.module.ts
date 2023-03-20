import { Module } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagResolver } from './tag.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tag } from './entities/tag.entity'
import { RecipeTag } from './entities/recipe-tag.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Tag, RecipeTag])],
	providers: [TagResolver, TagService],
	exports: [TypeOrmModule, TagService],
})
export class TagModule {}
