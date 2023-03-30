<script setup lang="ts">
import { DifficultyTranslation } from '../../../common/enums/difficultyTranslation'
import type { RecipesWithFiltersQuery } from '~/common/generated/graphql'

const { recipes } = defineProps<{
	recipes: RecipesWithFiltersQuery['recipes']
}>()
</script>

<template>
	<div style="height: 90%" class="flex">
		<CardRecipe
			v-for="recipe in recipes"
			:key="recipe.id"
			:title="recipe.title"
			class="flex column"
			img="https://img-31.ccm2.net/cTOP2vGKwTNG7OwPCCWKMpBZve4=/910x/smart/0b15fffc7bfd4d7c87d88b44b1e866ff/ccmcms-hugo/23885609.jpg"
			:difficulty="DifficultyTranslation[recipe.difficulty]"
			:cooking-time="recipe.cookingTime"
		/>
	</div>
</template>
