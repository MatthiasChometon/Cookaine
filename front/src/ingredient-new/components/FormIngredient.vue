<script setup lang="ts">
import { useCreateIngredientMutation } from '~/common/generated/graphql'

const ingredientForm = ref({
	name: '',
	previewPicture: '',
	mesureUnits: [MesureUnit.Gram],
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

const { onDone, mutate: createIngredien } = useCreateIngredientMutation()
const router = useRouter()

onDone((result) => {
	sendNotification(
		result,
		'Ingrédient ajouter',
		'Une erreur est survenue lors de la création de votre ingrédient',
	)
	if (result.errors) return

	router.replace(`/`)
})
</script>

<template>
	<q-form class="q-ma-md" @submit="createIngredien({ input: ingredientForm })">
		<div>
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
			<q-btn label="Créer ma recette" type="submit" color="primary" />
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
