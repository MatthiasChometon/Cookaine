<script setup lang="ts">
import { useHomeRecipesQuery } from '../generated/graphql'
const { sendError } = useNotification()

const { result, loading, onError } = useHomeRecipesQuery({
	options: {
		orderBy: {
			direction: OrderDirection.Desc,
			name: RecipeOrderName.CreationDate,
		},
		filterBy: { pagination: { page: 1, itemsPerPage: 3 } },
	},
})
onError(() => sendError('Une erreur est survenue'))
</script>

<template>
	<div>
		<q-img src="../assets/fond.jpg"> </q-img>
		<h4 class="text-center">Nos dernières recettes</h4>
		<div v-if="!loading">
			Les infos des recettes
			<div v-for="recipe in result?.recipes" :key="recipe.id">
				{{ recipe.id }}
				{{ recipe.title }}
				{{ recipe.difficulty }}
				{{ recipe.previewPicture }}
				{{ recipe.cookingTime }}
			</div>
		</div>
	</div>
</template>
