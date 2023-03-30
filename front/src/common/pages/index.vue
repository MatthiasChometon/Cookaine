<script setup lang="ts">
import { DifficultyTranslation } from '../enums/difficultyTranslation'
import { useHomeRecipesQuery } from '../generated/graphql'

const { sendError } = useNotification()

const { result, loading, onError, error } = useHomeRecipesQuery({
	options: {
		filterBy: { pagination: { page: 1, itemsPerPage: 2 } },
		orderBy: {
			name: RecipeOrderName.CreationDate,
			direction: OrderDirection.Desc,
		},
	},
})
onError(() => sendError('Une erreur est survenue'))
</script>

<template>
	<div>
		<q-img src="../assets/fond.jpg"> </q-img>
		<h4 class="text-center">Nos dernières recettes</h4>
		<div v-if="!loading && !error" class="flex justify-around">
			<div v-for="recipe in result?.recipes" :key="recipe.id">
				<CardRecipe
					:title="recipe.title"
					:img="recipe.previewPicture"
					:difficulty="DifficultyTranslation[recipe.difficulty]"
					:cooking-time="recipe.cookingTime"
				></CardRecipe>
			</div>
		</div>
	</div>
</template>
