<script setup lang="ts">
import type { RecipesWithFiltersQuery } from '~/common/generated/graphql'

const { recipes } = defineProps<{
	recipes: RecipesWithFiltersQuery['recipes']
}>()
</script>

<template>
	<div style="height: 70%">
		<q-card
			v-for="recipe in recipes"
			:key="recipe.id"
			class="q-ma-md flex column"
			style="width: 300px"
		>
			{{ recipe.title }}
		</q-card>
	</div>
</template>
