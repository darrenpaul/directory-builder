<script setup lang="ts">
import {
	accountRoute,
	accountSecurityRoute,
	homeRoute,
} from '~/constants/routes'
</script>

<template>
	<div class="bg-neutral-100 w-64 relative">
		<div class="bg-neutral-100 w-64 flex flex-col h-screen sticky top-0">
			<ul class="menu bg-base-200 text-base-content min-h-full">
				<div class="px-4">
					<p class="text-2xl font-bold">
						Account Dashboard
					</p>
				</div>

				<li>
					<NuxtLink :to="accountRoute.path">
						{{ accountRoute.label }}
					</NuxtLink>

					<NuxtLink :to="homeRoute.path">
						Listings
					</NuxtLink>

					<NuxtLink :to="accountSecurityRoute.path">
						{{ accountSecurityRoute.label }}
					</NuxtLink>
				</li>
			</ul>
		</div>
	</div>
</template>
