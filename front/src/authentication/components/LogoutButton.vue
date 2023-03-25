<script setup lang="ts">
import { useUserRole } from '~/composables/useUserRole'
import { useConnectedUser } from '~/stores/users/connected'

const { t } = useI18n()
const { logout } = useConnectedUser()
const { isVisitor } = useUserRole()
</script>

<template>
  <q-btn v-if="!isVisitor" color="primary" @click="logout">
    {{ t('account.logout') }}
  </q-btn>
</template>
