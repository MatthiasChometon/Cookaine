<script setup lang="ts">
import type { QSelectProps } from 'quasar'

const { model, options, rules } = defineProps<{
	model: string[]
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
		multiple
		:options="options"
		use-chips
		:label="label"
		:rules="rules"
		option-label="name"
		option-value="id"
		emit-value
		map-options
		@update:model-value="(e) => $emit('update:model', e)"
	/>
</template>
