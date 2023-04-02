<script setup lang="ts">
const props = defineProps<{
	cookingTime: string
	difficulty: string
	img: string
	title: string
	id: string
}>()
const router = useRouter()
</script>

<template>
	<q-card class="q-ma-md flex column" style="width: 300px">
		<q-img
			:src="props.img"
			alt=""
			style="width: 100%; height: 250px"
			@click="router.push(`/recipe/${props.id}`)"
		/>
		<h6 class="text-center">{{ props.title }}</h6>

		<div class="flex row justify-around q-pa-md">
			<div class="flex column">
				<span>Temps:</span>
				<span>Difficulte:</span>
			</div>
			<div class="flex column justify-around text-right text-subtitle1">
				<span class="text-bold">{{ props.cookingTime }}</span>
				<span class="text-bold">{{ props.difficulty }}</span>
				<slot></slot>
			</div>
		</div>
	</q-card>
</template>
