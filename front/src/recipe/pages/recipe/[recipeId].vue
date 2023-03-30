<script setup lang="ts">
const route = useRoute()
const recipeId = String(route.params.recipeId)

const { result, loading } = useRecipeAndIngredientsQuery({ recipeId })
</script>

<template>
	<div class="q-pa-md q-pa-md flex row">
		<!-- aside -->
		<q-card
			class="q-ma-md flex column"
			style="width: 300px; background: rgb(230, 230, 230)"
		>
			<!-- TODO Set back button -->
			<div class="flex column justify-center" style="height: 100vh">
				<QImg src="" alt="" />

				<q-card class="flex q-ma-md q-pa-sm">
					<span class="text-h6">Tags associes</span>
					<div class="flex">
						<span
							v-for="(tag, index) in result?.recipe.tags"
							:key="index"
							class="q-pa-sm text-subtitle1"
						>
							{{ tag.name }}
						</span>
					</div>
				</q-card>

				<q-card class="flex q-ma-md q-pa-sm">
					<p class="text-h6">Temps de preparation:</p>
					<span class="text-h5">
						{{ result?.recipe.cookingTime }}
					</span>
				</q-card>

				<q-card class="flex q-ma-md q-pa-sm">
					<p class="text-h6">Difficulte:</p>
					<span class="text-h5">{{ result?.recipe.difficulty }}</span>
				</q-card>
			</div>
		</q-card>

		<!-- main -->
		<q-card
			class="q-ma-md q-pa-md flex column justify-center"
			style="width: 1400px; background: rgb(230, 230, 230)"
		>
			<h2 class="flex justify-center">{{ result?.recipe.title }}</h2>
			<!-- Video -->
			<div>
				<video src="{{ result?.recipe.tutorialVideo }}"></video>
			</div>
			<CounterPortion
				v-if="!loading"
				:portion="result?.recipe.portion"
				:ingredients="result?.recipe.ingredients"
			></CounterPortion>
			<!-- Ingredients -->
			<ListIngredients
				v-if="!loading"
				:ingredients="result?.recipe.ingredients"
			></ListIngredients>
			<!-- Steps -->
			<div class="flex column justify-start">
				<h5 class="text-h5">Etapes</h5>
				<q-card
					v-for="(step, index) in result?.recipe.steps"
					:key="index"
					class="q-ma-md q-pa-md"
				>
					<p>Etape {{ index }}</p>
					<span class="text-body1">
						{{ step }}
					</span>
				</q-card>
			</div>
		</q-card>
	</div>
</template>
