<script setup lang="ts">
const { defaultValue } = defineProps<{ defaultValue: number }>()
defineEmits(['update'])
const current = ref(defaultValue)
</script>

<template>
	<div class="q-pa-lg flex justify-center">
		<q-pagination
			v-model="current"
			color="black"
			:max="100"
			:max-pages="5"
			:boundary-numbers="false"
			@update:model-value="(v) => $emit('update', v)"
		/>
	</div>
</template>
