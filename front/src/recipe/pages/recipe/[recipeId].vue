<script setup lang="ts">
import { DifficultyTranslation } from '~/common/enums/difficultyTranslation'

const route = useRoute()
const recipeId = String(route.params.recipeId)

const { result, loading, error } = useRecipeAndIngredientsQuery({ recipeId })
const current_portion = ref(result.value?.recipe.portion)
</script>

<template>
	<div
		v-if="!loading && !error && result !== undefined"
		class="q-pa-md q-pa-md flex row"
	>
		<q-card class="q-ma-md flex column" style="width: 20%; height: fit-content">
			<div class="flex column justify-center" style="width: 100%">
				<q-img
					:src="result?.recipe.previewPicture"
					alt=""
					style="width: 100%; height: 300px"
				/>

				<div class="flex column q-ma-md q-pa-sm">
					<span class="text-h6">Tags associes</span>
					<div class="flex">
						<span
							v-for="(tag, index) in result?.recipe.tags"
							:key="index"
							class="q-pr-sm text-subtitle1"
						>
							{{ tag.name }}
						</span>
					</div>
				</div>

				<div class="flex column q-ma-md q-pa-sm">
					<p class="text-h6">Temps de préparation</p>
					<span>
						{{ result?.recipe.cookingTime }}
					</span>
				</div>

				<div class="flex column q-ma-md q-pa-sm">
					<p class="text-h6">Difficulte</p>
					<span>{{ DifficultyTranslation[result?.recipe.difficulty] }}</span>
				</div>
			</div>
		</q-card>

		<div style="width: 75%">
			<h4 class="text-center q-ma-xs">{{ result?.recipe.title }}</h4>
			<q-video :ratio="16 / 9" :src="result.recipe.tutorialVideo" />
			<CounterPortion
				:portion="result?.recipe.portion"
				@calculate-less-than-people="
					(newportion) => {
						current_portion = newportion
					}
				"
				@calculate-more-than-people="
					(newportion) => {
						current_portion = newportion
					}
				"
			></CounterPortion>
			<ListIngredients
				:ingredients="result?.recipe.ingredients"
				:portion="current_portion ?? result?.recipe.portion"
				:base-portion="result.recipe.portion"
			></ListIngredients>
			<div class="flex column justify-start">
				<h5 class="text-h5 text-center">Etapes</h5>
				<q-card
					v-for="(step, index) in result?.recipe.steps"
					:key="index"
					class="q-ma-md q-pa-md"
				>
					<p class="text-bold">Etape {{ index + 1 }}</p>
					<span class="text-body1">
						{{ step }}
					</span>
				</q-card>
			</div>
		</div>
	</div>
</template>
