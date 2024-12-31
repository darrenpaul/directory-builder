<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import {
	Toaster,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'
import Footer from '~/components/footer.vue'

import Navigation from '~/components/navigation/index.vue'

const { notification } = useToaster()

useGeolocation()
</script>

<template>
	<div>
		<Toaster :notification="notification" />

		<Navigation />

		<slot />

		<Footer />
	</div>
</template>
