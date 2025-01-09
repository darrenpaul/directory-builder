<script setup lang="ts">
const props = defineProps({
	id: { type: String, required: true },
})

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
</script>

<template>
	<div>
		<button class="btn btn-neutral" @click="openModal">
			Claim Business
		</button>

		<dialog id="product-variant-modal" ref="modal" class="modal">
			<div class="modal-box">
				<p class="text-2xl font-bold">
					Claim Your Business
				</p>
				<p>
					Get verified and take control of your coffee shop listing! For
					<span class="text-lg font-bold">R99 per month</span>, you'll receive:
				</p>
				<p>Ready to manage your coffee shop's presence on Nearby Coffee?</p>
				<p>
					Click below to claim your page and start updating your information
					today.
				</p>

				<div class="modal-action">
					<div class="grid grid-cols-2 w-full gap-3">
						<button :disabled="loading" class="btn" @click="closeModal">
							Cancel
						</button>

						<NuxtLink :to="`/admin/claim/${props.id}`" class="btn btn-neutral">
							I am Ready to Claim
						</NuxtLink>
					</div>
				</div>
			</div>
		</dialog>
	</div>
</template>
