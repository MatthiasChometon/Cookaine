<script lang="ts" setup>
import { useTagsQuery } from '~/common/generated/graphql'
const { result, loading, error, onError, refetch } = useTagsQuery()

const { sendError } = useNotification()
onError(() => sendError('Une erreur est survenue'))
const { mutate: deleteTagMutation, onDone } = useRemoveTagMutation()
const deleteTag = async (idTag: string) => {
	await deleteTagMutation({ id: idTag })
	await refetch()
}
const { sendNotification } = useNotification()
onDone((result) => {
	sendNotification(
		result,
		'Tag supprimer',
		'Une erreur est survenue lors de la suppréssion de votre tag',
	)
})
const router = useRouter()
const updateTag = (id: string) => {
	router.push(`/tag-edit/${id}`)
}
</script>

<template>
	<h5 class="text-center">Liste des tags</h5>
	<div class="flex justify-end q-ma-md">
		<q-btn
			label="Ajouter un tag"
			color="primary"
			@click="router.push('/tag-new')"
		/>
	</div>

	<div
		v-if="!loading && !error && result?.tags !== undefined"
		class="flex justify-around"
	>
		<CardList
			:action-update="updateTag"
			:action-delete="deleteTag"
			:list-type="result?.tags"
		>
		</CardList>
	</div>
</template>
