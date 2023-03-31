import gql from 'graphql-tag'

export const CONFIRM_EMAIL = gql`
	mutation ConfirmEmail($email: String!, $emailCode: Int!) {
		confirmEmail(email: $email, emailCode: $emailCode) {
			user {
				id
				role
				email
			}
			accessToken
			refreshToken
		}
	}
`
