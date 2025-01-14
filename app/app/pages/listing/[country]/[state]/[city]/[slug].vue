<script setup lang="ts">
import type { Place } from '~~/types/place'
import { kebabCase } from 'lodash-es'
import IconFacebook from '~~/assets/icons/facebook.svg'
import IconInstagram from '~~/assets/icons/instagram.svg'
import IconPhone from '~~/assets/icons/phone.svg'
import IconRestaurantMenu from '~~/assets/icons/restaurant-menu.svg'
import IconVerified from '~~/assets/icons/verified.svg'
import IconWebsite from '~~/assets/icons/website.svg'
import IconX from '~~/assets/icons/x.svg'
import { placesApiRoute } from '~~/constants/routes-api'
import settings from '~~/constants/settings'
import { Status } from '~~/constants/status'
import OperatingPeriods from '~/components/operating-periods.vue'
import PageBreadcrumbs from '~/components/page-breadcrumbs.vue'
import { joinUrlDirectories } from '~/lib/url-directory-join'

const route = useRoute()

const fetchPromises = []

fetchPromises.push(
	useFetch<Place>(`${placesApiRoute.path}/${route.params.slug}`, {
		method: 'GET',
	}),
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
	title: placeData.value?.metaTitle || placeData.value?.name,
	ogTitle: placeData.value?.metaTitle || placeData.value?.name,
	description: placeData.value?.metaDescription || '',
	ogDescription: placeData.value?.metaDescription || '',
	ogImage: pageMetaData.value?.image || '',
	twitterCard: 'summary_large_image',
})

defineWebPage({
	'@type': 'WebPage',
	'image': pageMetaData.value?.image || '',
})

useSchemaOrg([
	{
		'@type': 'LocalBusiness',
		'name': placeData.value.name,
		'address': {
			'@type': 'PostalAddress',
			'addressRegion': placeData.value.address.state,
			'addressCountry': placeData.value.address.country,
		},
	},
])

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

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div
					class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 mb-4"
				>
					<span class="flex items-center justify-between gap-2">
						<IconVerified
							v-if="
								placeData.verified
									&& placeData.verified.status === Status.APPROVED
							"
							filled
							:font-controlled="false"
							class="w-8 h-8"
						/>

						<h1 class="text-2xl font-bold">
							{{ placeData.name }}
						</h1>
					</span>

					<ClaimBusiness
						v-if="placeData.verified === null"
						:id="placeData.id"
					/>
				</div>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div>
					<NuxtImg
						class="w-full h-96 mb-4 object-cover"
						:src="placeData.images[0].imageUrl"
						:alt="placeData.name"
					/>

					<div
						v-if="placeData.website"
						class="flex gap-2 items-center justify-center w-fit mb-4"
					>
						<IconWebsite :font-controlled="false" class="w-6 h-6" />

						<NuxtLink
							:to="placeData.website"
							target="_blank"
							:title="`Visit ${placeData.name} website`"
							class="link"
						>
							{{ placeData.website }}
						</NuxtLink>
					</div>

					<div
						v-if="placeData.menu"
						class="flex gap-2 items-center justify-center w-fit mb-4"
					>
						<IconRestaurantMenu
							:font-controlled="false"
							class="w-6 h-6"
							filled
						/>

						<NuxtLink
							:to="placeData.menu"
							target="_blank"
							:title="`Visit ${placeData.name} menu`"
							class="link"
						>
							Menu
						</NuxtLink>
					</div>

					<div
						v-if="placeData.phone"
						class="flex gap-2 items-center justify-center w-fit mb-4"
					>
						<IconPhone :font-controlled="false" class="w-6 h-6" />

						<NuxtLink
							:to="`tel:${placeData.phone}`"
							:title="`Call ${placeData.name}`"
							class="link"
						>
							{{ placeData.phone }}
						</NuxtLink>
					</div>

					<div
						v-if="placeData.facebook"
						class="flex gap-2 items-center justify-center w-fit mb-4"
					>
						<IconFacebook :font-controlled="false" class="w-6 h-6" />

						<NuxtLink
							:to="placeData.facebook"
							target="_blank"
							:title="`Visit ${placeData.name} facebook`"
							class="link"
						>
							{{ placeData.facebook }}
						</NuxtLink>
					</div>

					<div
						v-if="placeData.instagram"
						class="flex gap-2 items-center justify-center w-fit mb-4"
					>
						<IconInstagram :font-controlled="false" class="w-6 h-6" />

						<NuxtLink
							:to="placeData.instagram"
							target="_blank"
							:title="`Visit ${placeData.name} instagram`"
							class="link"
						>
							{{ placeData.instagram }}
						</NuxtLink>
					</div>

					<div
						v-if="placeData.x"
						class="flex gap-2 items-center justify-center w-fit mb-4"
					>
						<IconX :font-controlled="false" class="w-6 h-6" />

						<NuxtLink
							:to="placeData.x"
							target="_blank"
							:title="`Visit ${placeData.name} x`"
							class="link"
						>
							{{ placeData.x }}
						</NuxtLink>
					</div>

					<div class="flex flex-wrap gap-2 mb-3">
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

					<p class="pb-8">
						{{ placeData.description }}
					</p>

					<OperatingPeriods
						v-if="placeData.operatingPeriods"
						:operating-periods="placeData.operatingPeriods"
					/>
				</div>

				<GoogleMap
					v-if="latitude && longitude"
					v-model:latitude="latitude"
					v-model:longitude="longitude"
					v-model:markers="markers"
					:map-options="{
						gestureHandling: 'none',
						zoom: 19,
						clickableIcons: false,
						streetViewControl: false,
					}"
				/>
			</div>
		</div>
	</div>
</template>
