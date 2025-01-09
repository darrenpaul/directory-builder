<script setup lang="ts">
import { StripePriceId } from '~~/constants/stripe-price-id'
import { stripeSubscriptionsApiRoute } from '~~/modules/stripe/runtime/constants/routes-api'
import useUser from '~/composables/user'

const route = useRoute()

const { userAuthenticated, user } = await useUser()

userAuthenticated(user)

async function makePayment() {
	const data = await $fetch<{ redirectUri: string }>(
		stripeSubscriptionsApiRoute.path,
		{
			method: 'POST',
			body: {
				priceId: StripePriceId.SUBSCRIPTION_PRICE_ID,
				placeId: route.params.id,
			},
		},
	)

	const { redirectUri } = data

	if (redirectUri) {
		navigateTo(redirectUri, { replace: true, external: true })
	}
}
</script>

<template>
	<div class="mb-8">
		Business Claim Page

		<button class="btn btn-neutral" @click="makePayment">
			Make Payment
		</button>
	</div>
</template>
