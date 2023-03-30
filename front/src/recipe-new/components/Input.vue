<script setup lang="ts">
import type { QInputProps } from 'quasar'

const { model, label, rules } = defineProps<{
	model: string | undefined
	label: string
	rules: any
	type: QInputProps['type']
}>()
defineEmits(['update:model'])
</script>

<template>
	<q-input
		:model-value="model"
		filled
		:label="label"
		lazy-rules
		:rules="rules"
		:type="type"
		class="p-ma-none"
		@update:model-value="(e) => $emit('update:model', e)"
	/>
</template>
