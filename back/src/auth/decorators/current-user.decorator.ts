import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { RequestToGraphqlRequestService } from '../models/request-to-graphql-request.service'
import { User } from 'src/user/methods/user.methods'

export const CurrentUser = createParamDecorator(
	(_data: unknown, context: ExecutionContext): Partial<User> => {
		const request = new RequestToGraphqlRequestService(context).run()
		return request?.user ?? {}
	},
)
