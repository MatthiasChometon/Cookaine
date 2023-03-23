import { acceptHMRUpdate, defineStore } from 'pinia'
import { useQuasar } from 'quasar'
import type { GraphqlResult } from '../types/graphql/GraphqlResult'

export const useNotification = defineStore('notification', () => {
	const $q = useQuasar()

	function sendNotification(
		result: GraphqlResult,
		successMessage: string,
		errorMessage: string,
	) {
		const color = result.errors ? 'warning' : 'info'
		const message = result.errors ? errorMessage : successMessage
		$q.notify({ color, textColor: 'white', message })
	}

	return { sendNotification }
})

if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useNotification, import.meta.hot))