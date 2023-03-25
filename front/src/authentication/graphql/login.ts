import gql from 'graphql-tag'

export const LOGIN = gql`
	mutation login($input: LoginUserInput!) {
		login(loginUserInput: $input) {
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
