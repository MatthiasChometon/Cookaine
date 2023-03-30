<script setup lang="ts">
const { users } = defineProps<{
	users: {
		id: string
		email: string
	}[]
}>()
defineEmits(['update'])

const user = ref<{
	id: string
	email: string
}>()
</script>

<template>
	<p class="q-mt-md">Créateurs</p>
	<q-select
		v-model="user"
		filled
		emit-value
		map-options
		option-label="email"
		option-value="id"
		:options="users"
		clearable
		@update:model-value="(v) => $emit('update', v)"
	/>
</template>
