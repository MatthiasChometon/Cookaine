import gql from 'graphql-tag'

export const HOME_RECIPES = gql`
	query Recipes($options: RecipeSearchInput!) {
		recipes(options: $options) {
			id
			title
			difficulty
			previewPicture
			cookingTime
		}
	}
`
