<script setup lang="ts">
import type { QSelectProps } from 'quasar'

const { model, options, rules } = defineProps<{
	model: string
	label: string
	rules: any
	options: QSelectProps['options']
}>()
defineEmits(['update:model'])

const filtredOptions = ref(options)

const filterFn = (val: string, update: (arg0: () => void) => void) => {
	update(() => {
		const needle = val.toLowerCase()
		filtredOptions.value = options?.filter((v) =>
			v.name.toLowerCase().includes(needle),
		)
	})
}
</script>

<template>
	<q-select
		:model-value="model"
		:options="filtredOptions"
		use-input
		input-debounce="0"
		:label="label"
		filled
		clearable
		:rules="rules"
		option-label="name"
		option-value="id"
		emit-value
		map-options
		@filter="filterFn"
		@update:model-value="(e) => $emit('update:model', e)"
	/>
</template>
