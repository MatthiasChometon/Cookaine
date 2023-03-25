import { Field, InputType } from '@nestjs/graphql'
import { OrderDirection } from 'src/database/enums/order-direction.enum'

@InputType()
export class OrderInput {
	@Field(() => String)
	name: string

	@Field(() => OrderDirection)
	direction: OrderDirection
}
