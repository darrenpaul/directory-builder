<script setup lang="ts">
import type { Blog } from '~~/types/blog'
import { blogsApiRoute } from '~~/constants/routes-api'

defineOgImageComponent('NuxtSeo')

const { data } = await useFetch<{ data: Blog[], count: number }>(
	blogsApiRoute.path,
	{ method: 'GET' },
)
</script>

<template>
	<div class="mt-8">
		<BlogList v-if="data" class="mb-16" :blogs="data.data" />
	</div>
</template>
