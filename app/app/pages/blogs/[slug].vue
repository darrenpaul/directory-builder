<script setup lang="ts">
import type { Blog } from '~~/types/blog'
import { blogsApiRoute } from '~~/constants/routes-api'

const route = useRoute()

const { data, error } = await useFetch<Blog>(
	`${blogsApiRoute.path}/${route.params.slug}`,
	{ method: 'GET' },
)

if (error.value) {
	throw createError({
		statusCode: 500,
		statusMessage: error.value?.message,
	})
}

if (!data.value) {
	throw createError({
		statusCode: 404,
		statusMessage: 'Not Found',
	})
}
</script>

<template>
	<div class="mx-auto max-w-[80ch]">
		<h1 class="text-3xl font-bold">
			{{ data!.title }}
		</h1>

		<div class="tiptap" v-html="data!.content" />
	</div>
</template>

<style scoped></style>
