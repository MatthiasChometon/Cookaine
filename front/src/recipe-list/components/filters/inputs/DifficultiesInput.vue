<script setup lang="ts">
defineEmits(['update'])
const difficulties = ref([])
const difficultiesOptions = [
	{ label: 'Facile', value: Difficulty.Easy },
	{ label: 'Moyen', value: Difficulty.Medium },
	{ label: 'Difficile', value: Difficulty.Hard },
]
</script>

<template>
	<q-select
		v-model="difficulties"
		filled
		use-input
		use-chips
		multiple
		:options="difficultiesOptions"
		emit-value
		map-options
		@update:model-value="$emit('update', difficulties)"
	/>
</template>
