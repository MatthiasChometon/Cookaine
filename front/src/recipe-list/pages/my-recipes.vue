<script setup lang="ts">
const defaultOptions = {
	filterBy: {
		pagination: { page: 1, itemsPerPage: 3 },
		isFromConnectedUser: true,
	},
}
const options = ref(defaultOptions)
const { isUser } = useUserRole()

const { sendError } = useNotification()
const {
	result: filtersResult,
	loading: isLoadingFilters,
	onError: onErrorFilters,
	error: hasFiltersError,
} = useRecipeFiltersQuery()
const {
	result: recipesResult,
	loading: isLoadingRecipes,
	onError: onErrorRecipes,
	error: hasRecipesError,
} = useRecipesWithFiltersQuery({
	options: options.value,
})

onErrorFilters(() => sendError('Impossible de charger les filtres'))
onErrorRecipes(() => sendError('Impossible de charger vos recettes'))
</script>

<template>
	<RecipeListWithFilter
		:ingredients="filtersResult?.ingredients ?? []"
		:tags="filtersResult?.tags ?? []"
		:recipes="recipesResult?.recipes ?? []"
		:has-recipes-error="hasRecipesError !== null"
		:default-options="defaultOptions"
		:is-loading-recipes="isLoadingRecipes"
		:has-filter-by-user-id="isUser"
		:is-loading-filters="isLoadingFilters"
		:has-filters-error="hasFiltersError !== null"
		@update:options="(v) => (options = v)"
		@update:pagination="(v) => (options.filterBy.pagination.page = v)"
	/>
</template>
