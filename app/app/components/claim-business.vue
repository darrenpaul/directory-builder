<script setup lang="ts">
import { StripePriceId } from '~~/constants/stripe-price-id'
import { stripeSubscriptionsApiRoute } from '~~/modules/stripe/runtime/constants/routes-api'
import useUser from '~/composables/user'
import { termsAndConditionsRoute } from '~/constants/routes'

const props = defineProps({
	id: { type: String, required: true },
})

const user = useSupabaseUser()

const { userAuthenticated } = await useUser()

const modal = ref<HTMLDialogElement>()
const loading = ref(false)

function preventEscClose(event: Event) {
	if (event.key === 'Escape' && modal.value?.open) {
		event.preventDefault()
	}
}

onMounted(() => {
	window.addEventListener('keydown', preventEscClose)
})

onUnmounted(() => {
	window.removeEventListener('keydown', preventEscClose)
})

function openModal() {
	if (modal.value) {
		modal.value.showModal()
	}
}

function closeModal() {
	if (modal.value) {
		modal.value.close()
	}
}

async function makePayment() {
	userAuthenticated(user.value)

	const data = await $fetch<{ redirectUri: string }>(
		stripeSubscriptionsApiRoute.path,
		{
			method: 'POST',
			body: {
				priceId: StripePriceId.SUBSCRIPTION_PRICE_ID,
				placeId: props.id,
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
	<div>
		<button class="btn btn-neutral animate-bounce" @click="openModal">
			Claim Listing
		</button>

		<dialog id="product-variant-modal" ref="modal" class="modal">
			<div class="modal-box">
				<p class="text-2xl font-bold">
					Claim Your Listing
				</p>

				<p class="text-lg mb-3">
					Get verified for only
					<span class="text-lg font-bold">R99 per month</span>!
				</p>

				<p class="text-xl font-semibold">
					Benefits of getting verified
				</p>

				<ul class="list-disc list-inside text-left mb-3">
					<li>{{ $t("claimBusiness.point1") }}</li>
					<li>{{ $t("claimBusiness.point2") }}</li>
					<li>{{ $t("claimBusiness.point3") }}</li>
					<li>{{ $t("claimBusiness.point4") }}</li>
				</ul>

				<p class="mb-3">
					{{ $t("claimBusiness.readyToClaim") }}
				</p>

				<p>
					Click below to claim your page and start updating your information
					today.
				</p>

				<p class="mb-3">
					By claiming your page, you agree to the
					<NuxtLink
						target="_blank"
						class="link"
						:to="termsAndConditionsRoute.path"
					>
						Terms and Conditions
					</NuxtLink>.
				</p>

				<div class="modal-action">
					<div class="grid grid-cols-2 w-full gap-3">
						<button :disabled="loading" class="btn" @click="closeModal">
							Cancel
						</button>

						<button class="btn btn-neutral" @click="makePayment">
							Claim Listing
						</button>
					</div>
				</div>
			</div>
		</dialog>
	</div>
</template>
