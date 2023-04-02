<script setup lang="ts">
const { model, label } = defineProps<{
	model: string
	label: string
}>()
defineEmits(['update:model'])
</script>

<template>
	<q-input
		:model-value="model"
		:label="label"
		filled
		mask="time"
		:rules="[(val: string | null) => (val !== null && val !== '') || 'Ce champs est obligatoire']"
		@update:model-value="(e) => $emit('update:model', e)"
	>
		<template #append>
			<q-icon name="access_time" class="cursor-pointer">
				<q-popup-proxy cover transition-show="scale" transition-hide="scale">
					<q-time
						:model-value="model"
						format24h
						@update:model-value="(e) => $emit('update:model', e)"
					>
						<div class="row items-center justify-end">
							<q-btn v-close-popup label="Close" color="primary" flat />
						</div>
					</q-time>
				</q-popup-proxy>
			</q-icon>
		</template>
	</q-input>
</template>
