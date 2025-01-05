<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import type { Place } from '~~/types/place'
import { kebabCase } from 'lodash-es'
import { pageMetaApiRoute, placeApiRoute } from '~~/constants/routes-api'
import settings from '~~/constants/settings'
import { countryRoute } from '~/constants/routes'
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

const countryNames = computed(() => {
	const countries: string[] = []

	if (!placeData.value) {
		return []
	}

	placeData.value.forEach((place) => {
		if (!countries.includes(place.address.country)) {
			countries.push(place.address.country)
		}
	})

	return countries
})

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
		<div class="w-full min-h-screen max-w-screen-2xl mx-auto px-4">
			<div class="mb-8">
				<p class="text-2xl mb-3">
					Search By Country
				</p>
				<div class="grid grid-cols-3">
					<NuxtLink
						v-for="country in countryNames"
						:key="country"
						class="link"
						:to="`${countryRoute.path}/${kebabCase(country)}`"
					>
						{{ country }}
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>
