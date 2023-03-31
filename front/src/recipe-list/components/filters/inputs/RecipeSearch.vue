<script setup lang="ts">
const props = defineProps<{
	labelColor?: string
	width?: string
	bg?: string
	dark?: boolean
}>()

const emit = defineEmits(['update'])
const search = ref('')

function resetSearch() {
	search.value = ''
	emit('update', search)
}
</script>

<template>
	<q-input
		v-model="search"
		:label-color="props.labelColor"
		:color="props.bg"
		:style="`align-self: center;${props.width}`"
		label="Rechercher une recette"
		filled
		dense
		:dark="props.dark"
		@update:model-value="$emit('update', search)"
	>
		<template #append>
			<q-icon v-if="search === ''" name="search" />
			<q-icon v-else name="clear" class="cursor-pointer" @click="resetSearch" />
		</template>
	</q-input>
</template>
