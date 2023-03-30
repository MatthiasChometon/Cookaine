<script setup lang="ts">
const { t } = useI18n()
const links: {
	page: string
	text: string
}[] = $ref([
	{
		page: '',
		text: 'Condition générale d’utilisation',
	},
	{
		page: '',
		text: 'Mention légal',
	},
])
</script>

<template>
	<q-footer class="bg-primary text-white flex justify-between">
		<div
			class="q-ma-md flex justify-between items-center footer"
			style="width: 100%"
		>
			<div class="q-ma-md">
				<q-img src="../../common/assets/logoWhite.svg" style="width: 50px" />
			</div>
			<div class="q-ma-md flex column">
				<p class="text-center">Nos réseaux</p>
				<div>
					<router-link to="" class="q-mx-md"
						><img src="../../common/assets/facebook.png" style="width: 20px" alt=""
					/></router-link>
					<router-link to="" class="q-mx-md"
						><img src="../../common/assets/instagram.png" style="width: 20px" alt=""
					/></router-link>
					<router-link to="" class="q-mx-md"
						><img src="../../common/assets/twitter.png" style="width: 20px" alt=""
					/></router-link>
					<router-link to="" class="q-mx-md"
						><img src="../../common/assets/youtube.png" style="width: 20px" alt=""
					/></router-link>
				</div>
			</div>
			<router-link
				v-for="link in links"
				:key="link.text"
				:to="link.page"
				replace
				class="link"
			>
				{{ t(link.text) }}
			</router-link>
		</div>
	</q-footer>
</template>

<style lang="scss">
.link {
	text-decoration: none;
	color: white;
}
@media (max-width: $breakpoint-sm-max) {
	.footer {
		flex-direction: column;
	}
}
</style>
