<script setup lang="ts">
import { useConnectedUser } from '~/authentication/stores/connected'

const props = defineProps<{
    class: string
}>()
const { logout } = useConnectedUser()
</script>

<template>
    <router-link :class="props.class" style="font-size: 18px" to="/" @click="logout">
        Se déconnecter
    </router-link>
</template>
