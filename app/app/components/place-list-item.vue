<script setup lang="ts">
import type { Place } from '~~/types/place'
import IconNoImage from '~~/assets/icons/no-image.svg'
import StarRating from '~/components/star-rating.vue'

const props = defineProps({
	place: { type: Object as PropType<Place>, required: true },
})

const firstImage = computed(() => {
	if (props.place.images.length === 0)
		return null

	return props.place.images[0]
})
</script>

<template>
	<div class="card card-side bg-base-100 shadow-md w-full h-64">
		<figure class="w-96 h-full">
			<NuxtImg
				v-if="firstImage"
				:src="firstImage.imageUrl"
				:alt="props.place.name"
				class="w-96 object-cover"
			/>
			<IconNoImage v-else filled :font-controlled="false" class="w-24 h-24" />
		</figure>

		<div class="card-body w-full">
			<div class="h-full flex flex-col gap-2">
				<h2 class="card-title truncate">
					{{ props.place.name }}
				</h2>

				<StarRating
					:id="props.place.id"
					:score="props.place.rating.score"
					:count="props.place.rating.count"
				/>

				<div class="flex gap-2">
					<template v-for="attribute in props.place.attributes" :key="attribute.id">
						<div v-if="attribute.value" class="badge badge-primary badge-outline">
							{{ attribute.label }}
						</div>
					</template>
				</div>
			</div>

			<p>
				{{ props.place.address.city }}, {{ props.place.address.country }}
			</p>
		</div>
	</div>
</template>
