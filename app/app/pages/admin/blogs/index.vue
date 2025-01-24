<script setup lang="ts">
import type { Blog } from '~~/types/blog'
import { adminBlogsApiRoute } from '~~/constants/routes-api'
import { adminBlogsRoute } from '~/constants/routes'

definePageMeta({
	layout: 'account-layout',
})

const { data } = await useFetch<Blog[]>(adminBlogsApiRoute.path, {
	method: 'GET',
})
</script>

<template>
	<div class="w-full mx-auto flex flex-col gap-16 px-4">
		<p>Blogs</p>

		<AdminBlogCreate />

		<NuxtLink
			v-for="blog in data"
			:key="blog.id"
			:to="`${adminBlogsRoute.path}/${blog.slug}`"
		>
			{{ blog.title }}
		</NuxtLink>
	</div>
</template>
