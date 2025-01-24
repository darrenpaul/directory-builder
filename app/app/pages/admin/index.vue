<script setup lang="ts">
definePageMeta({
	layout: 'account-layout',
})
</script>

<template>
	<div class="w-full py-16 max-w-[80ch] mx-auto flex flex-col gap-16">
		<div class="w-full">
			<p class="text-4xl font-bold">
				Search for new places
			</p>
			<AdminPlaces />
		</div>

		<div class="w-full">
			<p class="text-4xl font-bold">
				Create Page Meta
			</p>
			<AdminPageMeta />
		</div>

		<div class="w-full">
			<p class="text-4xl font-bold">
				Add Attribute to Place
			</p>
			<AdminPlaceAttributeForm />
		</div>
	</div>
</template>
