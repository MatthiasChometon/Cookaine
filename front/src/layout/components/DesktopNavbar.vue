<script setup lang="ts">
const { isVisitor } = useUserRole()
</script>

<template>
	<div class="desktop-navbar justify-between" style="width: 100%">
		<div class="flex">
			<div class="flex justify-between">
				<NavbarIcon
					img-link="/logoWhite.svg"
					class="q-pa-md q-pl-md flex justify-start content-center"
				/>
				<NavbarLinks class="flex justify-center content-center" />
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
