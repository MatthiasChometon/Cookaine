<template>
	<div class="q-px-md mobile-navbar">
		<div>
			<BurgerMenuButton />
		</div>
		<NavbarIcon img-link="public/logoWhite.svg" class="q-pa-md" />
	</div>
</template>

<style lang="scss">
@media (min-width: $breakpoint-sm-min) {
	.mobile-navbar {
		display: none;
	}
}

@media (max-width: $breakpoint-sm-max) {
	.mobile-navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
