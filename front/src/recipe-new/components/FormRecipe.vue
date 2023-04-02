<script setup lang="ts">
import type { DefaultRecipeForm } from '../interfaces/defaultRecipe'

const props = defineProps<{
	recipeValue: DefaultRecipeForm
}>()
defineEmits(['actionForm'])

const recipeForm = ref(props.recipeValue)

const ingredientList = ref(recipeForm.value.ingredients.length)
const stepsList = ref(recipeForm.value.steps.length)

const addIngredient = () => {
	ingredientList.value++
	recipeForm.value.ingredients.push({
		id: '',
		quantity: 0,
		mesureUnit: MesureUnit.Gram,
	})
}

const addStep = () => {
	stepsList.value++
	recipeForm.value.steps.push('')
}

const removeIngredient = (currentIngredient: number) => {
	ingredientList.value--
	recipeForm.value.ingredients.splice(currentIngredient, 1)
}

const removeStep = (currentStep: number) => {
	stepsList.value--
	recipeForm.value.steps.splice(currentStep, 1)
}

const difficultyOptions = [
	{
		label: DifficultyTranslation[Difficulty.Easy],
		value: Difficulty.Easy,
	},
	{
		label: DifficultyTranslation[Difficulty.Medium],
		value: Difficulty.Medium,
	},
	{
		label: DifficultyTranslation[Difficulty.Hard],
		value: Difficulty.Hard,
	},
]

const mesureUnitOptions = [
	{
		label: MesureUnitTranslation[MesureUnit.Centiliters],
		value: MesureUnit.Centiliters,
	},
	{
		label: MesureUnitTranslation[MesureUnit.Gram],
		value: MesureUnit.Gram,
	},
	{
		label: MesureUnitTranslation[MesureUnit.Kilogram],
		value: MesureUnit.Kilogram,
	},
	{
		label: MesureUnitTranslation[MesureUnit.Liter],
		value: MesureUnit.Liter,
	},
	{
		label: MesureUnitTranslation[MesureUnit.Milliliter],
		value: MesureUnit.Milliliter,
	},
	{
		label: MesureUnitTranslation[MesureUnit.Pinch],
		value: MesureUnit.Pinch,
	},
	{
		label: MesureUnitTranslation[MesureUnit.Sachet],
		value: MesureUnit.Sachet,
	},
	{
		label: MesureUnitTranslation[MesureUnit.Tablespoon],
		value: MesureUnit.Tablespoon,
	},
	{
		label: MesureUnitTranslation[MesureUnit.Teaspoon],
		value: MesureUnit.Teaspoon,
	},
	{
		label: MesureUnitTranslation[MesureUnit.Unity],
		value: MesureUnit.Unity,
	},
]
const { result, loading, error, onError } = useRecipeFiltersQuery()
const { sendError } = useNotification()
onError(() => sendError('Une erreur est survenue'))
</script>

