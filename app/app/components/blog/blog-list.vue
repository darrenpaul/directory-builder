<script setup lang="ts">
import type { Blog } from '~~/types/blog'

const props = defineProps({
	blogs: { type: Array as PropType<Blog[]>, required: true },
})
</script>

<template>
	<div class="flex flex-col gap-3 max-w-[80ch] mx-auto">
		<h1 class="text-3xl font-bold mb-6">
			Latest Blogs
		</h1>

		<BlogListItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
	</div>
</template>
