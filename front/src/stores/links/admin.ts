import type { CreateGlobalStateReturn, RemovableRef } from '@vueuse/core'
import { createGlobalState } from '@vueuse/core'
import type { Link } from '~/types/Link'

const amdinLinks: Link[] = [
	{
		page: '/',
		text: 'Recettes',
	},
	{
		page: '/',
		text: 'Utilisateurs',
	},
	{
		page: '/',
		text: 'Tags',
	},
	{
		page: '/',
		text: 'Ingrédients',
	},
]

export const useAdminLinks: CreateGlobalStateReturn<RemovableRef<Link[]>> =
	createGlobalState(() => ref(amdinLinks))
