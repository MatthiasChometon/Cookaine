import { registerEnumType } from '@nestjs/graphql'

export enum RecipeOrderName {
	'creationDate' = 'recipe.creationDate',
}

registerEnumType(RecipeOrderName, {
	name: 'RecipeOrderName',
})
