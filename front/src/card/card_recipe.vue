<script setup lang="ts">
let { params } = useRoute()
params = {
	user: 'aze',
	cookingTime: '230',
	difficulty: 'Facile',
	img: '',
}
</script>

<template>
	<q-card
		class="q-ma-md flex column"
		style="width: 300px; background: rgb(230, 230, 230)"
	>
		<span>
			<img src="{{ params.img }}" alt="" />
		</span>

		<div class="flex row justify-around q-pa-md">
			<div class="flex column justify-around">
				<span class="text-h6">Temps:</span>
				<span class="text-h6">Difficulte:</span>
				<span v-if="params.user" class="text-h6">Action:</span>
			</div>
			<div class="flex column justify-around text-right text-subtitle1">
				<span v-if="params.cookingTime">{{ params.cookingTime }}</span>
				<span v-else>...</span>
				<span v-if="params.difficulty">{{ params.difficulty }}</span>
				<span v-else>...</span>
				<span>{{ params.difficulty }}</span>
				<slot></slot>
			</div>
		</div>
	</q-card>
</template>
