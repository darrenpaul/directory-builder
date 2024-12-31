<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import Navigation from '~/components/navigation'

useGeolocation()
</script>

<template>
	<div>
		<Navigation />

		<div class="w-full max-w-screen-2xl mx-auto">
			<slot />
		</div>
	</div>
</template>
