<script setup lang="ts">
const props = defineProps<{
	class: string
}>()
</script>

<template>
	<div class="divConnexion">
		<router-link :class="props.class" style="font-size: 18px" to="/">
			Se déconnecter
		</router-link>
	</div>
</template>
