<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import type { Place } from '~~/types/place'
import { startCase } from 'lodash-es'
import { pageMetaApiRoute, placeApiRoute } from '~~/constants/routes-api'
import settings from '~~/constants/settings'
import PlaceList from '~/components/place-list.vue'
import SearchInput from '~/components/search-input.vue'
import { cityRoute, countryRoute, homeRoute } from '~/constants/routes'
import UrlQueryBuilder from '~/lib/builders/url-query-builder'

const route = useRoute()
const router = useRouter()

const queryBusinessName = ref<string | undefined>(
	(route.query.businessName as string) || undefined,
)
const queryCountryName = ref<string | undefined>(
	(route.query.countryName as string) || undefined,
)
const queryCityName = ref<string | undefined>(
	(route.query.cityName as string) || undefined,
)

const urlQueryBuilder = new UrlQueryBuilder(placeApiRoute.path)
const pageMetaUrlQueryBuilder = new UrlQueryBuilder(pageMetaApiRoute.path)

const queryUrl = computed(() => {
	const queryParams = route?.params as Record<string, string>

	return urlQueryBuilder
		.withBusinessName(queryParams)
		.withCountryName(queryParams)
		.withCityName(queryParams)
		.build()
})

const [{ data: placeData, error: placeError }, { data: pageMetaData }]
  = await Promise.all([
  	useFetch<Place[]>(queryUrl, { method: 'GET', watch: [queryUrl] }),
  	useFetch<PageMeta>(
  		pageMetaUrlQueryBuilder.withSlug({ slug: 'home' }).build(),
  		{ method: 'GET' },
  	),
  ])

if (placeError.value) {
	throw createError({
		statusCode: 500,
		statusMessage: placeError.value?.message,
	})
}

async function onSearch() {
	const queryParams = {
		...route.query,
	}

	if (queryBusinessName.value) {
		queryParams.businessName = queryBusinessName.value
	}
	else {
		delete queryParams.businessName
	}

	if (queryCountryName.value) {
		queryParams.countryName = queryCountryName.value
	}
	else {
		delete queryParams.countryName
	}

	if (queryCityName.value) {
		queryParams.cityName = queryCityName.value
	}
	else {
		delete queryParams.cityName
	}

	router.push({
		query: queryParams,
	})
}

useHead({
	link: [
		{
			hid: 'canonical',
			rel: 'canonical',
			href: `${settings.siteUrl}`,
		},
	],
})

useSeoMeta({
	title: pageMetaData.value?.title || 'Coffee Nearby',
	ogTitle: pageMetaData.value?.title || 'Coffee Nearby',
	description: pageMetaData.value?.description || 'Coffee Nearby',
	ogDescription: pageMetaData.value?.description || 'Coffee Nearby',
	ogImage: pageMetaData.value?.image || '',
	twitterCard: 'summary_large_image',
})

defineWebPage({
	'@type': 'WebPage',
	'image': pageMetaData.value?.image || '',
})
</script>

<template>
	<div class="py-8">
		<div class="w-full max-w-screen-2xl mx-auto px-4">
			<div class="breadcrumbs text-sm mb-4">
				<ul>
					<li>
						<NuxtLink :to="homeRoute.path">
							{{ homeRoute.label }}
						</NuxtLink>
					</li>

					<li>
						<NuxtLink :to="countryRoute.path">
							{{ countryRoute.label }}
						</NuxtLink>
					</li>

					<li>
						<NuxtLink :to="`${countryRoute.path}/${route.params.country}`">
							{{ startCase(route.params.country) }}
						</NuxtLink>
					</li>

					<li>
						<NuxtLink
							:to="`${countryRoute.path}/${route.params.country}${cityRoute.path}`"
						>
							{{ cityRoute.label }}
						</NuxtLink>
					</li>
				</ul>
			</div>

			<div
				id="search-form"
				class="flex flex-col lg:flex-row gap-4 items-end w-full mb-8"
			>
				<SearchInput
					id="business-name"
					v-model="queryBusinessName"
					placeholder="Enter a business name"
				/>

				<button
					type="button"
					class="btn w-full lg:w-fit btn-lg btn-neutral"
					@click="onSearch"
				>
					Search
				</button>
			</div>

			<PlaceList
				v-if="placeData"
				key-id="latest"
				class="mb-8"
				:places="placeData"
				label="Coffee Shops"
			/>
		</div>
	</div>
</template>
