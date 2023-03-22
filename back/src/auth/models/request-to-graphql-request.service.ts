import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { GraphqlRequest } from '../types/GraphqlRequest.type'

export class RequestToGraphqlRequestService {
	constructor(private readonly context: ExecutionContext) {}

	run(): GraphqlRequest {
		const ctx = GqlExecutionContext.create(this.context)
		return ctx.getContext().req
	}
}
