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
const { sendNotification } = useNotification()

onDone((result) => {
	sendNotification(
		result,
		'Ingrédient supprimer',
		'Une erreur est survenue lors de la suppréssion de votre ingrédient',
	)
})

const router = useRouter()
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

	<div v-if="!loading && !error" class="flex justify-around">
		<q-card
			v-for="ingredient in result?.ingredients"
			:key="ingredient.id"
			class="q-ma-md q-pa-sm"
			style="width: 30vw"
		>
			<div class="flex flex justify-between">
				<p class="q-ma-none">{{ ingredient.name }}</p>
				<div>
					<q-icon
						name="edit"
						style="font-size: 20px"
						@click="router.push(`/ingredient-edit/${ingredient.id}`)"
					/>

					<q-icon
						name="delete"
						style="font-size: 20px"
						@click="deleteIngredient(ingredient.id)"
					/>
				</div>
			</div>
		</q-card>
	</div>
</template>
