<script setup lang="ts">
const { defaultValue = false } = defineProps<{ defaultValue?: boolean }>()
defineEmits(['update'])

const isFromConnectedUser = ref(defaultValue)
</script>

<template>
	<q-checkbox
		v-model="isFromConnectedUser"
		left-label
		label="Mes recettes"
		@update:model-value="(v) => $emit('update', v)"
	/>
</template>
