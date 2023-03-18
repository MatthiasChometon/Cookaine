import { InputType, Field } from '@nestjs/graphql'
import { RecipeOrderInput } from './recipe-order.input'
import { FilterInput } from 'src/database/dto/filter.input'
import { RecipeOrderName } from '../enums/recipe-order-name.enum'
import { OrderDirection } from 'src/database/enums/order-direction.enum'

@InputType()
export class RecipeSearchInput {
	@Field({
		nullable: true,
		defaultValue: {
			name: RecipeOrderName.creationDate,
			direction: OrderDirection.DESC,
		},
	})
	orderBy: RecipeOrderInput

	@Field({ nullable: true, defaultValue: {} })
	filterBy: FilterInput
}
