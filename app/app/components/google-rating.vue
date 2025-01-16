<script setup lang="ts">
import IconGoogle from '~~/assets/icons/google.svg'
import IconStar from '~~/assets/icons/star.svg'
import generateNumberArray from '~~/lib/generate-number-array'

const props = defineProps({
	id: { type: String, required: true },
	score: { type: Number, required: true },
	count: { type: Number, required: true },
})

const ratings = generateNumberArray({ start: 1, end: 5 })
const scoreRounded = computed(() => Math.floor(props.score))
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

		<div class="flex items-start w-fit justify-center gap-2">
			<p>{{ props.count }} reviews</p>
			<IconGoogle filled :font-controlled="false" class="w-5 h-5" />
		</div>
	</div>
</template>
