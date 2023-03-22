import { Field, InputType } from '@nestjs/graphql'
import { OrderInput } from 'src/database/dto/order.input'
import { RecipeOrderName } from '../enums/recipe-order-name.enum'

@InputType()
export class RecipeOrderInput extends OrderInput {
	@Field(() => RecipeOrderName)
	name: RecipeOrderName
}
