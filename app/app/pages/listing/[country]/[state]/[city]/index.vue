<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import type { Place } from '~~/types/place'
import { kebabCase, startCase } from 'lodash-es'
import { pageMetaApiRoute, placesApiRoute } from '~~/constants/routes-api'
import Filter from '~/components/filter.vue'
import PageBreadcrumbs from '~/components/page-breadcrumbs.vue'
import PlaceList from '~/components/place-list.vue'
import UrlQueryBuilder from '~/lib/builders/url-query-builder'
import { joinUrlDirectories } from '~/lib/url-directory-join'

defineOgImageComponent('NuxtSeo')

const {
	public: { siteUrl },
} = useRuntimeConfig()

const { t } = useI18n()
const route = useRoute()

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
		.withCityName(paramsAndQueries)
		.withPostalCode(paramsAndQueries)
		.withUrlQueryKeys(paramsAndQueries)
		.withLimit(paramsAndQueries)
		.build()
})

const limit = computed(
	() => Number.parseInt(route.query.limit as string) || 10,
)

const fetchPromises = []

fetchPromises.push(
	useFetch<Place[]>(queryUrl, { method: 'GET', watch: [queryUrl] }),
)
fetchPromises.push(
	useFetch<PageMeta>(
		pageMetaUrlQueryBuilder
			.withSlug({
				slug: kebabCase(
					[
						route.params.country as string,
						route.params.state as string,
						route.params.city as string,
					].join('-'),
				),
			})
			.build(),
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

useSchemaOrg([
	{
		'@type': 'LocalBusiness',
		'name': `${startCase(route.params.city as string)} ${t('schemaOrg.name')}`,
		'description': `${t('schemaOrg.name')} ${startCase(route.params.city as string)} `,
		'address': {
			'@type': 'PostalAddress',
			'addressRegion': `${startCase(route.params.state as string)}`,
			'addressCountry': `${startCase(route.params.country as string)}`,
		},
	},
])

const breadcrumbs = computed(() => {
	return [
		{
			id: route.params.country,
			url: joinUrlDirectories([route.params.country]),
			label: startCase(route.params.country),
		},
		{
			id: route.params.country,
			url: joinUrlDirectories([route.params.country, route.params.state]),
			label: startCase(route.params.state),
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
					:label="
						t('placeList.label', {
							city: startCase(route.params.city as string),
						})
					"
				/>

				<NuxtLink
					v-if="data.count > limit"
					class="btn btn-block btn-neutral btn-outline"
					:to="{ query: { limit: limit + 10 } }"
				>
					Load More
				</NuxtLink>
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
