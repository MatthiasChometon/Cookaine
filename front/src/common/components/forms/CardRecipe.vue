<script setup lang="ts">
const props = defineProps<{
	cookingTime: string
	difficulty: string
	img: string
	title: string
}>()
</script>

<template>
	<q-card class="q-ma-md flex column" style="width: 300px">
		<q-img :src="props.img" alt="" />
		<h6 class="text-center">{{ props.title }}</h6>

		<div class="flex row justify-around q-pa-md">
			<div class="flex column justify-around">
				<span>Temps:</span>
				<span>Difficulte:</span>
				<slot></slot>
			</div>
			<div class="flex column justify-around text-right text-subtitle1">
				<span>{{ props.cookingTime }}</span>
				<span>{{ props.difficulty }}</span>
			</div>
		</div>
	</q-card>
</template>
