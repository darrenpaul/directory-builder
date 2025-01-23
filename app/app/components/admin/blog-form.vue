<script setup lang="ts">
import type { Blog } from '~~/types/blog'
import { adminBlogsApiRoute } from '~~/constants/routes-api'

const props = defineProps({
	data: { type: Object as PropType<Blog>, required: true },
})

const title = ref<string>('')
const description = ref<string>('')
const content = ref<string>('')
const thumbnailUri = ref<string>('')

onMounted(() => {
	title.value = props.data?.title || ''
	content.value = props.data?.content || ''
	description.value = props.data?.description || ''
	thumbnailUri.value = props.data?.thumbnailUri || ''
})

function onImageUpdated(value: string) {
	thumbnailUri.value = value
}

async function handleBlogSave() {
	await $fetch(`${adminBlogsApiRoute.path}/${props.data.slug}`, {
		method: 'PATCH',
		body: {
			title: title.value,
			content: content.value,
			slug: props.data.slug,
			description: description.value,
			thumbnailUri: thumbnailUri.value,
		},
	})
}
</script>

<template>
	<div>
		<div class="input-group w-full mb-6">
			<label class="label" for="title">Blog Title</label>

			<input
				id="title"
				v-model="title"
				name="title"
				type="text"
				class="input input-bordered w-full"
			>
		</div>

		<div class="input-group w-full mb-6">
			<label class="label" for="description">Blog Description</label>

			<textarea
				id="description"
				v-model="description"
				name="description"
				type="text"
				class="textarea textarea-bordered h-24 w-full"
			/>
			<small>Max 30 words recommended</small>
		</div>

		<AdminImageUpload
			:id="data.id"
			:slug="data.slug"
			@updated="onImageUpdated"
		/>

		<NuxtImg
			v-if="thumbnailUri"
			:src="thumbnailUri"
			class="w-full h-64 object-cover"
		/>

		<ClientOnly>
			<LazyRichTextEditor
				v-model="content"
				class="mb-6"
				label-title="Blog Editor"
				label-description=""
				:blog-id="data.id"
				:blog-slug="data.slug"
			/>
		</ClientOnly>

		<div class="tiptap max-w-[80ch]" v-html="content" />

		<button
			type="button"
			class="btn btn-neutral btn-block"
			@click="handleBlogSave"
		>
			Save Blog
		</button>
	</div>
</template>
