<script setup lang="ts">
import type { DefaultList } from '../interfaces/DefaultList'
const props = defineProps<{
	listType: DefaultList[]
	actionUpdate: Function
	actionDelete: Function
}>()
</script>

<template>
	<q-card
		v-for="list in props.listType"
		:key="list.id"
		class="q-ma-md q-pa-sm"
		style="width: 30vw"
	>
		<div class="flex flex justify-between">
			<p class="q-ma-none">{{ list.name }}</p>
			<div>
				<q-icon
					name="edit"
					style="font-size: 20px"
					@click="actionUpdate(list.id)"
				/>

				<q-icon
					name="delete"
					style="font-size: 20px"
					@click="actionDelete(list.id)"
				/>
			</div>
		</div>
	</q-card>
</template>
