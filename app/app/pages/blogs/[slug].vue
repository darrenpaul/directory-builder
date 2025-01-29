<script setup lang="ts">
import type { Blog } from '~~/types/blog'
import { format } from 'date-fns'
import { blogsApiRoute } from '~~/constants/routes-api'

defineOgImageComponent('NuxtSeo')

const route = useRoute()

const {
	public: { siteUrl, siteName },
} = useRuntimeConfig()

const { data, error } = await useFetch<Blog>(
	`${blogsApiRoute.path}/${route.params.slug}`,
	{ method: 'GET' },
)

if (error.value) {
	throw createError({
		statusCode: 500,
		statusMessage: error.value?.message,
	})
}

if (!data.value) {
	throw createError({
		statusCode: 404,
		statusMessage: 'Not Found',
	})
}

useHead({
	link: [
		{
			hid: 'canonical',
			rel: 'canonical',
			href: `${siteUrl}${route.path}`,
		},
	],
})

useSeoMeta({
	title: data.value?.metadata?.title || '',
	ogTitle: data.value?.metadata?.title || '',
	description: data.value?.metadata?.description || '',
	ogDescription: data.value?.metadata?.description || '',
	twitterCard: 'summary_large_image',
})

useSchemaOrg([
	{
		'@type': 'BlogPosting',
		'headline': data.value?.metadata?.title,
		'author': {
			'@type': 'Person',
			'name': 'Darren Paul',
		},
		'datePublished': format(data.value?.createdAt, 'yyyy-MM-dd'),
		'dateModified': format(data.value?.updatedAt, 'yyyy-MM-dd'),
		'mainEntityOfPage': {
			'@type': 'WebPage',
			'@id': `${siteUrl}${route.path}`,
		},
		'image': data.value?.thumbnailUri,
		'publisher': {
			'@type': 'Organization',
			'name': siteName,
			'logo': {
				'@type': 'ImageObject',
				'url': `${siteUrl}/favicon.ico`,
			},
		},
		'description': data.value?.description,
		'articleBody': data.value?.content,
	},
])
</script>

<template>
	<div class="mx-auto max-w-[80ch] p-6">
		<h1 class="text-4xl font-bold mb-6">
			{{ data!.title }}
		</h1>

		<NuxtImg
			v-if="data!.thumbnailUri"
			class="w-full h-96 mb-4 object-cover rounded-lg"
			:src="data!.thumbnailUri"
			:alt="data!.title"
		/>

		<div class="tiptap" v-html="data!.content" />
	</div>
</template>
