<script setup lang="ts">
import IconBrand from '~~/assets/icons/brand.svg'
import IconMenu from '~~/assets/icons/menu.svg'
import SubmitCoffeeShop from '~/components/submit-coffee-shop.vue'
import {
	homeRoute,
	navigationAuthenticatedRoutes,
	navigationRoutes,
} from '~/constants/routes'

const user = useSupabaseUser()

const visibleRoutes = computed(() => {
	if (user.value) {
		return navigationAuthenticatedRoutes
	}

	return navigationRoutes
})
</script>

<template>
	<div class="w-full mx-auto px-4 md:px-16 py-4 shadow">
		<div class="flex justify-between items-center">
			<NuxtLink
				class="text-lg lg:text-3xl font-bold flex items-center gap-3"
				:to="homeRoute.path"
			>
				<IconBrand class="text-4xl" />

				Nearby Coffee
			</NuxtLink>

			<div class="hidden md:flex items-center gap-8">
				<NuxtLink
					v-for="route in visibleRoutes"
					:key="route.name"
					:to="route.path"
					active-class="font-bold underline"
				>
					{{ route.label }}
				</NuxtLink>

				<SubmitCoffeeShop />
			</div>

			<div class="drawer drawer-end block md:hidden w-fit">
				<input id="mobile-drawer" type="checkbox" class="drawer-toggle">
				<div class="drawer-content">
					<label for="mobile-drawer" class="drawer-button btn"><IconMenu :font-controlled="false" class="w-6 h-6" /></label>
				</div>

				<div class="drawer-side">
					<label
						for="mobile-drawer"
						aria-label="close sidebar"
						class="drawer-overlay"
					/>
					<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
						<li v-for="route in visibleRoutes" :key="route.name">
							<NuxtLink :to="route.path">
								{{ route.label }}
							</NuxtLink>
						</li>

						<SubmitCoffeeShop class="mt-8" />
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
