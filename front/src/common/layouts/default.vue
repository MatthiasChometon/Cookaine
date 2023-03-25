<script setup lang="ts">
import Footer from '~/layout/component/Footer.vue'
import Navbar from '~/layout/component/Navbar.vue'
</script>

<template>
	<q-layout view="lhr lpr lfr">
		<Navbar />
		<q-page-container>
			<RouterView class="q-py-lg" />
		</q-page-container>
		<Footer />
	</q-layout>
</template>

<style lang="scss">
.q-footer {
	z-index: 10 !important;
}

.q-page-container {
	width: 100%;
}
.q-layout {
	display: flex;
}

@media (min-width: $breakpoint-sm-min) {
	.icon {
		font-size: $icon-desktop-size !important;
	}
}

@media (max-width: $breakpoint-sm-max) {
	.icon {
		font-size: $icon-mobile-size !important;
	}
}
</style>
