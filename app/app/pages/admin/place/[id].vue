<script setup lang="ts">
import type { Place } from '~~/types/place'
import { adminPlaceApiRoute } from '~~/constants/routes-api'
import ZodSchemaBuilder from '~~/lib/zod-schema-builder'
import RichTextEditor from '~/components/rich-text-editor.vue'
import useUser from '~/composables/user'

const zodSchema = new ZodSchemaBuilder()
	.withName()
	.withUrl('website')
	.withUrl('facebook')
	.withUrl('instagram')
	.withUrl('twitter')
	.withUrl('menu')
	.withUrl('specials')
	.build()

const route = useRoute()
const { userAuthenticated, user } = await useUser()

userAuthenticated(user)

const { data: placeData, error: placeError } = await useFetch<Place>(
	`${adminPlaceApiRoute.path}/${route.params.id}`,
	{ method: 'GET' },
)

const state = reactive<{ [key: string]: any }>({
	name: placeData.value?.name || undefined,
	website: placeData.value?.website || undefined,
	facebook: placeData.value?.facebook || undefined,
	instagram: placeData.value?.instagram || undefined,
	twitter: placeData.value?.twitter || undefined,
	menu: placeData.value?.menu || undefined,
	specials: placeData.value?.specials || undefined,
	coordinates: placeData.value?.address.coordinates || undefined,
	streetAddress: placeData.value?.address.streetAddress || undefined,
	city: placeData.value?.address.city || undefined,
	state: placeData.value?.address.state || undefined,
	country: placeData.value?.address.country || undefined,
	postalCode: placeData.value?.address.postalCode || undefined,
})

const formElements = [
	{ id: 'name', label: 'Name', value: state.name },
	{ id: 'website', label: 'Website', value: state.website },
	{ id: 'facebook', label: 'Facebook', value: state.facebook },
	{ id: 'instagram', label: 'Instagram', value: state.instagram },
	{ id: 'twitter', label: 'Twitter', value: state.twitter },
	{ id: 'menu', label: 'Menu', value: state.menu },
	{ id: 'specials', label: 'Specials', value: state.specials },
	{ id: 'coordinates', label: 'Coordinates', value: state.coordinates },
	{ id: 'streetAddress', label: 'Street Address', value: state.streetAddress },
	{ id: 'city', label: 'City', value: state.city },
	{ id: 'state', label: 'State', value: state.state },
	{ id: 'country', label: 'Country', value: state.country },
	{ id: 'postalCode', label: 'Postal Code', value: state.postalCode },
]

const description = ref<string>(placeData.value?.description || '')

if (placeError.value) {
	throw createError({
		statusCode: 500,
		statusMessage: placeError.value?.message,
	})
}

async function onSavePlaceChanges() {
	const canSubmit = zodSchema.safeParse({
		name: state.name,
		website: state.website,
		facebook: state.facebook,
		instagram: state.instagram,
		twitter: state.twitter,
		menu: state.menu,
		specials: state.specials,
	})

	if (canSubmit.success) {
		await $fetch(`${adminPlaceApiRoute.path}/${route.params.id}`, {
			method: 'PATCH',
			body: {
				name: state.name,
				website: state.website,
				facebook: state.facebook,
				instagram: state.instagram,
				twitter: state.twitter,
				menu: state.menu,
				specials: state.specials,
				address: {
					coordinates: state.coordinates,
					streetAddress: state.streetAddress,
					city: state.city,
					state: state.state,
					country: state.country,
					postalCode: state.postalCode,
				},
			},
		})
	}
}
</script>

<template>
	<div class="flex flex-col gap-3 w-full max-w-screen-2xl mx-auto px-4 mb-8">
		Edit place information

		<label
			v-for="element in formElements"
			:key="element.id"
			class="form-control w-full"
		>
			<span class="label label-text">{{ element.label }}</span>
			<input
				:id="element.id"
				v-model.trim="state[element.id]"
				:name="element.id"
				type="text"
				placeholder="Enter the name of your place"
				class="input input-bordered border-2 w-full"
			>
		</label>

		<RichTextEditor
			v-model="description"
			label-title="Description"
			label-description="Add a description for your place"
		/>

		<button class="btn btn-neutral btn-block" @click="onSavePlaceChanges">
			Submit
		</button>
	</div>
</template>
