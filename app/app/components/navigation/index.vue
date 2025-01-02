<script setup lang="ts">
import IconBrand from '~~/assets/icons/brand.svg'
import SubmitCoffeeShop from '~/components/submit-coffee-shop.vue'
import { homeRoute, navigationRoutes } from '~/constants/routes'
</script>

<template>
	<div class="w-full mx-auto px-4 md:px-16 py-4 shadow">
		<div class="flex justify-between items-center">
			<div>
				<NuxtLink
					class="text-3xl font-bold flex items-center gap-3"
					:to="homeRoute.path"
				>
					<IconBrand class="text-4xl" />

					Nearby Coffee
				</NuxtLink>
			</div>

			<div class="flex items-center gap-8">
				<NuxtLink
					v-for="route in navigationRoutes"
					:key="route.name"
					:to="route.path"
				>
					{{ route.label }}
				</NuxtLink>

				<SubmitCoffeeShop />
			</div>
		</div>
	</div>
</template>
