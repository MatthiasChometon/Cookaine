<script setup lang="ts">
defineEmits(['update'])

const maximumCookingTime = ref(5)
const maximumCookingTimeOptions = [
	{ value: 0, label: '15m', time: '00:15' },
	{ value: 1, label: '20m', time: '00:20' },
	{ value: 2, label: '30m', time: '00:30' },
	{ value: 3, label: '1h', time: '01:00' },
	{ value: 4, label: '2h', time: '02:00' },
	{ value: 5, label: '*', time: undefined },
]

function findTimeByValue(value: number): string | undefined {
	return maximumCookingTimeOptions.find((option) => option.value === value)?.time
}
</script>

<template>
	<q-slider
		v-model="maximumCookingTime"
		markers
		:marker-labels="maximumCookingTimeOptions"
		:min="0"
		:max="5"
		@change="() => $emit('update', findTimeByValue(maximumCookingTime))"
	/>
</template>
