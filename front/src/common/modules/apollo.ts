import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createUploadLink } from 'apollo-upload-client'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
	const cache = new InMemoryCache({
		addTypename: true,
	})
	const uri = `${import.meta.env.VITE_GRAPHQL_URL}/graphql`

	const link = createUploadLink({
		uri,
	})

	const authLink = setContext((_, { headers }) => {
		const token = localStorage.getItem('accessToken')
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		}
	})

	const apolloClient = new ApolloClient({
		link: authLink.concat(link),
		cache,
		uri,
		defaultOptions: {
			mutate: { errorPolicy: 'all' },
			watchQuery: { fetchPolicy: 'cache-and-network' },
		},
	})

	app.provide(DefaultApolloClient, apolloClient)
}
