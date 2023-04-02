<script setup lang="ts">
import type { UpdateRecipeInput } from '~/common/generated/graphql'
import type { GraphqlResult } from '~/common/types/graphql/GraphqlResult'

const route = useRoute()

const { loading, result, error } = useRecipeQuery({
	recipeId: String(route.params.id),
})

const defaultRecipe = computed(() => {
	if (result?.value?.recipe === undefined) return
	const { ...recipe } = result.value.recipe
	return {
		...recipe,
		tagIds: recipe?.tags.map((tagIds) => tagIds.tagId),
		ingredients: recipe?.ingredients.map(
			({ ingredientId, quantity, mesureUnit }) => ({
				id: ingredientId,
				quantity,
				mesureUnit,
			}),
		),
	}
})

const { onDone, mutate: updateRecipe } = useUpdateRecipeMutation()
const router = useRouter()
const { sendNotification } = useNotification()

onDone((result: GraphqlResult) => {
	sendNotification(
		result,
		'Recette modifier',
		'Une erreur est survenue lors de la modification de votre recette',
	)
	if (result.errors) return

	router.replace(`/my-recipes`)
})
const modify = (e: UpdateRecipeInput, id: string) => {
	const modifyValue = {
		title: e.title,
		previewPicture: e.previewPicture,
		tutorialVideo: e.tutorialVideo,
		difficulty: e.difficulty,
		portion: e.portion,
		cookingTime: e.cookingTime,
		tagIds: e.tagIds,
		ingredients: e.ingredients,
		steps: e.steps,
	}
	updateRecipe({ recipeId: id, input: modifyValue })
}
</script>

<template>
	<h5 class="text-center">Modifier votre recette</h5>
	<div class="flex column items-center">
		<FormRecipe
			v-if="!loading && !error && defaultRecipe !== undefined"
			:recipe-value="defaultRecipe"
			:recipe-id="defaultRecipe.id"
			@action-form="(e) => modify(e, String(route.params.id))"
		>
			<q-btn label="Modifier ma recette" type="submit" color="primary" />
		</FormRecipe>
	</div>
</template>
