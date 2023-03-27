import type { CreateGlobalStateReturn, RemovableRef } from '@vueuse/core'
import { createGlobalState } from '@vueuse/core'

export const useAccountButton: CreateGlobalStateReturn<RemovableRef<boolean>> =
	createGlobalState(() => ref(false))
