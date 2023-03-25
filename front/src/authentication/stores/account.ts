import type { CreateGlobalStateReturn, RemovableRef } from '@vueuse/core'
import { createGlobalState, useStorage } from '@vueuse/core'
import type { Account } from '~/authentication/types/Account'
import { UserRoles } from '../enums/UserRoles'

export const useAccount: CreateGlobalStateReturn<RemovableRef<Account>> = createGlobalState(() =>
		useStorage('useAccount', {
			email: "",
			id: "",
			role: UserRoles.user,
			__typename: 'User',
		}),
	)
