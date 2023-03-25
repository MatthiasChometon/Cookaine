import type { CreateGlobalStateReturn, RemovableRef } from '@vueuse/core'
import { createGlobalState } from '@vueuse/core'
import type { Link } from '~/types/Link'

const visitorLinks: Link[] = [
	{
		page: '/',
		text: 'Liste des recettes',
	},
]

export const useVisitorLinks: CreateGlobalStateReturn<RemovableRef<Link[]>> =
	createGlobalState(() => ref(visitorLinks))
