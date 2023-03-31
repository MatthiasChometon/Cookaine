<script setup lang="ts">
import { DifficultyTranslation } from '../../../common/enums/difficultyTranslation'
import type { RecipesWithFiltersQuery } from '~/common/generated/graphql'

const { recipes } = defineProps<{
	recipes: RecipesWithFiltersQuery['recipes']
}>()
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
		/>
	</div>
</template>
