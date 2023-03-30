<script setup lang="ts">
import Link from './Link.vue'
import { useLinks } from '~/composables/useLinks'
const { allLinks } = useLinks()
</script>

<template>
	<div>
		<Link
			v-for="link in allLinks"
			:key="link.text"
			:to="link.page"
			:link="link"
			class="q-pa-md q-px-md text-white flex justify-center content-center home-links"
			style="font-size: 18px"
		/>
	</div>
</template>
