<script setup lang="ts">
const props = defineProps<{
	imgLink: string
}>()
</script>

<template>
	<router-link to="/">
		<q-img :src="props.imgLink" spinner-color="white" style="width: 60px" fit="contain" /></router-link>
</template>
