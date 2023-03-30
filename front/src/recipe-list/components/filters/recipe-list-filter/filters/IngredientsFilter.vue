<script setup lang="ts">
const { ingredientNames } = defineProps<{ ingredientNames: string[] }>()
defineEmits(['update'])

const ingredientNamesSelected = ref<string[]>([])
</script>

<template>
	<p class="q-mt-md">Ingredients</p>
	<q-select
		v-model="ingredientNamesSelected"
		filled
		use-input
		use-chips
		multiple
		emit-value
		map-options
		:options="ingredientNames"
		@update:model-value="(v) => $emit('update', v)"
	/>
</template>
