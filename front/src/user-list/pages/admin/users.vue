<script setup lang="ts">
const { sendError } = useNotification()
const { result, loading, error, onError } = useAdminUserListQuery()
const { onError: onBanError, mutate: banUser } = useAdminBanUserMutation()
const router = useRouter()

onError(() =>
	sendError('Une erreur est survenue lors de la récupération des utilisateurs'),
)
onBanError(() =>
	sendError("Une erreur est survenue lors du banissement de l'utilisateur"),
)
</script>

<template>
	<AdminList title="Liste des utilisateurs" :is-display="!loading && !error">
		<template #center>
			<q-card
				v-for="user in result?.users"
				:key="user.id"
				class="q-ma-md q-pa-sm"
				style="width: 30vw"
			>
				<div class="flex flex justify-between">
					<p class="q-ma-none">{{ user.email }}</p>
					<div>
						<q-icon
							name="edit"
							style="font-size: 20px"
							@click="router.push(`/admin/user/${user.id}`)"
						/>
						<q-icon
							name="delete"
							style="font-size: 20px"
							@click="banUser({ id: user.id })"
						/>
					</div>
				</div>
				<UserStatus :user-status="user.status"></UserStatus>
			</q-card>
		</template>
	</AdminList>
</template>
