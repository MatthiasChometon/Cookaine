import gql from 'graphql-tag'

export const REFRESH = gql`
	mutation refreshTokens($refreshToken: String!) {
		refreshTokens(refreshToken: $refreshToken) {
			user {
				id
				email
				role
			}
			accessToken
			refreshToken
		}
	}
`
