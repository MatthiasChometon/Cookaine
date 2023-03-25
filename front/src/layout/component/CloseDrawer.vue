<script setup lang="ts">
defineEmits(['clickCloseDrawer'])
</script>

<template>
	<q-btn round color="primary" icon="close" @click="$emit('clickCloseDrawer')" />
</template>
