<script setup lang="ts">
import { useRefreshConnectedUser } from './authentication/composables/useRefreshConnectedUser'

useHead({
	title: 'Cookaine',
	meta: [{ name: 'Cookaine', content: 'Cookaine' }],
})

useRefreshConnectedUser()
</script>

<template>
	<RouterView />
</template>
