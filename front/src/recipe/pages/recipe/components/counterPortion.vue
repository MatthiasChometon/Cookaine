<script setup lang="ts">
const props = defineProps<{
	portion: number
}>()

const emit = defineEmits(['calculateMoreThanPeople', 'calculateLessThanPeople'])
let current_portion = $ref(props.portion)

async function calculateMoreThanPeople() {
	if (props.portion) {
		current_portion += 1
		emit('calculateMoreThanPeople', current_portion)
	}
}

async function calculateLessThanPeople() {
	if (props.portion) {
		const isZero = ifEgalZero()
		if (isZero) return
		current_portion -= 1
		emit('calculateLessThanPeople', current_portion)
	}
}

function ifEgalZero() {
	if (current_portion - 1 === 0) return true
	else return false
}
</script>

<template>
	<div class="q-ma-md flex justify-center">
		<q-btn type="button" class="q-ma-sm" @click="calculateLessThanPeople()"
			>-</q-btn
		>
		<div class="q-ma-sm flex items-center">{{ current_portion }} persones</div>
		<q-btn type="button" class="q-ma-sm" @click="calculateMoreThanPeople()"
			>+</q-btn
		>
	</div>
</template>
