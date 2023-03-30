import type { CreateGlobalStateReturn, RemovableRef } from '@vueuse/core'
import { createGlobalState } from '@vueuse/core'
import type { Link } from '~/layout/types/Link'

const visitorLinks: Link[] = [
	{
		page: '/recipes',
		text: 'Liste des recettes',
	},
]

export const useVisitorLinks: CreateGlobalStateReturn<RemovableRef<Link[]>> =
	createGlobalState(() => ref(visitorLinks))
