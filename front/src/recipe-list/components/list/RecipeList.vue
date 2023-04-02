<script setup lang="ts">
import { DifficultyTranslation } from '../../../common/enums/difficultyTranslation'
import type { RecipesWithFiltersQuery } from '~/common/generated/graphql'

const { recipes, isRecipeUser = false } = defineProps<{
	recipes: RecipesWithFiltersQuery['recipes']
	isRecipeUser?: boolean
}>()
const { refetch } = useRecipesWithFiltersQuery({
	options: {
		filterBy: {
			pagination: { page: 1, itemsPerPage: 3 },
			isFromConnectedUser: true,
		},
	},
})
const { connectedUser } = useConnectedUser()
const router = useRouter()
const { mutate: deleteRecipeMutation, onDone } = useRemoveRecipeMutation()
const deleteRecipe = async (idRecipe: string) => {
	await deleteRecipeMutation({ id: idRecipe })
	refetch()
}

const { sendNotification } = useNotification()
onDone((result) => {
	sendNotification(
		result,
		'Recette supprimer',
		'Une erreur est survenue lors de la suppréssion de votre recette',
	)
})
</script>

<template>
	<div class="flex justify-center">
		<CardRecipe
			v-for="recipe in recipes"
			:id="recipe.id"
			:key="recipe.id"
			:title="recipe.title"
			class="flex column"
			:img="recipe.previewPicture"
			:difficulty="DifficultyTranslation[recipe.difficulty]"
			:cooking-time="recipe.cookingTime"
			><div
				v-if="isRecipeUser && connectedUser.id === recipe.creator.id"
				class="q-my-xs"
			>
				<q-icon
					name="edit"
					style="font-size: 20px"
					@click="router.push(`/Recipe-edit/${recipe.id}`)"
				/>

				<q-icon
					name="delete"
					style="font-size: 20px"
					@click="deleteRecipe(recipe.id)"
				/>
			</div>
		</CardRecipe>
	</div>
</template>
