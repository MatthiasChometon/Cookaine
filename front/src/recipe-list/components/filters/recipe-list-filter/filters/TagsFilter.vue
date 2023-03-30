<script setup lang="ts">
const { tagNames } = defineProps<{ tagNames: string[] }>()
defineEmits(['update'])

const tagNamesSelected = ref<string[]>([])
</script>

<template>
	<p class="q-mt-md">Tags</p>
	<q-select
		v-model="tagNamesSelected"
		filled
		use-input
		use-chips
		emit-value
		map-options
		multiple
		input-debounce="0"
		:options="tagNames"
		@update:model-value="(v) => $emit('update', v)"
	/>
</template>
