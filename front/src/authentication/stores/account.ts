import type { CreateGlobalStateReturn, RemovableRef } from '@vueuse/core'
import { createGlobalState, useStorage } from '@vueuse/core'
import type { Account } from '~/authentication/types/Account'

export const useAccount: CreateGlobalStateReturn<RemovableRef<Account>> =
	createGlobalState(() =>
		useStorage('useAccount', {
			email: '',
			id: '',
			role: UserRoles,
			__typename: 'User',
		}),
	)
