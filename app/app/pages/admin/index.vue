<script setup lang="ts">
import PageMeta from '~/components/admin/page-meta.vue'
import PlaceAttributeForm from '~/components/admin/place-attribute-form.vue'
import Places from '~/components/places.vue'

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
			<Places />
		</div>

		<div class="w-full">
			<p class="text-4xl font-bold">
				Create Page Meta
			</p>
			<PageMeta />
		</div>

		<div class="w-full">
			<p class="text-4xl font-bold">
				Add Attribute to Place
			</p>
			<PlaceAttributeForm />
		</div>
	</div>
</template>
