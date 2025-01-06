<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import type { Place } from '~~/types/place'
import { startCase } from 'lodash-es'
import { pageMetaApiRoute, placeApiRoute } from '~~/constants/routes-api'
import settings from '~~/constants/settings'
import {
	cityRoute,
	countryRoute,
	homeRoute,
	stateRoute,
} from '~/constants/routes'
import UrlQueryBuilder from '~/lib/builders/url-query-builder'

const route = useRoute()

const pageMetaUrlQueryBuilder = new UrlQueryBuilder(pageMetaApiRoute.path)

const [{ data: placeData, error: placeError }, { data: pageMetaData }]
  = await Promise.all([
  	useFetch<Place>(`${placeApiRoute.path}/${route.params.slug}`, { method: 'GET' }),
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
						<p :to="countryRoute.path">
							{{ countryRoute.label }}
						</p>
					</li>

					<li>
						<NuxtLink :to="`${countryRoute.path}/${route.params.country}`">
							{{ startCase(route.params.country) }}
						</NuxtLink>
					</li>

					<li>
						<p
							:to="`${countryRoute.path}/${route.params.country}${stateRoute.path}`"
						>
							{{ stateRoute.label }}
						</p>
					</li>

					<li>
						<NuxtLink
							:to="`${countryRoute.path}/${route.params.country}${stateRoute.path}/${route.params.state}`"
						>
							{{ startCase(route.params.state) }}
						</NuxtLink>
					</li>

					<li>
						<p
							:to="`${countryRoute.path}/${route.params.country}${stateRoute.path}/${route.params.state}${cityRoute.path}`"
						>
							{{ cityRoute.label }}
						</p>
					</li>

					<li>
						<NuxtLink
							:to="`${countryRoute.path}/${route.params.country}${stateRoute.path}/${route.params.state}${cityRoute.path}/${route.params.city}`"
						>
							{{ startCase(route.params.city) }}
						</NuxtLink>
					</li>
				</ul>
			</div>

			<p class="text-2xl font-bold">
				{{ placeData.name }}
			</p>
		</div>
	</div>
</template>
