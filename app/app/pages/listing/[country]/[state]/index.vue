<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import type { Place } from '~~/types/place'
import { startCase } from 'lodash-es'
import { pageMetaApiRoute, placesApiRoute } from '~~/constants/routes-api'
import settings from '~~/constants/settings'
import Filter from '~/components/filter.vue'
import PageBreadcrumbs from '~/components/page-breadcrumbs.vue'
import PlaceList from '~/components/place-list.vue'
import UrlQueryBuilder from '~/lib/builders/url-query-builder'
import { joinUrlDirectories } from '~/lib/url-directory-join'

const initialLimit = 10

const route = useRoute()
const limit = ref<number>(initialLimit)

const urlQueryBuilder = new UrlQueryBuilder(placesApiRoute.path)
const pageMetaUrlQueryBuilder = new UrlQueryBuilder(pageMetaApiRoute.path)

const queryUrl = computed(() => {
	const paramsAndQueries = {
		...(route?.params as Record<string, string>),
		...(route.query as Record<string, string>),
	}

	return urlQueryBuilder
		.withBusinessName(paramsAndQueries)
		.withCountryName(paramsAndQueries)
		.withStateName(paramsAndQueries)
		.withPostalCode(paramsAndQueries)
		.withUrlQueryKeys(paramsAndQueries)
		.withLimit({ limit: limit.value })
		.build()
})

const fetchPromises = []

fetchPromises.push(
	useFetch<Place[]>(queryUrl, { method: 'GET', watch: [queryUrl] }),
)
fetchPromises.push(
	useFetch<PageMeta>(
		pageMetaUrlQueryBuilder.withSlug({ slug: 'home' }).build(),
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

async function onLoadMore() {
	limit.value += initialLimit
}

useHead({
	link: [
		{
			hid: 'canonical',
			rel: 'canonical',
			href: `${settings.siteUrl}${route.path}`,
		},
	],
})

useSeoMeta({
	title: pageMetaData.value?.title || 'Nearby Nearby',
	ogTitle: pageMetaData.value?.title || 'Nearby Nearby',
	description: pageMetaData.value?.description || 'Nearby Nearby',
	ogDescription: pageMetaData.value?.description || 'Nearby Nearby',
	ogImage: pageMetaData.value?.image || '',
	twitterCard: 'summary_large_image',
})

defineWebPage({
	'@type': 'WebPage',
	'image': pageMetaData.value?.image || '',
})

const breadcrumbs = computed(() => {
	return [
		{
			id: route.params.country,
			url: joinUrlDirectories([route.params.country]),
			label: startCase(route.params.country),
		},
	]
})
</script>

<template>
	<div>
		<div class="w-full max-w-screen-2xl mx-auto px-4 py-8">
			<PageBreadcrumbs :crumbs="breadcrumbs" />

			<Filter />

			<div class="border-b border-neutral-200 mb-6">
				<PlaceList
					v-if="data.data"
					key-id="latest"
					class="mb-4"
					:places="data.data"
					:label="`Discover Coffee Shops in ${startCase(route.params.state as string)}`"
				/>

				<button
					v-if="data.count > limit"
					class="btn btn-block btn-neutral btn-outline"
					@click="onLoadMore"
				>
					Load More
				</button>
			</div>
		</div>

		<div class="bg-base-200 p-3 mb-6">
			<div class="flex flex-col gap-3 px-3 py-16 lg:my-32 max-w-[80ch] mx-auto">
				<h3 class="text-3xl font-bold">
					{{ $t("city.title") }}
				</h3>

				<p class="text-lg">
					{{ $t("city.description") }}
				</p>
			</div>
		</div>
	</div>
</template>
