<script setup lang="ts">
const props = defineProps<{
	title: string
	isDisplay: boolean
}>()
</script>

<template>
	<h5 class="text-center">{{ props.title }}</h5>
	<div class="flex justify-end q-ma-md">
		<slot name="top"></slot>
	</div>

	<div v-if="props.isDisplay" class="flex justify-around">
		<slot name="center"></slot>
	</div>
</template>
