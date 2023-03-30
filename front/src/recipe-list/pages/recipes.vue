<script setup lang="ts">
import {
	useRecipeFiltersQuery,
	useRecipesWithFiltersQuery,
} from '~/common/generated/graphql'

const defaultOptions = {
	filterBy: {
		pagination: { page: 1, itemsPerPage: 2 },
		isFromConnectedUser: false,
	},
}
const options = ref(defaultOptions)

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
onErrorRecipes(() => sendError('Impossible de charger les recettes'))

const recipesFilters = computed(() => {
	const { ingredients, tags, users } = filtersResult?.value ?? {
		tags: [],
		ingredients: [],
		users: [],
	}
	return {
		ingredients: ingredients.map(({ name }) => name),
		tags: tags.map(({ name }) => name),
		users: users.map(({ id }) => id),
	}
})

const recipes = computed(() => recipesResult?.value?.recipes ?? [])
</script>

<template>
	<div class="flex">
		<RecipeListFilter
			v-if="!isLoadingFilters && !hasFiltersError"
			:default-options="defaultOptions"
			style="flex: 1; height: 100%"
			:tag-names="recipesFilters.tags"
			:ingredient-names="recipesFilters.ingredients"
			has-filter-by-connected-user
			@update:options="(v) => (options = v)"
		/>
		<div class="flex column justify-center content-center" style="flex: 4">
			<div class="flex column justify-center content-center no-wrap">
				<RecipeList :recipes="recipes" />
				<PaginationFilter
					v-if="!isLoadingRecipes && !hasRecipesError"
					:default-value="options.filterBy.pagination.page"
					@update="(v) => (options.filterBy.pagination.page = v)"
				/>
			</div>
		</div>
	</div>
</template>
