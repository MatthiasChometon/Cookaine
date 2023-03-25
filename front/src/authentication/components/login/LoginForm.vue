<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { LOGIN } from '~/authentication/graphql/login'
import { useConnectedUser } from '~/authentication/stores/connected'
import type { LoginInput } from '~/authentication/types/LoginInput'
import { useNotification } from '~/common/stores/notification'
const { sendNotification } = useNotification()
const { setConnectedUser } = useConnectedUser()
const router = useRouter()

const { mutate: login, onDone } = useMutation(LOGIN, {
	fetchPolicy: 'network-only',
})

const isPasswordVisible: boolean = $ref(false)
const loginInput: LoginInput = $ref({ email: '', password: '' })

onDone((result) => {
	const datas = result.data?.login
	sendNotification(result, 'Vous êtes connecté', 'Erreur lors de la connexion')
	if (result.errors) return
	setConnectedUser(datas)
	router.replace('/')
})
</script>

<template>
	<div class="full-height flex justify-center items-center column">
		<div class="flex justify-center text-h5 q-pb-md text-primary">connection</div>
		<q-form class="q-gutter-md q-pt-md" @submit="login({ input: loginInput })">
			<q-input
				v-model="loginInput.email"
				outlined
				label="Tapez votre email"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'tapez votre email']"
			/>

			<q-input
				v-model="loginInput.password"
				:rules="[
					(val) =>
						(val && val.length > 6) ||
						'Tapez votre mot de passe (minimum 6 caractères)',
				]"
				lazy-rules
				outlined
				:type="isPasswordVisible ? 'text' : 'password'"
				label="Votre mot de passe"
			>
				<template #append>
					<q-icon
						:name="isPasswordVisible ? 'visibility' : 'visibility_off'"
						class="cursor-pointer"
						@click="isPasswordVisible = !isPasswordVisible"
					/>
				</template>
			</q-input>

			<q-card-actions align="center">
				<q-btn label="login" type="submit" color="primary" />
			</q-card-actions>

			<RegisterLink />
		</q-form>
	</div>
</template>
