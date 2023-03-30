import type { CreateGlobalStateReturn, RemovableRef } from '@vueuse/core'
import { createGlobalState } from '@vueuse/core'
import type { Link } from '~/layout/types/Link'

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
		page: '/ingredient-list',
		text: 'Ingrédients',
	},
]

export const useAdminLinks: CreateGlobalStateReturn<RemovableRef<Link[]>> =
	createGlobalState(() => ref(amdinLinks))
