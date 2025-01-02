<script setup lang="ts"></script>

<template>
	<div
		class="h-auto lg:h-screen w-full flex flex-col gap-8 lg:grid grid-cols-2 items-center overflow-hidden rounded-2xl"
	>
		<div class="max-h-screen">
			<NuxtImg
				src="https://ljfljcbbwdwbroptxhwv.supabase.co/storage/v1/object/public/page/landing-page.jpg"
			/>
		</div>

		<div class="text-center mx-auto max-w-[80ch]">
			<h1 class="text-5xl font-bold mb-4">
				Find Local Coffee Shops Near You
			</h1>

			<h2 class="mb-4">
				Looking for the perfect coffee spot? NearbyCoffee.info helps you find
				local cafés in any city worldwide. Whether you need a cozy study space,
				a remote work haven, or just your daily caffeine fix, we've got you
				covered.
			</h2>

			<h3 class="mb-4 text-xl">
				Discover Your Next Favorite Coffee Shop
			</h3>

			<NuxtLink to="#search-form" class="btn btn-lg btn-neutral">
				Find Coffee
			</NuxtLink>
		</div>
	</div>
</template>
