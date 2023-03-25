<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { CONFIRM_EMAIL } from '../../graphql/validateAccount'
import { useConnectedUser } from '~/authentication/stores/connected'
import { useNotification } from '~/common/stores/notification'
const { sendNotification } = useNotification()
const { setConnectedUser } = useConnectedUser()
const router = useRouter()
const route = useRoute()

const emailCode = ref(0)
const email = route.params.email

const { mutate, onDone } = useMutation(CONFIRM_EMAIL, {
	fetchPolicy: 'network-only',
})

onDone((result) => {
	sendNotification(
		result,
		'Vous etes connecté',
		'Une erreur est survenue lors de la création de votre compte',
	)
	if (result.errors) return

	setConnectedUser(result.data.confirmEmail)
	router.replace('/')
})
</script>

<template>
	<div class="full-height flex justify-center items-center column no-wrap">
		<div class="flex justify-center text-h5 q-pb-md text-primary">
			Validation de l'email
		</div>
		<q-form class="q-gutter-md q-pt-md" @submit="mutate({ emailCode, email })">
			<q-input
				v-model.number="emailCode"
				type="number"
				outlined
				label="Tapez le code à 6 chiffres reçu par mail"
				lazy-rules
			/>
			<q-card-actions align="center">
				<q-btn label="Créer son compte" type="submit" color="primary" />
			</q-card-actions>
		</q-form>
	</div>
</template>
