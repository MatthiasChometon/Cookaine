<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { HOME_RECIPES } from '../graphql/homeRecipes';

const { result, loading, error } = useQuery(HOME_RECIPES, {
	options: { orderBy: { direction: "DESC", name: "creationDate" }, filterBy: { pagination: { page: 1, itemsPerPage: 3 } } },
	fetchPolicy: 'cache-and-network'
})
console.log(result)

</script>
<template>
	<div>
		<q-img src="../assets/fond.jpg">
		</q-img>
		<h4 class="text-center">Nos dernières recettes</h4>
		<div v-if="!loading && !error">
			Les info des recettes
			<div v-for="recipe in result.recipes" :key="recipe.id">
				{{ recipe.id }}
				{{ recipe.title }}
				{{ recipe.difficulty }}
				{{ recipe.previewPicture }}
				{{ recipe.cookingTime }}				
			</div>
		</div>
	</div>
</template>
