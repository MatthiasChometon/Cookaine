<script setup lang="ts">
import { useRefreshConnectedUser } from './authentication/composables/useRefreshConnectedUser'

useHead({
	title: 'App title',
	meta: [{ name: 'description', content: 'App title' }],
})

useRefreshConnectedUser()
</script>

<template>
	<RouterView />
</template>
