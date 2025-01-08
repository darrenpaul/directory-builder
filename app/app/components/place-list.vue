<script setup lang="ts">
import type { Place } from '~~/types/place'
import NoEntriesFoundForm from '~/components/no-entries-found-form.vue'
import PlaceListItem from '~/components/place-list-item.vue'

const props = defineProps({
	keyId: { type: String, required: true },
	places: { type: Array as PropType<Place[]>, required: true },
	label: { type: String, required: false },
})
</script>

<template>
	<div class="border-b border-neutral-200 pb-6">
		<h3 v-if="props.label" class="text-3xl font-bold mb-3">
			{{ props.label }}
		</h3>

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
	</div>
</template>
