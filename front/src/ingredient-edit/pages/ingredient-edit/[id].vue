<script setup lang="ts">
const route = useRoute()
const { loading, error, onResult } = useIngredientQuery({
	id: String(route.params.id),
})

const id = ref(String(route.params.id))

const ingredientForm = ref({
	name: '',
	previewPicture: '',
	mesureUnits: [MesureUnit.Gram],
})

onResult((result) => {
	ingredientForm.value.name = result.data.ingredient.name
	ingredientForm.value.previewPicture = result.data.ingredient.previewPicture
	ingredientForm.value.mesureUnits = result.data.ingredient.mesureUnits
})

const mesureUnitOptions = [
	{
		name: MesureUnitTranslation[MesureUnit.Centiliters],
		id: MesureUnit.Centiliters,
	},
	{
		name: MesureUnitTranslation[MesureUnit.Gram],
		id: MesureUnit.Gram,
	},
	{
		name: MesureUnitTranslation[MesureUnit.Kilogram],
		id: MesureUnit.Kilogram,
	},
	{
		name: MesureUnitTranslation[MesureUnit.Liter],
		id: MesureUnit.Liter,
	},
	{
		name: MesureUnitTranslation[MesureUnit.Milliliter],
		id: MesureUnit.Milliliter,
	},
	{
		name: MesureUnitTranslation[MesureUnit.Pinch],
		id: MesureUnit.Pinch,
	},
	{
		name: MesureUnitTranslation[MesureUnit.Sachet],
		id: MesureUnit.Sachet,
	},
	{
		name: MesureUnitTranslation[MesureUnit.Tablespoon],
		id: MesureUnit.Tablespoon,
	},
	{
		name: MesureUnitTranslation[MesureUnit.Teaspoon],
		id: MesureUnit.Teaspoon,
	},
	{
		name: MesureUnitTranslation[MesureUnit.Unity],
		id: MesureUnit.Unity,
	},
]

const { sendNotification } = useNotification()

const { onDone, mutate: updateIngredient } = useUpdateIngredientMutation()
const router = useRouter()

onDone((result) => {
	sendNotification(
		result,
		'Ingrédient modifier',
		'Une erreur est survenue lors de la modification de votre ingrédient',
	)
	if (result.errors) return

	router.replace(`/ingredient-list`)
})
</script>

<template>
	<h5 class="text-center">Modifier votre ingrédient</h5>

	<q-form
		class="q-ma-md"
		@submit="updateIngredient({ input: ingredientForm, id })"
	>
		<div v-if="!loading && !error">
			<div class="flex q-mr-md justify-around" style="width: 100%">
				<Input
					type="text"
					:model="ingredientForm.name"
					label="Nom de l'ingredient"
					:rules="[(val: string | any[]) => (val && val.length > 0) || 'Champs obligatoire']"
					@update:model="(e) => (ingredientForm.name = e)"
				/>
				<Input
					type="url"
					:model="ingredientForm.previewPicture"
					label="Lien d'une image de l'ingredient"
					:rules="[(val: string | any[]) => (val && val.length > 0) || 'Champs obligatoire']"
					style="width: 40%"
					@update:model="(e) => (ingredientForm.previewPicture = e)"
				/>
				<SelectMultiple
					:options="mesureUnitOptions"
					:model="ingredientForm.mesureUnits"
					label="Unités"
					:rules="[
						(val: string | null) => (val !== null && val !== '') || 'Ce champs est obligatoire',
					]"
					style="width: 25%"
					@update:model="(e) => (ingredientForm.mesureUnits = e)"
				/>
			</div>
		</div>

		<div class="flex justify-center">
			<q-btn label="Modifier l'ingrdient" type="submit" color="primary" />
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
