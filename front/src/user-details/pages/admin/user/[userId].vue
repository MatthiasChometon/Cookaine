<script setup lang="ts">
const { sendError } = useNotification()
const route = useRoute()
const userId = computed(() => String(route.params.userId))
const defaultOptions = {
	filterBy: {
		pagination: { page: 1, itemsPerPage: 3 },
		userId: userId.value,
	},
}
const options = ref(defaultOptions)
const {
	result: recipesResult,
	loading: isLoadingRecipes,
	error: hasRecipesError,
} = useRecipesWithFiltersQuery({ options: options.value })
const { onError, result, loading, error } = useUserDetailsForAdminQuery({
	id: userId.value,
})
const { onError: onBanError, mutate: banUser } = useAdminBanUserMutation()

onError(() =>
	sendError("Une erreur est survenue lors de la récupération de l'utilisateurs"),
)
onBanError(() =>
	sendError("Une erreur est survenue lors du banissement de l'utilisateur"),
)
const user: ComputedRef = computed(() => result.value?.user)
</script>

<template>
	<div class="flex items-center column" style="width: 100%">
		<h5 class="text-center">Détails de l'utilisateur</h5>
		<q-card
			v-if="!loading && !error"
			class="q-pa-md flex justify-center items-center"
		>
			<div class="q-ma-md">
				<UserStatus :user-status="user.status"></UserStatus>
				<p class="q-ma-none">email: {{ user.email }}</p>
			</div>
			<q-icon
				class="q-ma-md"
				name="delete"
				style="font-size: 20px"
				@click="banUser({ id: user.id })"
			/>
		</q-card>
		<h5 class="text-center">Recettes de l'utilisateur</h5>
		<RecipeListWithFilter
			:ingredients="result?.ingredients ?? []"
			:tags="result?.tags ?? []"
			:users="result?.users ?? []"
			:recipes="recipesResult?.recipes ?? []"
			:has-recipes-error="hasRecipesError !== null"
			:default-options="defaultOptions"
			:is-loading-recipes="isLoadingRecipes"
			:is-loading-filters="loading"
			:has-filters-error="error !== null"
			@update:options="(v) => (options = v)"
			@update:pagination="(v) => (options.filterBy.pagination.page = v)"
		/>
	</div>
</template>
