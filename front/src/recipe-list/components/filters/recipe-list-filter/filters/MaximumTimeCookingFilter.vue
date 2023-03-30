<script setup lang="ts">
defineEmits(['update'])
</script>

<template>
	<div class="flex q-mt-md">
		<div class="q-mr-md">Temps maximum pour réaliser la recette</div>
		<MaximumTimeCookingInput @update="(v) => $emit('update', v)" />
	</div>
</template>
