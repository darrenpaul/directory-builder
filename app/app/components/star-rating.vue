<script setup lang="ts">
import IconStar from '~~/assets/icons/star.svg'

const props = defineProps({
	id: { type: String, required: true },
	score: { type: Number, required: true },
	count: { type: Number, required: true },
})

const maxRating = 4
const ratings = generateNumberArray(0, maxRating)
const scoreRounded = computed(() => Math.floor(props.score))

function generateNumberArray(start: number, end: number): number[] {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
</script>

<template>
	<div class="flex flex-col gap-1">
		<div class="flex items-center justify-center">
			<IconStar
				v-for="rating in ratings"
				:key="`${props.id}-${rating}`"
				:class="rating < scoreRounded ? 'text-orange-400' : 'text-neutral-200'"
				:font-controlled="false"
				class="w-6 h-6"
			/>

			<p class="ml-3">
				({{ props.score }})
			</p>
		</div>

		<p>{{ props.count }} reviews</p>
	</div>
</template>
