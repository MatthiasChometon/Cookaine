import { defineStore } from 'pinia'
import type { ConnectedUser } from '../types/ConnectedUser'
import type { LoginResponse } from '../types/LoginResponse'

export const useConnectedUser = defineStore('connectedUser', () => {
	const { $patch } = useConnectedUser()
	const router = useRouter()
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
		const message = 'Vous êtes déconnecté'
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
