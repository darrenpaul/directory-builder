<script setup lang="ts">
import { stripeSubscriptionsApiRoute } from '~~/modules/stripe/runtime/constants/routes-api'

definePageMeta({
	layout: 'stripe',
})
// import { COVER_LETTER_ROUTE } from '~/components/navigation/routes'

const route = useRoute()
const router = useRouter()

onMounted(() => {
	updatePaymentStatus()
})

async function updatePaymentStatus() {
	const stripeSessionId = route.query.session_id as string
	router.replace({ query: undefined })

	await $fetch(stripeSubscriptionsApiRoute.path, {
		method: 'PATCH',
		body: {
			stripeSessionId,
		},
	})

	router.replace('/')
}
</script>

<template>
	<div class="h-screen flex flex-col items-center justify-center gap-4">
		<div class="flex flex-col gap-2">
			<h4>Processing payment</h4>
			<p>Please don't close this page</p>
			<p>You will be automatically redirected when processing is completed</p>
		</div>
	</div>
</template>
