import gql from 'graphql-tag'

export const REGISTER = gql`
	mutation Register($input: CreateUserInput!) {
		register(createUserInput: $input) {
			email
		}
	}
`
