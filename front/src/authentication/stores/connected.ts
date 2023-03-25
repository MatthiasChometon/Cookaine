import { defineStore } from 'pinia'
import { ConnectedUser } from '../types/ConnectedUser'
import { LoginResponse } from '../types/LoginResponse'

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
		router.replace('/')
		const message = t('Vous êtes déconnecté')
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
