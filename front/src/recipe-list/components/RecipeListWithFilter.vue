<script setup lang="ts">
import type {
	RecipeFiltersQuery,
	RecipeSearchInput,
	RecipesWithFiltersQuery,
} from '~/common/generated/graphql'

const {
	isLoadingFilters,
	hasFiltersError,
	defaultOptions,
	tags = [],
	ingredients = [],
	isLoadingRecipes,
	hasRecipesError,
	users,
	hasFilterByUserId = false,
} = defineProps<{
	isLoadingFilters: boolean
	hasFiltersError: boolean
	isLoadingRecipes: boolean
	hasRecipesError: boolean
	defaultOptions: RecipeSearchInput
	tags: RecipeFiltersQuery['tags']
	ingredients: RecipeFiltersQuery['ingredients']
	users?: { email: string; id: string }[]
	recipes: RecipesWithFiltersQuery['recipes']
	hasFilterByUserId?: boolean
}>()

defineEmits(['update:options', 'update:pagination'])

const tagNames = computed(() => tags.map(({ name }) => name))
const ingredientsNames = computed(() => ingredients.map(({ name }) => name))
</script>

<template>
	<div class="flex">
		<RecipeListFilter
			v-if="!isLoadingFilters && !hasFiltersError"
			:default-options="defaultOptions"
			style="flex: 1; height: 100%"
			:tag-names="tagNames"
			:ingredient-names="ingredientsNames"
			has-filter-by-connected-user
			:users="users"
			:has-filter-by-user-id="hasFilterByUserId"
			@update:options="(v) => $emit('update:options', v)"
		/>
		<div class="flex column justify-center content-center" style="flex: 4">
			<div class="flex column justify-center content-center no-wrap">
				<RecipeList :recipes="recipes" />
				<PaginationFilter
					v-if="!isLoadingRecipes && !hasRecipesError"
					:default-value="defaultOptions.filterBy?.pagination?.page ?? 1"
					@update="(v) => $emit('update:pagination', v)"
				/>
			</div>
		</div>
	</div>
</template>
