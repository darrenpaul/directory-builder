<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import type { Place } from '~~/types/place'
import { pageMetaApiRoute, placesApiRoute } from '~~/constants/routes-api'
import PageLander from '~/components/page-lander.vue'
import UrlQueryBuilder from '~/lib/builders/url-query-builder'

defineOgImageComponent('NuxtSeo')

const {
	public: { googleAdsenseId, projectKey, siteUrl },
} = useRuntimeConfig()

const initialLimit = 10

const { t } = useI18n()
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
		.withCityName(paramsAndQueries)
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
		pageMetaUrlQueryBuilder.withSlug({ slug: `home-${projectKey}` }).build(),
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
			href: `${siteUrl}`,
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
		'name': `${t('schemaOrg.name')}`,
		'description': `${t('schemaOrg.name')}`,
	},
])
</script>

<template>
	<div class="mb-8 flex flex-col">
		<PageLander class="mb-8" :image="pageMetaData.image" />

		<div class="w-full max-w-screen-2xl mx-auto px-4">
			<LazyFilter />

			<div class="border-b border-neutral-200 pb-3 mb-6">
				<LazyPlaceList
					v-if="data.data"
					key-id="latest"
					class="mb-4"
					:places="data.data"
					:label="$t('home.latestPlace')"
				/>

				<button
					v-if="data.count > limit"
					class="btn btn-block btn-neutral btn-outline"
					@click="onLoadMore"
				>
					Load More
				</button>
			</div>

			<div class="block max-h-96 mb-8">
				<LazyScriptGoogleAdsense
					:data-ad-client="googleAdsenseId"
					data-ad-slot="8638864193"
				/>
			</div>

			<div>
				<p class="text-2xl mb-3">
					{{ $t("home.whyChoose.title") }}
				</p>
				<ul class="list-disc list-inside text-left">
					<li>{{ $t("home.whyChoose.point1") }}</li>
					<li>{{ $t("home.whyChoose.point2") }}</li>
					<li>{{ $t("home.whyChoose.point3") }}</li>
					<li>{{ $t("home.whyChoose.point4") }}</li>
					<li>{{ $t("home.whyChoose.point5") }}</li>
				</ul>

				<p>
					{{ $t("home.whyChoose.description") }}
				</p>
			</div>
		</div>
	</div>
</template>
