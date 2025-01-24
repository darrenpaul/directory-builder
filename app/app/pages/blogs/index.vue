<script setup lang="ts">
import type { Blog } from '~~/types/blog'
import { kebabCase, startCase } from 'lodash-es'
import { blogsApiRoute, pageMetaApiRoute } from '~~/constants/routes-api'
import UrlQueryBuilder from '~/lib/builders/url-query-builder'

defineOgImageComponent('NuxtSeo')

const route = useRoute()

const pageMetaUrlQueryBuilder = new UrlQueryBuilder(pageMetaApiRoute.path)

const {
	public: { siteUrl },
} = useRuntimeConfig()

const fetchPromises = []

fetchPromises.push(
	useFetch<{ data: Blog[], count: number }>(
		blogsApiRoute.path,
		{ method: 'GET' },
	),
)

fetchPromises.push(
	useFetch<PageMeta>(
		pageMetaUrlQueryBuilder.withSlug({ slug: kebabCase(route.path as string) }).build(),
		{ method: 'GET' },
	),
)

const [{ data, error }, { data: pageMetaData }]
  = await Promise.all(fetchPromises)

if (error.value) {
	throw createError({
		statusCode: 500,
		statusMessage: error.value?.message,
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
	title: pageMetaData.value?.title || 'Nearby Nearby',
	ogTitle: pageMetaData.value?.title || 'Nearby Nearby',
	description: pageMetaData.value?.description || 'Nearby Nearby',
	ogDescription: pageMetaData.value?.description || 'Nearby Nearby',
	twitterCard: 'summary_large_image',
})

defineWebPage({
	'@type': 'WebPage',
	'image': pageMetaData.value?.image || '',
})
</script>

<template>
	<div class="mt-8">
		<BlogList v-if="data" class="mb-16" :blogs="data.data" />
	</div>
</template>
