<script setup lang="ts">
const props = defineProps<{
	portion: number
	ingredients: any[]
}>()

let curremt_portion: number = props.portion

// Calculate more than people
async function calculateMoreThanPeople() {
	if (props.portion) {
		curremt_portion += 1
		const newRecipeQuantity = props.portion / curremt_portion

		// TODO Change quantity in ingredientsItem when portion up
		props.ingredients.forEach((item) => {
			console.log(
				(Math.round(item.quantity * newRecipeQuantity * 100) / 100).toFixed(2),
			)
		})
		console.log(curremt_portion)
	}
}

// Calculate less than people
async function calculateLessThanPeople() {
	if (props.portion) {
		const isZero = ifEgalZero()
		if (isZero) return
		curremt_portion -= 1
		const newRecipeQuantity = props.portion / curremt_portion

		// TODO Change quantity in ingredientsItem when portion down
		props.ingredients.forEach((item) => {
			console.log(
				(Math.round(item.quantity * newRecipeQuantity * 100) / 100).toFixed(1),
			)
		})
		console.log(curremt_portion)
	}
}

function ifEgalZero() {
	if (curremt_portion - 1 === 0) return true
	else return false
}
</script>

<template>
	<!-- Account people -->
	<q-card class="q-ma-xl flex justify-center">
		<q-btn type="button" class="q-ma-sm" @click="calculateLessThanPeople()"
			>-</q-btn
		>
		<div class="q-ma-sm">{{ curremt_portion }} persones</div>
		<q-btn type="button" class="q-ma-sm" @click="calculateMoreThanPeople()"
			>+</q-btn
		>
	</q-card>
</template>
