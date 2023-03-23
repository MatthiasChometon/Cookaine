import type { UserRoles } from '../enums/UserRoles'
import type { Graphql } from '~/common/types/graphql/Graphql'

export interface Account extends Graphql {
	email: string
	id: string
	role: UserRoles
}
