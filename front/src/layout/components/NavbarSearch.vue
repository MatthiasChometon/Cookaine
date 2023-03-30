<script setup lang="ts">
const props = defineProps<{
	labelColor: string
	width: string
	bg: string
	dark: boolean
}>()
const search = ref('')
</script>

<template>
	<q-input
		v-model="search"
		:label-color="props.labelColor"
		:color="props.bg"
		class="q-ml-md"
		:style="`align-self: center;${props.width}`"
		outlined
		label="Rechercher une recette"
		dense
		:dark="props.dark"
	>
		<template #append>
			<q-icon v-if="search === ''" name="search" />
			<q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
		</template>
	</q-input>
</template>
