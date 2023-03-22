import { InputType, Field } from '@nestjs/graphql'
import { ArrayMinSize, IsOptional, MaxLength, MinLength } from 'class-validator'
import { MesureUnit } from '../enums/mesure-unit.enum'
import { NoDuplicates } from 'src/validators/no-duplicates.validator'

@InputType()
export class CreateIngredientInput {
	@Field()
	@MinLength(1)
	@MaxLength(255)
	name: string

	@Field()
	@MinLength(10)
	@MaxLength(510)
	@IsOptional()
	previewPicture: string

	@Field(() => [MesureUnit])
	@ArrayMinSize(1)
	@NoDuplicates()
	@IsOptional()
	mesureUnits: MesureUnit[]
}
