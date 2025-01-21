<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import { pageMetaApiRoute } from '~~/constants/routes-api'
import ContactForm from '~/components/contact-form.vue'
import UrlQueryBuilder from '~/lib/builders/url-query-builder'

defineOgImageComponent('NuxtSeo')

const {
	public: { siteUrl },
} = useRuntimeConfig()

const pageMetaUrlQueryBuilder = new UrlQueryBuilder(pageMetaApiRoute.path)
const route = useRoute()

const { data: pageMetaData } = await useFetch<PageMeta>(
	pageMetaUrlQueryBuilder.withSlug({ slug: 'contact' }).build(),
	{ method: 'GET' },
)

useHead({
	link: [
		{
			hid: 'canonical',
			rel: 'canonical',
			href: `${siteUrl}${route.path}`,
		},
	],
})

useSeoMeta({
	title: pageMetaData.value?.title || 'Nearby Nearby',
	ogTitle: pageMetaData.value?.title || 'Nearby Nearby',
	description: pageMetaData.value?.description || 'Nearby Nearby',
	ogDescription: pageMetaData.value?.description || 'Nearby Nearby',
	twitterCard: 'summary_large_image',
})

defineWebPage({
	'@type': 'ContactPage',
	'image': pageMetaData.value?.image || '',
})
</script>

<template>
	<div class="p-3 lg:p-6 mx-auto max-w-[80ch] flex flex-col gap-8">
		<div class="flex flex-col gap-3">
			<h2 class="text-3xl font-bold">
				{{ $t("contact.title") }}
			</h2>

			<h3 class="text-xl font-bold">
				{{ $t("contact.getInTouch") }}
			</h3>

			<p>
				{{ $t("contact.description") }}
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<p class="text-xl">
				{{ $t("contact.howCanWeHelp") }}
			</p>

			<ul class="list-disc list-inside text-left">
				<li class="mb-3">
					{{ $t("contact.point1") }}
				</li>
				<li class="mb-3">
					{{ $t("contact.point2") }}
				</li>
				<li class="mb-3">
					{{ $t("contact.point3") }}
				</li>
				<li class="mb-3">
					{{ $t("contact.point4") }}
				</li>
			</ul>
		</div>

		<ContactForm />
	</div>
</template>
