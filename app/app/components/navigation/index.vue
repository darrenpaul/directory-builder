<script setup lang="ts">
import { homeRoute } from '~/constants/routes'
</script>

<template>
	<div class="w-full max-w-screen-2xl mx-auto px-4 md:px-0 py-4">
		<div class="flex justify-between items-center">
			<div>
				<NuxtLink class="text-3xl font-bold" :to="homeRoute.path">
					Nearby Coffee
				</NuxtLink>
			</div>

			<!-- <div class="flex items-center gap-8">
				<NuxtLink
					v-for="route in navigationRoutes"
					:key="route.name"
					:to="route.path"
				>
					{{ route.label }}
				</NuxtLink>

				<button class="btn btn-primary">
					Test Place
				</button>
			</div> -->
		</div>
	</div>
</template>
