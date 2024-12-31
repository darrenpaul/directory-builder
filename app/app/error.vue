<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
	error: Object as () => NuxtError | null,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
	<div class="h-screen flex flex-col items-center justify-center p-3 lg:p-6">
		<div class="flex flex-col items-start w-full">
			<button class="btn btn-neutral" @click="handleError">
				Back Home
			</button>
		</div>

		{{ props.error?.message }}
	</div>
</template>
