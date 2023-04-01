import { InputType, Field } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'

@InputType()
export class CreateTagInput {
	@Field()
	@MinLength(1)
	@MaxLength(255)
	name: string
}
