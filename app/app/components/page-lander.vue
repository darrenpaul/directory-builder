<script setup lang="ts"></script>

<template>
	<div
		class="h-auto lg:h-screen w-full flex flex-col gap-8 lg:grid grid-cols-2 items-center overflow-hidden rounded-2xl"
	>
		<div class="max-h-screen">
			<NuxtImg
				src="https://ljfljcbbwdwbroptxhwv.supabase.co/storage/v1/object/public/page/nearby-coffee-landing-page.webp"
			/>
		</div>

		<div class="text-center mx-auto max-w-[80ch] px-4">
			<h1 class="text-5xl font-bold mb-4">
				Discover Your Perfect Cup at Cape Town's Best Coffee Shops
			</h1>

			<h2 class="mb-4">
				Find exceptional coffee spots around Cape Town with Nearby Coffee - your local guide to the city's vibrant café culture. From hidden gems in City Bowl to seaside spots in Sea Point, explore artisanal roasteries, cozy cafés, and specialty coffee houses just moments away.
			</h2>

			<h3 class="mb-4 text-xl">
				Start exploring Cape Town's coffee culture today - your next great cup is just around the corner.
			</h3>

			<NuxtLink to="#search-form" class="btn btn-lg btn-neutral">
				Find Coffee
			</NuxtLink>
		</div>
	</div>
</template>
