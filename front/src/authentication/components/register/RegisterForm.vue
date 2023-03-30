<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { REGISTER } from '~/authentication/graphql/register'
import { useNotification } from '~/common/stores/notification'
const { sendNotification } = useNotification()
const router = useRouter()

const newUser = $ref({
	password: '',
	email: '',
	firstName: '',
	lastName: '',
})

const { mutate: register, onDone } = useMutation(REGISTER, {
	fetchPolicy: 'network-only',
})

onDone((result) => {
	sendNotification(
		result,
		'Un code de validation a été envoyé à votre adresse mail',
		'Une erreur est survenue lors de la créationde de votre compte',
	)
	if (result.errors) return

	router.replace(`/validate-account/${result.data.register.email}`)
})
</script>

<template>
	<div class="full-height flex justify-center items-center column no-wrap">
		<div class="flex justify-center text-h5 q-pb-md text-primary">
			Inscription
		</div>
		<q-form class="q-gutter-md q-pt-md" @submit="register({ input: newUser })">
			<EmailInput
				:email="newUser.email"
				@update="(email) => (newUser.email = email)"
			/>
			<PasswordConfirmationInput
				:password="newUser.password"
				@update="(password) => (newUser.password = password)"
			/>

			<q-card-actions align="center">
				<q-btn label="Créer son compte" type="submit" color="primary" />
			</q-card-actions>

			<LoginLink />
		</q-form>
	</div>
</template>
