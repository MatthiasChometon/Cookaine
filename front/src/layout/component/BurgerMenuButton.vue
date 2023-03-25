<script setup lang="ts">
import CloseDrawer from './CloseDrawer.vue'
import BurgerMenuLinks from './BurgerMenuLinks.vue'
import NavbarIcon from './NavbarIcon.vue'
import NavbarSearch from './NavbarSearch.vue'
import ConnexionButton from './ConnexionButton.vue'
import DeconnexionButton from './DeconnexionButton.vue'
import { useBurgerMenuButton } from '~/stores/navbar/burgerMenu'
import { useUserRole } from '~/composables/useUserRole'
const isOpen = useBurgerMenuButton()
const { isVisitor } = useUserRole()
</script>

<template>
	<q-icon
		color="white"
		size="60px"
		name="menu"
		class="q-pa-md mobile-navbar home-icon"
		@click="isOpen = !isOpen"
	/>
	<q-drawer v-model="isOpen" side="left" overlay behavior="mobile" elevated>
		<div class="flex q-pa-md justify-end">
			<CloseDrawer @click-close-drawer="isOpen = !isOpen" />
		</div>
		<div class="flex justify-center">
			<NavbarIcon img-link="public/logo.svg" class="q-pa-md" />
		</div>
		<div class="flex column content-center">
			<BurgerMenuLinks />
		</div>
		<div class="flex column content-center">
			<NavbarSearch
				:dark="false"
				label-color="primary"
				width="width:250px"
				bg="primary"
			/>
		</div>
		<ConnexionButton
			v-if="isVisitor"
			class="text-h6 q-pa-md flex text-primary justify-center"
		/>
		<DeconnexionButton
			v-if="!isVisitor"
			class="text-h6 q-pa-md flex text-primary justify-center"
		/>
	</q-drawer>
</template>
