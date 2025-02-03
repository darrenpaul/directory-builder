<script setup lang="ts">
import type { Place } from '~~/types/place'
import NoEntriesFoundForm from '~/components/no-entries-found-form.vue'
import PlaceListItem from '~/components/place-list-item.vue'

const props = defineProps({
	keyId: { type: String, required: true },
	places: { type: Array as PropType<Place[]>, required: true },
	label: { type: String, required: false },
})

const route = useRoute()
const { trackEvent } = useAnalytics()

const limit = computed(() => Number.parseInt(route.query.limit as string) || 5)
</script>

<template>
	<div>
		<h3 v-if="props.label" class="text-3xl font-bold mb-3">
			{{ props.label }}
		</h3>
		<div class="border-b border-neutral-200 pb-3 mb-6 flex flex-col gap-3">
			<div
				v-if="props.places.length > 0"
				class="grid grid-cols-1 xl:grid-cols-2 gap-6"
			>
				<PlaceListItem
					v-for="(place, index) in props.places"
					:key="`${props.keyId}-${place.id}`"
					:key-id="keyId"
					:place="place"
					:index="index"
				/>
			</div>
			<NoEntriesFoundForm v-else />

			<NuxtLink
				v-if="props.places.length > limit"
				class="btn btn-block btn-neutral btn-outline"
				:to="{ query: { limit: limit + 10 } }"
				@click="() => trackEvent('view-featured-list')"
			>
				Load More
			</NuxtLink>
		</div>
	</div>
</template>
