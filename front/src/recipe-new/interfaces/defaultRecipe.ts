import type { Difficulty, MesureUnit } from '~/common/generated/graphql'

export interface DefaultRecipeForm {
	title: string
	previewPicture: string
	tutorialVideo: string
	difficulty: Difficulty
	portion: number
	cookingTime: string
	tagIds: string[]
	ingredients: { id: string; quantity: number; mesureUnit: MesureUnit }[]
	steps: string[]
}
