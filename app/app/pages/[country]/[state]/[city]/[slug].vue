<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import type { Place } from '~~/types/place'
import { kebabCase } from 'lodash-es'
import IconWebsite from '~~/assets/icons/website.svg'
import { pageMetaApiRoute, placeApiRoute } from '~~/constants/routes-api'
import settings from '~~/constants/settings'
import PageBreadcrumbs from '~/components/page-breadcrumbs.vue'
import UrlQueryBuilder from '~/lib/builders/url-query-builder'
import { joinUrlDirectories } from '~/lib/url-directory-join'

const route = useRoute()

const pageMetaUrlQueryBuilder = new UrlQueryBuilder(pageMetaApiRoute.path)

const fetchPromises = []

fetchPromises.push(
	useFetch<Place>(`${placeApiRoute.path}/${route.params.slug}`, {
		method: 'GET',
	}),
)
fetchPromises.push(
	useFetch<PageMeta>(
		pageMetaUrlQueryBuilder.withSlug({ slug: 'home' }).build(),
		{ method: 'GET' },
	),
)

const [{ data: placeData, error: placeError }, { data: pageMetaData }]
  = await Promise.all(fetchPromises)

if (placeError.value) {
	throw createError({
		statusCode: 500,
		statusMessage: placeError.value?.message,
	})
}
const placeCoordinates = placeData.value.address.coordinates.split(',')
const latitude = ref<number>(Number.parseFloat(placeCoordinates[0]))
const longitude = ref<number>(Number.parseFloat(placeCoordinates[1]))
const markers = ref<string[]>([
	[latitude.value.toString(), longitude.value.toString()].join(','),
])

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

const breadcrumbs = computed(() => {
	return [
		{
			id: kebabCase(placeData.value.address.country),
			url: joinUrlDirectories([placeData.value.address.country]),
			label: placeData.value.address.country,
		},
		{
			id: kebabCase(placeData.value.address.state),
			url: joinUrlDirectories([
				placeData.value.address.country,
				placeData.value.address.state,
			]),
			label: placeData.value.address.state,
		},
		{
			id: kebabCase(placeData.value.address.city),
			url: joinUrlDirectories([
				placeData.value.address.country,
				placeData.value.address.state,
				placeData.value.address.city,
			]),
			label: placeData.value.address.city,
		},
	]
})
</script>

<template>
	<div class="py-8">
		<div class="w-full max-w-screen-2xl mx-auto px-4">
			<PageBreadcrumbs :crumbs="breadcrumbs" />

			<div class="grid grid-cols-2 gap-6">
				<div>
					<p class="text-2xl font-bold mb-4">
						{{ placeData.name }}
					</p>

					<NuxtImg class="h-96 mb-4" :src="placeData.images[0].imageUrl" />

					<div class="flex gap-2 items-center justify-center w-fit mb-4">
						<IconWebsite :font-controlled="false" class="w-6 h-6" />

						<NuxtLink
							v-if="placeData.website"
							:to="placeData.website"
							target="_blank"
							:title="`Visit ${placeData.name} website`"
							class="link"
						>
							{{ placeData.website }}
						</NuxtLink>
					</div>

					<div class="flex flex-wrap gap-2">
						<template
							v-for="attribute in placeData.attributes"
							:key="attribute.id"
						>
							<div
								v-if="attribute.value"
								class="badge badge-primary badge-outline"
							>
								{{ attribute.label }}
							</div>
						</template>
					</div>
				</div>

				<GoogleMap
					v-if="latitude && longitude"
					v-model:latitude="latitude"
					v-model:longitude="longitude"
					v-model:markers="markers"
				/>
			</div>
		</div>
	</div>
</template>
