import type { CreateGlobalStateReturn, RemovableRef } from '@vueuse/core'
import { createGlobalState } from '@vueuse/core'
import type { Link } from '~/types/Link'

const userLinks: Link[] = [
	{
		page: '/',
		text: 'Liste des recettes',
	},
	{
		page: '/',
		text: 'Vos recettes',
	},
	{
		page: '/',
		text: 'Ajouter une recette',
	},
]

export const useUserLinks: CreateGlobalStateReturn<RemovableRef<Link[]>> =
	createGlobalState(() => ref(userLinks))
