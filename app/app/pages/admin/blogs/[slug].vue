<script setup lang="ts">
import { adminBlogsApiRoute } from '~~/constants/routes-api'

definePageMeta({
	layout: 'account-layout',
})

const route = useRoute()

const { data } = await useFetch(
	`${adminBlogsApiRoute.path}/${route.params.slug}`,
	{ method: 'GET' },
)
</script>

<template>
	<div class="w-full mx-auto flex flex-col gap-16 px-4">
		<AdminBlogForm :data="data" />
	</div>
</template>
