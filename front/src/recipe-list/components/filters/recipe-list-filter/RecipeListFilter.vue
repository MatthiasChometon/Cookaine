<script setup lang="ts">
import type { RecipeSearchInput } from '~/common/generated/graphql'

const {
	tagNames,
	ingredientNames,
	defaultOptions,
	hasFilterByUserId = false,
	userIds,
} = defineProps<{
	tagNames: string[]
	ingredientNames: string[]
	userIds?: string[]
	defaultOptions: RecipeSearchInput
	hasFilterByUserId?: boolean
}>()

defineEmits(['update:options'])
const options: Ref = ref(defaultOptions)
</script>

<template>
	<q-card class="q-ma-md q-pa-md">
		<p>Filtrer par :</p>
		<RecipeCreatorConnectedUserFilter
			v-if="hasFilterByUserId"
			:default-value="defaultOptions?.filterBy?.isFromConnectedUser ?? false"
			@update="(v) => (options.filterBy.userId = v)"
		/>
		<RecipeCreatorFilter
			v-if="hasFilterByUserId && userIds !== undefined"
			:user-ids="userIds"
			@update="(v) => (options.filterBy.userId = v)"
		/>
		<TagsFilter
			:tag-names="tagNames"
			@update="(v) => (options.filterBy.tagNames = v)"
		/>
		<IngredientsFilter
			:ingredient-names="ingredientNames"
			@update="(v) => (options.filterBy.ingredientNames = v)"
		/>
		<MaximumTimeCookingFilter
			@update="(v) => (options.filterBy.maximumCookingTime = v)"
		/>
		<DifficultiesFilter @update="(v) => (options.filterBy.difficulties = v)" />
	</q-card>
</template>
