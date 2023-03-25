<script setup lang="ts">
import NavbarIcon from './NavbarIcon.vue'
import NavbarLinks from './NavbarLinks.vue'
import NavbarSearch from './NavbarSearch.vue'
import ConnexionButton from './ConnexionButton.vue'
import DeconnexionButton from './DeconnexionButton.vue'
import { useUserRole } from '~/composables/useUserRole'

const { isVisitor } = useUserRole()
</script>

<template>
	<div class="desktop-navbar justify-between" style="width: 100%">
		<div class="flex">
			<div class="flex justify-between">
				<NavbarIcon
					img-link="public/logoWhite.svg"
					class="q-pa-md q-pl-md flex justify-start content-center"
				/>
				<NavbarLinks class="flex justify-center content-center" />
			</div>
			<div class="flex justify-between">
				<NavbarSearch
					:dark="true"
					label-color="white"
					width="width : 350px"
					bg="white"
				/>
			</div>
		</div>
		<ConnexionButton
			v-if="isVisitor"
			class="q-pa-md q-px-md text-white flex justify-center content-center home-links"
		/>
		<DeconnexionButton
			v-if="!isVisitor"
			class="q-pa-md q-px-md text-white flex justify-center content-center home-links"
		/>
	</div>
</template>

<style lang="scss">
@media (min-width: $breakpoint-sm-min) {
	.desktop-navbar {
		display: flex;
		justify-content: 'space-between';
	}
}

@media (max-width: $breakpoint-sm-max) {
	.desktop-navbar {
		display: none;
	}
}
</style>
