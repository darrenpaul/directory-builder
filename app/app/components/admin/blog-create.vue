<script setup lang="ts">
import { kebabCase } from 'lodash-es'
import {
	adminBlogsApiRoute,
	adminSeoMetadataBlogsApiRoute,
} from '~~/constants/routes-api'
import { adminBlogsRoute } from '~/constants/routes'

const router = useRouter()

const modal = ref<HTMLDialogElement>()
const loading = ref(false)
const title = ref<string | undefined>()
const slug = ref<string | undefined>()

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

watch(
	() => title.value,
	() => {
		slug.value = kebabCase(title.value)
	},
)

function onSlugChanged() {
	slug.value = kebabCase(slug.value)
}

async function handleBlogCreate() {
	if (!title.value || !slug.value) {
		return
	}

	loading.value = true

	const { data } = await $fetch(adminBlogsApiRoute.path, {
		method: 'POST',
		body: {
			title: title.value.trim(),
			slug: slug.value.trim(),
		},
	})

	await $fetch(adminSeoMetadataBlogsApiRoute.path, {
		method: 'POST',
		body: {
			id: data.id,
		},
	})

	if (data) {
		router.push(`${adminBlogsRoute.path}/${data.slug}`)
	}

	loading.value = false
}
</script>

<template>
	<button class="btn btn-sm w-full btn-outline btn-neutral" @click="openModal">
		Create Blog
	</button>

	<dialog id="product-variant-modal" ref="modal" class="modal">
		<div class="modal-box">
			<p class="text-2xl font-bold">
				Create a new blog post
			</p>

			<div class="input-group">
				<label class="label" for="title">Title</label>

				<input
					id="title"
					v-model="title"
					name="title"
					type="text"
					placeholder="Enter your blog title"
					class="input input-bordered border-2 border-neutral w-full"
				>
			</div>

			<div class="input-group">
				<label class="label" for="slug">Slug</label>

				<input
					id="slug"
					v-model="slug"
					name="slug"
					type="text"
					placeholder="Enter your slug"
					class="input input-bordered border-2 border-neutral w-full"
					@change="onSlugChanged"
				>
			</div>

			<div class="modal-action">
				<div class="grid grid-cols-2 w-full gap-3">
					<button :disabled="loading" class="btn">
						Cancel
					</button>

					<button
						:disabled="loading"
						type="button"
						class="btn btn-neutral"
						@click="handleBlogCreate"
					>
						Create
					</button>
				</div>
			</div>
		</div>
	</dialog>
</template>
