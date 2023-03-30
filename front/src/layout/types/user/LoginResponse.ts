import type { ConnectedUser } from './ConnectedUser'

export interface LoginResponse {
	user: ConnectedUser
	accessToken: string
	refreshToken: string
}
