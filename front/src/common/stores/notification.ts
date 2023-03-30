import { defineStore } from 'pinia'
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

	function sendError(message: string) {
		$q.notify({ color: 'warning', textColor: 'white', message })
	}

	return { sendNotification, sendError }
})
