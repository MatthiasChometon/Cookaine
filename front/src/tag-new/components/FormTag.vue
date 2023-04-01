<script setup lang="ts">
const tagForm = ref({
	name: '',
})

const { sendNotification } = useNotification()
const { onDone, mutate: createTag } = useCreateTagMutation()
const router = useRouter()

onDone((result) => {
	sendNotification(
		result,
		'Tag ajouter',
		'Une erreur est survenue lors de la création de votre tag',
	)
	if (result.errors) return
	router.replace(`/tag-list`)
})
</script>

<template>
	<q-form class="q-ma-md" @submit="createTag({ input: tagForm })">
		<div>
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
			<q-btn label="Ajouter un tag" type="submit" color="primary" />
		</div>
	</q-form>
</template>
