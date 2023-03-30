<script setup lang="ts">
import Link from './Link.vue'
import { useLinks } from '~/composables/useLinks'
const { allLinks } = useLinks()
</script>

<template>
	<Link
		v-for="link in allLinks"
		:key="link.text"
		:to="link.page"
		:link="link"
		class="text-h6 q-pa-md flex text-primary justify-center"
	/>
</template>
