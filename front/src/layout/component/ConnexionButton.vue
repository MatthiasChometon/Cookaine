<script setup lang="ts">
const props = defineProps<{
	class: string
}>()
</script>

<template>
	<div class="divConnexion">
		<router-link :class="props.class" style="font-size: 18px" to="/">
			Se connecter
		</router-link>
		<router-link :class="props.class" style="font-size: 18px" to="/">
			S’inscrire
		</router-link>
	</div>
</template>

<style lang="scss">
@media (min-width: $breakpoint-sm-min) {
	.divConnexion {
		display: flex;
		justify-content: 'space-between';
	}
}

@media (max-width: $breakpoint-sm-max) {
	.divConnexion {
		display: flex;
		flex-direction: column;
		justify-content: 'space-between';
	}
}
</style>