<template>
	<q-form
		class="q-ma-md"
		style="width: 70%"
		@submit="$emit('actionForm', recipeForm)"
	>
		<h6>Informations</h6>
		<Input
			type="text"
			:model="recipeForm.title"
			label="Titre de la recette"
			:rules="[(val: string | any[]) => (val && val.length > 0) || 'Champs obligatoire']"
			@update:model="(e) => (recipeForm.title = e)"
		/>
		<div class="recipeInformation">
			<div class="flex column q-mr-md" style="width: 100%">
				<Input
					type="url"
					:model="recipeForm.previewPicture"
					label="Lien d'une image de la recette"
					:rules="[(val: string | any[]) => (val && val.length > 0) || 'Champs obligatoire']"
					@update:model="(e) => (recipeForm.previewPicture = e)"
				/>
				<Input
					type="url"
					:model="recipeForm.tutorialVideo"
					label="Lien d'une vidéo de la recette"
					:rules="[(val: string | any[]) => (val && val.length > 0) || 'Champs obligatoire']"
					@update:model="(e) => (recipeForm.tutorialVideo = e)"
				/>
			</div>
			<div class="flex column items-end q-ml-md" style="width: 100%">
				<div class="flex justify-between" style="width: 100%">
					<Select
						:options="difficultyOptions"
						:model="recipeForm.difficulty"
						label="Dificulté"
						:rules="[
						(val: string | null) => (val !== null && val !== '') || 'Ce champs est obligatoire',
					]"
						style="width: 45%"
						@update:model="(e) => (recipeForm.difficulty = e)"
					/>

					<q-input
						v-model.number="recipeForm.portion"
						type="number"
						label="Nombre de personne"
						style="width: 45%"
						class="p-ma-none"
						lazy-rules
						filled
						:rules="[
							(val: null | Number) => (val !== null && val !== 0) || 'Ce champs est obligatoire',
						]"
					>
					</q-input>
				</div>
				<div class="flex justify-between" style="width: 100%">
					<Time
						:model="recipeForm.cookingTime"
						label="Temps"
						style="width: 45%"
						@update:model="(e) => (recipeForm.cookingTime = e)"
					/>
					<SelectMultiple
						v-if="!loading && !error"
						:options="result?.tags"
						:model="recipeForm.tagIds"
						label="Tag"
						:rules="[
							(val: string | null) => (val !== null && val !== '' && val.length > 0) || 'Ce champs est obligatoire',
						]"
						style="width: 45%"
						@update:model="(e) => (recipeForm.tagIds = e)"
					/>
				</div>
			</div>
		</div>

		<div class="ingredients">
			<h6>Ingrédients</h6>

			<div
				v-for="currentIngredient in ingredientList"
				:key="currentIngredient"
				class="flex justify-between"
			>
				<q-input
					v-model.number="recipeForm.ingredients[currentIngredient - 1].quantity"
					type="number"
					label="Quantité"
					style="width: 45%"
					class="p-ma-none"
					lazy-rules
					filled
					:rules="[
						(val: null | Number) => (val !== null && val !== 0) || 'Ce champs est obligatoire',
					]"
				>
				</q-input>
				<Select
					:options="mesureUnitOptions"
					:model="recipeForm.ingredients[currentIngredient - 1].mesureUnit"
					label="Unité"
					:rules="[
						(val: string | null) => (val !== null && val !== '') || 'Ce champs est obligatoire',
					]"
					style="width: 25%"
					@update:model="
						(e) => (recipeForm.ingredients[currentIngredient - 1].mesureUnit = e)
					"
				/>
				<SelectAutocomplete
					v-if="!loading && !error"
					:options="result?.ingredients"
					:model="recipeForm.ingredients[currentIngredient - 1].id"
					label="Ingrédient"
					:rules="[
						(val: string | null) => (val !== null && val !== '') || 'Ce champs est obligatoire',
					]"
					style="width: 25%"
					@update:model="
						(e) => (recipeForm.ingredients[currentIngredient - 1].id = e)
					"
				/>
				<q-btn
					style="height: 20px"
					color="primary"
					class="q-mt-sm"
					@click="removeIngredient(currentIngredient - 1)"
					>X
				</q-btn>
			</div>
		</div>
		<q-btn
			style="height: 20px"
			color="primary"
			class="q-mt-sm"
			@click="addIngredient"
			>Ajouter un ingrédient
		</q-btn>
		<div class="steps">
			<h6>Etapes</h6>
			<div
				v-for="currentStep in stepsList"
				:key="currentStep"
				class="flex justify-between"
			>
				<Input
					type="textarea"
					:model="recipeForm.steps[currentStep - 1]"
					label="Etapes"
					:rules="[
					(val: string | null) => (val !== null && val !== '') || 'Ce champs est obligatoire',
				]"
					style="width: 90%"
					@update:model="(e) => (recipeForm.steps[currentStep - 1] = e)"
				/>
				<q-btn
					style="height: 20px"
					color="primary"
					class="q-mt-sm"
					@click="removeStep(currentStep - 1)"
					>X
				</q-btn>
			</div>
		</div>
		<q-btn style="height: 20px" color="primary" class="q-mt-sm" @click="addStep"
			>Ajouter une étape
		</q-btn>

		<div class="flex justify-center">
			<slot></slot>
		</div>
	</q-form>
</template>

<style lang="scss">
@media (min-width: $breakpoint-sm-min) {
	.recipeInformation {
		display: flex;
		justify-content: space-between;
	}
}

@media (max-width: $breakpoint-sm-max) {
	.recipeInformation {
		flex-direction: column;
	}

	.recipeInformation div {
		margin: unset !important;
	}
}
</style>
