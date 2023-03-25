import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '../methods/user.methods'
import { UserRoles } from '../enums/user-roles.enum'
import { UserStatus } from '../enums/user-status.enum'

@Injectable()
export class IsAdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context)
		const { req } = ctx.getContext()
		const user: User = req.user
		return user.role === UserRoles.admin && user.status === UserStatus.isActive
	}
}
