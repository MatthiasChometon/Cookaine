<script setup lang="ts">
const props = defineProps<{
	ingredients: any[]
}>()

// TODO Change ungredient quantity by value in counterPortion
</script>

<template>
	<div class="flex column justify-start">
		<h5 class="text-h5">Ingredients</h5>
		<div class="flex row justify-center">
			<q-card
				v-for="(ingredient, index) in props.ingredients"
				:key="index"
				class="q-ma-md q-pa-md"
			>
				<div>
					<QImg src="{{ ingredient.previewPicture }}" alt="" />
				</div>
				<span>
					{{ ingredient.name }} / {{ ingredient.quantity }}
					{{ ingredient.mesureUnit }}
				</span>
			</q-card>
		</div>
	</div>
</template>
