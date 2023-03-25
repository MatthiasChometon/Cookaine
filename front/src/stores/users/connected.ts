import { useQuasar } from 'quasar'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ConnectedUser } from '~/types/user/ConnectedUser'
import type { LoginResponse } from '~/types/user/LoginResponse'

export const useConnectedUser = defineStore('connectedUser', () => {
	const { $patch } = useConnectedUser()
	const router = useRouter()
	const { t } = useI18n()
	const $q = useQuasar()
	const connectedUser: ConnectedUser = $ref({
		role: 'visitor',
	})

	function setConnectedUser({
		user,
		accessToken,
		refreshToken,
	}: LoginResponse): void {
		$patch({ connectedUser: user })
		localStorage.setItem('accessToken', accessToken)
		localStorage.setItem('refreshToken', refreshToken)
	}

	function logout() {
		const visitor = {
			role: 'visitor',
		}
		$patch({ connectedUser: visitor })
		localStorage.clear()
		router.replace('/product/list')
		const message = t('account.onLogout')
		$q.notify({ message, color: 'info' })
	}

	function updateConnectedUser(user: ConnectedUser): void {
		$patch({ connectedUser: user })
	}

	return {
		updateConnectedUser,
		setConnectedUser,
		connectedUser,
		logout,
	}
})

if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useConnectedUser, import.meta.hot))
