import { registerEnumType } from '@nestjs/graphql'

export enum UserStatus {
	'isPending' = 'isPending',
	'isActive' = 'isActive',
	'isBanned' = 'isBanned',
}

registerEnumType(UserStatus, {
	name: 'UserStatus',
})
