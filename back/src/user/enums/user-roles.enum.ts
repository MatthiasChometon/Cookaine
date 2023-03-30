import { registerEnumType } from '@nestjs/graphql'

export enum UserRoles {
	'admin' = 'admin',
	'user' = 'user',
	'visitor' = 'visitor',
}

registerEnumType(UserRoles, {
	name: 'UserRoles',
})
