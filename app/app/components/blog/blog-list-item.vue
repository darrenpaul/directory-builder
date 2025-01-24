<script setup lang="ts">
import type { Blog } from '~~/types/blog'
import { blogsRoute } from '~/constants/routes'

const props = defineProps({
	blog: { type: Object as PropType<Blog>, required: true },
})
</script>

<template>
	<div class="card lg:card-side bg-base-100 shadow-md w-full h-fit lg:h-64">
		<figure class="w-full lg:w-64 h-full flex-shrink-0">
			<NuxtImg
				:src="props.blog.thumbnailUri"
				:alt="props.blog.title"
				loading="lazy"
				class="w-full lg:w-64 h-64 2lg:h-full object-cover"
			/>
		</figure>

		<div class="card-body overflow-y-auto h-full no-scrollbar">
			<div class="h-fit flex flex-col gap-2">
				<div class="flex flex-col lg:flex-row gap-2">
					<p class="text-2xl font-bold w-full">
						{{ props.blog.title }}
					</p>

					<NuxtLink
						:to="`${blogsRoute.path}/${props.blog.slug}`"
						class="btn btn-sm btn-outline btn-neutral w-full lg:w-fit"
						:title="props.blog.title"
						:aria-label="`${props.blog.title} blog`"
					>
						View
					</NuxtLink>
				</div>

				<p>{{ props.blog.description }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
