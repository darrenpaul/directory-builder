<script setup lang="ts">
import { adminPageMetaApiRoute } from '~~/constants/routes-api'

const loading = ref(false)
const state = reactive<{ [key: string]: string | undefined }>({
	comapny: undefined,
	location: undefined,
	pageSlug: undefined,
	imageUri: undefined,
	targetAudience: undefined,
	keywordResearch: undefined,
	focus: 'Coffee Directory Site',
})

async function onSubmit() {
	loading.value = true

	try {
		await $fetch(adminPageMetaApiRoute.path, {
			method: 'POST',
			body: {
				slug: state.pageSlug,
				image: state.imageUri,
				company: state.comapny,
				location: state.location,
				keywordResearch: state.keywordResearch,
				focus: state.focus,
			},
		})
	}
	finally {
		loading.value = false
	}
}
</script>

<template>
	<div>
		<div class="input-group w-full">
			<label class="label" for="comapny">Company</label>

			<input
				id="comapny"
				v-model="state.comapny"
				name="comapny"
				type="text"
				class="input input-bordered w-full"
			>
		</div>

		<div class="input-group w-full">
			<label class="label" for="page-slug">Page Slug</label>

			<input
				id="page-slug"
				v-model="state.pageSlug"
				name="page-slug"
				type="text"
				class="input input-bordered w-full"
			>
		</div>

		<div class="input-group w-full">
			<label class="label" for="image-uri">Image URI</label>

			<input
				id="image-uri"
				v-model="state.imageUri"
				name="image-uri"
				type="text"
				class="input input-bordered w-full"
			>
		</div>

		<div class="input-group w-full">
			<label class="label" for="location">Location</label>

			<input
				id="location"
				v-model="state.location"
				name="location"
				type="text"
				class="input input-bordered w-full"
			>
		</div>

		<div class="input-group w-full">
			<label class="label" for="location">Traget Audience</label>

			<input
				id="target-audience"
				v-model="state.targetAudience"
				name="target-audience"
				type="text"
				class="input input-bordered w-full"
			>
		</div>

		<div class="input-group w-full">
			<label class="label" for="focus">Focus</label>

			<textarea
				id="focus"
				v-model="state.focus"
				name="focus"
				type="text"
				class="textarea textarea-bordered h-24 w-full"
			/>
		</div>

		<div class="input-group w-full">
			<label class="label" for="keyword-research">Keyword Research</label>

			<textarea
				id="keyword-research"
				v-model="state.keywordResearch"
				name="keyword-research"
				type="text"
				class="textarea textarea-bordered h-24 w-full"
			/>
		</div>

		<button
			class="btn btn-neutral btn-block"
			:disable="loading"
			@click="onSubmit"
		>
			Generate Page Meta
		</button>
	</div>
</template>
