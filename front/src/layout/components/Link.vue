<script setup lang="ts">
import type { Link } from '../types/Link'

const props = defineProps<{
	link: Link
	class: string
}>()
function runLinkEvent() {
	if (props.link.event) props.link.event()
}
</script>

<template>
	<router-link
		:to="link.page"
		replace
		:class="props.class"
		@click="runLinkEvent"
	>
		{{ link.text }}
	</router-link>
</template>

<style lang="scss">
a {
	text-decoration: none;
}
</style>
