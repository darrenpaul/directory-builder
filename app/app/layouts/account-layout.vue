<script setup lang="ts">
import {
	Toaster,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'
import NavigationAccount from '~/components/navigation-account.vue'

const { notification } = useToaster()
</script>

<template>
	<div class="flex min-h-screen">
		<Toaster :notification="notification" />

		<NavigationAccount />

		<slot />
	</div>
</template>
