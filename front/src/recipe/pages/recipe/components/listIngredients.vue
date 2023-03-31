<script setup lang="ts">
import { MesureUnitTranslation } from '~/common/enums/mesureUnitTranslation'
import type { RecipeAndIngredientsQuery } from '~/common/generated/graphql'

const props = defineProps<{
	ingredients: RecipeAndIngredientsQuery['recipe']['ingredients']
	portion: number
	basePortion: number
}>()
</script>

<template>
	<div class="flex column justify-start">
		<h5 class="text-h5 text-center q-ma-md">Ingredients</h5>

		<div class="flex row justify-center">
			<q-card
				v-for="(ingredient, index) in props.ingredients"
				:key="index"
				class="q-ma-md q-pa-md"
			>
				<div>
					<q-img
						:src="ingredient.previewPicture"
						alt=""
						style="width: 250px; height: 250px"
					/>
				</div>
				<span>
					<p class="text-bold">
						{{ Math.round((ingredient.quantity * portion) / basePortion) }}
						{{ MesureUnitTranslation[ingredient.mesureUnit] }}
					</p>

					{{ ingredient.name }}
				</span>
			</q-card>
		</div>
	</div>
</template>
