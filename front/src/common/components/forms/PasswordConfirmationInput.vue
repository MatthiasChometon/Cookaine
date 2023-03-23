<script setup lang="ts">
const props = defineProps<{
	password: string
}>()
const emit = defineEmits(['update'])
const isPasswordVisible: boolean = $ref(false)
const isRepeatedPasswordVisible: boolean = $ref(false)
const password = ref(props.password)
const repeatedPassword = $ref('')
watch(password, () => emit('update', password.value))
</script>

<template>
	<q-input
		v-model="password"
		:rules="[
			(val) =>
				(val && val.length > 6) ||
				'Votre mot de passe doit contenir au moins 6 caractères',
		]"
		lazy-rules
		outlined
		:type="isPasswordVisible ? 'text' : 'password'"
		label="Tapez votre mot de passe"
	>
		<template #append>
			<q-icon
				:name="isPasswordVisible ? 'visibility' : 'visibility_off'"
				class="cursor-pointer"
				@click="isPasswordVisible = !isPasswordVisible"
			/>
		</template>
	</q-input>

	<q-input
		v-model="repeatedPassword"
		outlined
		label="Retapez votre mot de passe"
		lazy-rules
		:rules="[
			(val) =>
				(val && val === password) || 'les mots de passe ne correspondent pas',
		]"
		:type="isRepeatedPasswordVisible ? 'text' : 'password'"
	>
		<template #append>
			<q-icon
				:name="isRepeatedPasswordVisible ? 'visibility' : 'visibility_off'"
				class="cursor-pointer"
				@click="isRepeatedPasswordVisible = !isRepeatedPasswordVisible"
			/>
		</template>
	</q-input>
</template>
