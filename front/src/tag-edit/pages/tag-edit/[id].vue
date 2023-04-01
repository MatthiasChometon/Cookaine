<script setup lang="ts">
import { useTagQuery, useUpdateTagMutation } from '~/common/generated/graphql'

const route = useRoute()
const { loading, error, onResult } = useTagQuery({
	id: String(route.params.id),
})

const id = ref(String(route.params.id))

const tagForm = ref({
	name: '',
})

onResult((result) => {
	tagForm.value.name = result.data.tag.name
})

const { sendNotification } = useNotification()

const { onDone, mutate: updateTag } = useUpdateTagMutation()
const router = useRouter()

onDone((result) => {
	sendNotification(
		result,
		'Tag modifier',
		'Une erreur est survenue lors de la modification de votre tag',
	)
	if (result.errors) return

	router.replace(`/tag-list`)
})
</script>

<template>
	<h5 class="text-center">Modifier votre tag</h5>

	<q-form class="q-ma-md" @submit="updateTag({ input: tagForm, id })">
		<div v-if="!loading && !error">
			<div class="flex q-mr-md justify-around" style="width: 100%">
				<Input
					type="text"
					:model="tagForm.name"
					label="Nom du tag"
					:rules="[(val: string | any[]) => (val && val.length > 0) || 'Champs obligatoire']"
					@update:model="(e) => (tagForm.name = e)"
				/>
			</div>
		</div>

		<div class="flex justify-center">
			<q-btn label="Modifier le tag" type="submit" color="primary" />
		</div>
	</q-form>
</template>
