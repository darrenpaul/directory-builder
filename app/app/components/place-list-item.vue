<script setup lang="ts">
import type { Place } from '~~/types/place'
import IconNoImage from '~~/assets/icons/no-image.svg'
import StarRating from '~/components/star-rating.vue'

const props = defineProps({
	keyId: { type: String, required: true },
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
		<figure class="w-48 lg:w-96 h-full flex-shrink-0">
			<NuxtImg
				v-if="firstImage"
				:src="firstImage.imageUrl"
				:alt="props.place.name"
				class="w-48 lg:w-96 h-full object-cover"
			/>
			<IconNoImage v-else filled :font-controlled="false" class="w-24 h-24" />
		</figure>

		<div class="card-body overflow-y-auto h-full no-scrollbar">
			<div class="h-fit flex flex-col gap-2">
				<div class="flex flex-col lg:flex-row gap-2">
					<h2 class="text-2xl font-bold w-full">
						{{ props.place.name }}
					</h2>

					<NuxtLink
						v-if="props.place.website"
						:to="props.place.website"
						class="btn btn-sm btn-outline btn-neutral w-fit"
						:title="props.place.name"
						target="_blank"
						:aria-label="`${props.place.name} website`"
					>
						View
					</NuxtLink>
				</div>

				<StarRating
					:id="`${props.keyId}-${props.place.id}`"
					:score="props.place.rating.score"
					:count="props.place.rating.count"
				/>

				<div class="flex flex-wrap gap-2">
					<template
						v-for="attribute in props.place.attributes"
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

			<p>{{ props.place.address.city }}, {{ props.place.address.country }}</p>
		</div>
	</div>
</template>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, newer Edge */
}
</style>
