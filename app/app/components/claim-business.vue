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
		<button class="btn btn-neutral animate-bounce" @click="openModal">
			Claim Business
		</button>

		<dialog id="product-variant-modal" ref="modal" class="modal">
			<div class="modal-box">
				<p class="text-2xl font-bold">
					Claim Your Business
				</p>

				<p class="mb-3">
					Get verified and take control of your coffee shop listing!
				</p>

				<p class="text-lg mb-3">
					Get verified for only
					<span class="text-lg font-bold">R99 per month</span>!
				</p>

				<p class="text-xl font-semibold">
					Benefits of getting verified
				</p>

				<ul class="list-disc list-inside text-left mb-3">
					<li>Receive a verified badge on your listing.</li>
					<li>
						Verified listing will always appear before unverified listings.
					</li>
					<li>Manage your listing's presence on Nearby Coffee.</li>
					<li>
						Receive a monthly report on how many views your listing received.
					</li>
				</ul>

				<p class="mb-3">
					Ready to manage your coffee shop's presence on Nearby Coffee?
				</p>

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
							Claim Store
						</NuxtLink>
					</div>
				</div>
			</div>
		</dialog>
	</div>
</template>
