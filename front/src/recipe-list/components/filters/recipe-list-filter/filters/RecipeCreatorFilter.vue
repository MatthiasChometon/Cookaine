<script setup lang="ts">
const { userIds } = defineProps<{
	userIds: string[]
}>()
defineEmits(['update'])

const userId = ref<string>()
</script>

<template>
	<p class="q-mt-md">Créateur</p>
	<q-select
		v-model="userId"
		filled
		use-input
		:options="userIds"
		@update:model-value="(v) => $emit('update', v)"
	/>
</template>
