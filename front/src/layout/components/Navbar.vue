<template>
	<q-header class="bg-primary flex q-header">
		<DesktopNavbar />
		<MobileNavbar />
	</q-header>
</template>

<style lang="scss">
body.body--dark .q-header,
body.body--dark .q-footer,
body.body--dark .q-drawer {
	background: $dark !important;
}

.q-header {
	box-shadow: 0 0 10px 2px #0003, 0 0 10px #0000003d;
}
</style>
