<script setup lang="ts">
const props = defineProps({
	image: { type: String, required: true },
})
</script>

<template>
	<div
		class="h-full w-full flex flex-col gap-8 lg:grid grid-cols-2 items-center overflow-hidden rounded-2xl bg-base-200"
	>
		<div class="max-h-screen">
			<NuxtImg
				:width="2400"
				:height="3613"
				:src="props.image"
				loading="eager"
				:alt="$t('home.lander.imageAlt')"
			/>
		</div>

		<div class="text-center mx-auto max-w-[80ch] px-4">
			<h1 class="text-5xl font-bold mb-4">
				{{ $t("home.lander.title") }}
			</h1>

			<h2 class="mb-4">
				{{ $t("home.lander.description1") }}
			</h2>

			<p class="mb-4 text-xl">
				{{ $t("home.lander.description2") }}
			</p>

			<NuxtLink to="#search-form" class="btn btn-lg btn-neutral mb-4">
				{{ $t("home.lander.ctaButton") }}
			</NuxtLink>
		</div>
	</div>
</template>
