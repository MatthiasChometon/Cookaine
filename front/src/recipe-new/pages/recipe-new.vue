<script setup lang="ts">
import type { GraphqlResult } from '~/common/types/graphql/GraphqlResult'

const recipeValue = ref({
	title: '',
	previewPicture: '',
	tutorialVideo: '',
	difficulty: Difficulty.Easy,
	portion: 0,
	cookingTime: '',
	tagIds: [],
	ingredients: [{ id: '', quantity: 0, mesureUnit: MesureUnit.Gram }],
	steps: [''],
})
const { onDone, mutate: createRecipe } = useCreateRecipeMutation()

const router = useRouter()
const { sendNotification } = useNotification()

onDone((result: GraphqlResult) => {
	sendNotification(
		result,
		'Recette ajouter',
		'Une erreur est survenue lors de la création de votre recette',
	)
	if (result.errors) return

	router.replace(`/my-recipes`)
})
</script>

<template>
	<h5 class="text-center">Créer une nouvelle recette</h5>
	<div class="flex column items-center">
		<FormRecipe
			:recipe-value="recipeValue"
			@action-form="(e) => createRecipe({ input: e })"
		>
			<q-btn label="Créer ma recette" type="submit" color="primary" />
		</FormRecipe>
	</div>
</template>
