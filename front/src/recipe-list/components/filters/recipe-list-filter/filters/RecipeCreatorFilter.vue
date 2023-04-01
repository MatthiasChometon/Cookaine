<script setup lang="ts">
import type { InputMaybe } from '~/common/generated/graphql'

const { users, defaultValue } = defineProps<{
	users: {
		id: string
		email: string
	}[]
	defaultValue: InputMaybe<string> | undefined
}>()
defineEmits(['update'])
const defaultUser = computed(() => users.find((u) => u.id === defaultValue))

const user = ref(defaultUser.value)
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
