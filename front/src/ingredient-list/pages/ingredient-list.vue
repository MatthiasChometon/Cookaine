<script lang="ts" setup>
import { useIngredientsQuery } from '~/common/generated/graphql'
const { result, loading, error, onError, refetch } = useIngredientsQuery()
const { sendError } = useNotification()
onError(() => sendError('Une erreur est survenue'))
const { mutate: deleteIngredientMutation, onDone } =
	useRemoveIngredientMutation()
const deleteIngredient = async (idIngredient: string) => {
	await deleteIngredientMutation({ id: idIngredient })
	await refetch()
}
const router = useRouter()

const updateIngredient = (id: string) => {
	router.push(`/ingredient-edit/${id}`)
}
const { sendNotification } = useNotification()
onDone((result) => {
	sendNotification(
		result,
		'Ingrédient supprimer',
		'Une erreur est survenue lors de la suppréssion de votre ingrédient',
	)
})
</script>

<template>
	<h5 class="text-center">Liste des ingrédients</h5>
	<div class="flex justify-end q-ma-md">
		<q-btn
			label="Ajouter un ingrédient"
			color="primary"
			@click="router.push('/ingredient-new')"
		/>
	</div>

	<div
		v-if="!loading && !error && result?.ingredients !== undefined"
		class="flex justify-around"
	>
		<CardList
			:action-update="updateIngredient"
			:action-delete="deleteIngredient"
			:list-type="result?.ingredients"
		>
		</CardList>
	</div>
</template>
