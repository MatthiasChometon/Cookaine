<script setup lang="ts">
import type { QSelectProps } from 'quasar'

const { model, options, rules } = defineProps<{
	model: string
	label: string
	rules: any
	options: QSelectProps['options']
}>()
defineEmits(['update:model'])
</script>

<template>
	<q-select
		:model-value="model"
		filled
		:options="options"
		:label="label"
		lazy-rules
		:rules="rules"
		emit-value
		map-options
		use-input
		@update:model-value="(e) => $emit('update:model', e)"
	/>
</template>
