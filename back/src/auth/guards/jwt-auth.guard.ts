import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { IS_PUBLIC_KEY } from './is-public.guard'
import { GraphqlRequest } from '../types/GraphqlRequest.type'
import { RequestToGraphqlRequestService } from '../models/request-to-graphql-request.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super()
	}

	getRequest(context: ExecutionContext): GraphqlRequest {
		return new RequestToGraphqlRequestService(context).run()
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const authHeader = this.getRequest(context).headers.authorization
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		])
		const hasNoAuthHeader = authHeader === undefined || authHeader === ''
		if (isPublic && hasNoAuthHeader) return true
		return super.canActivate(context)
	}
}
