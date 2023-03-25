import type { CreateGlobalStateReturn, RemovableRef } from '@vueuse/core'
import { createGlobalState, useStorage } from '@vueuse/core'
import type { Account } from '~/types/user/Account'

export const useAccount: CreateGlobalStateReturn<RemovableRef<Account>> =
	createGlobalState(() =>
		useStorage('useAccount', {
			lastName: '',
			firstName: '',
			username: '',
			email: '',
			phone: '',
			__typename: 'User',
		}),
	)
