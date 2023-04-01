<script setup lang="ts">
import { UserStatus } from '~/common/generated/graphql'

const props = defineProps<{ userStatus: UserStatus }>()

const status = {
	[UserStatus.IsActive]: 'actif',
	[UserStatus.IsBanned]: 'bannie',
	[UserStatus.IsPending]: 'confirmation en attente',
}
</script>

<template>
	<p class="q-ma-none">status: {{ status[props.userStatus] }}</p>
</template>
