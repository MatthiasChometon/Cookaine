<script setup lang="ts">
defineEmits(['update'])
</script>

<template>
	<p class="q-mt-md">Difficultés</p>
	<DifficultiesInput @update="(v) => $emit('update', v)" />
</template>
