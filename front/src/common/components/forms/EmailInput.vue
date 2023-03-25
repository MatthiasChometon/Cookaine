<script setup lang="ts">
const props = defineProps<{
	email: string
}>()
const emit = defineEmits(['update'])
const email = ref(props.email)
const isEmailValid = $computed(() =>
	email.value.match(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	),
)
watch(email, () => emit('update', email.value))
</script>

<template>
	<q-input
		v-model="email"
		outlined
		label="Tapez votre adresse mail"
		lazy-rules
		:rules="[(val) => (val && isEmailValid) || 'Votre adresse mail est invalide']"
	/>
</template>
