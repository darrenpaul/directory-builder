<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import { pageMetaApiRoute } from '~~/constants/routes-api'
import settings from '~~/constants/settings'
import { contactRoute } from '~/constants/routes'
import UrlQueryBuilder from '~/lib/builders/url-query-builder'

defineOgImageComponent('NuxtSeo')

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
			href: `${settings.siteUrl}${route.path}`,
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
		<div class="max-w-4xl mx-auto px-4 py-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-8">
				Terms and Conditions
			</h1>

			<div class="space-y-6 text-gray-700">
				<section>
					<h2 class="text-xl font-semibold text-gray-800 mb-3">
						1. Introduction
					</h2>
					<p class="mb-4">
						Welcome to Nearby Coffee. By accessing and using this website, you
						agree to be bound by these Terms and Conditions. If you disagree
						with any part of these terms, please do not use our website.
					</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-gray-800 mb-3">
						2. Definitions
					</h2>
					<p class="mb-4">
						"Website" refers to Nearby Coffee
					</p>
					<p class="mb-4">
						"User," "You," and "Your" refers to you, the person accessing this
						website
					</p>
					<p class="mb-4">
						"Company," "We," "Our," and "Us" refers to Nearby Coffee
					</p>
					<p class="mb-4">
						"Listing" refers to any coffee shop information posted on our
						directory
					</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-gray-800 mb-3">
						3. Use License
					</h2>
					<p class="mb-4">
						Permission is granted to temporarily access the materials
						(information or software) on Nearby Coffee's website for personal,
						non-commercial viewing only. This is the grant of a license, not a
						transfer of title, and under this license you may not:
					</p>
					<ul class="list-disc list-inside pl-6 mb-4">
						<li class="mb-2">
							Modify or copy the materials
						</li>
						<li class="mb-2">
							Use the materials for any commercial purpose
						</li>
						<li class="mb-2">
							Attempt to reverse engineer any software contained on the website
						</li>
						<li class="mb-2">
							Remove any copyright or proprietary notations from the materials
						</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-gray-800 mb-3">
						4. Listing Accuracy
					</h2>
					<p class="mb-4">
						While we strive to ensure all information in our directory is
						accurate and up-to-date, we cannot guarantee complete accuracy.
						Coffee shop owners are responsible for maintaining their listing
						information. Users should verify critical information directly with
						the coffee shops.
					</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-gray-800 mb-3">
						5. User Reviews and Content
					</h2>
					<p class="mb-4">
						By posting reviews or content on our website, you grant us a
						non-exclusive, worldwide, perpetual, irrevocable, royalty-free right
						to use, reproduce, modify, adapt, publish, translate, create
						derivative works from, distribute, and display such content.
					</p>
					<p class="mb-4">
						You agree that content you post will not:
					</p>
					<ul class="list-disc list-inside pl-6 mb-4">
						<li class="mb-2">
							Be false, inaccurate, or misleading
						</li>
						<li class="mb-2">
							Infringe on any third party's intellectual property rights
						</li>
						<li class="mb-2">
							Contain defamatory, offensive, or illegal material
						</li>
						<li class="mb-2">
							Include spam or commercial solicitation
						</li>
					</ul>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-gray-800 mb-3">
						6. Disclaimer
					</h2>
					<p class="mb-4">
						The materials on Nearby Coffee's website are provided on an 'as is'
						basis. Nearby Coffee makes no warranties, expressed or implied, and
						hereby disclaims and negates all other warranties including, without
						limitation, implied warranties or conditions of merchantability,
						fitness for a particular purpose, or non-infringement of
						intellectual property or other violation of rights.
					</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-gray-800 mb-3">
						7. Limitations
					</h2>
					<p class="mb-4">
						In no event shall Nearby Coffee or its suppliers be liable for any
						damages (including, without limitation, damages for loss of data or
						profit, or due to business interruption) arising out of the use or
						inability to use the materials on the website.
					</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-gray-800 mb-3">
						8. Privacy Policy
					</h2>
					<p class="mb-4">
						Your use of this website is also governed by our Privacy Policy,
						which is incorporated into these Terms and Conditions by reference.
					</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-gray-800 mb-3">
						9. Subscriptions and Payments

						<p class="mb-4">
							By subscribing to Nearby Coffee's services, you agree to the
							following terms:
						</p>

						<ul class="list-disc list-inside pl-6 mb-4">
							<li class="mb-2">
								Subscription fees are charged in advance on a recurring basis
							</li>
							<li class="mb-2">
								Due to the digital nature of our services, we do not offer
								refunds on subscription payments
							</li>
							<li class="mb-2">
								You may cancel your subscription at any time, but you will
								continue to have access until the end of your current billing
								period
							</li>
							<li class="mb-2">
								Prices are subject to change with notice provided to subscribers
							</li>
							<li class="mb-2">
								It is your responsibility to maintain accurate and up-to-date
								payment information
							</li>
						</ul>
					</h2>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-gray-800 mb-3">
						10. Governing Law
					</h2>
					<p class="mb-4">
						These terms and conditions are governed by and construed in
						accordance with the laws of South Africa. Any disputes arising from
						these terms shall be subject to the exclusive jurisdiction of the
						South African courts.
					</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-gray-800 mb-3">
						11. Changes to Terms
					</h2>
					<p class="mb-4">
						We reserve the right to modify these terms and conditions at any
						time. We will notify users of any material changes by posting the
						new Terms and Conditions on this page.
					</p>
				</section>

				<section>
					<h2 class="text-xl font-semibold text-gray-800 mb-3">
						12. Contact Information
					</h2>
					<p class="mb-4">
						If you have any questions about these Terms and Conditions, please
						contact us at
						<NuxtLink class="link" :to="contactRoute.path">
							https://www.nearbycoffee.info/contact
						</NuxtLink>.
					</p>
				</section>

				<section class="mt-8">
					<p class="text-sm text-gray-600">
						Last updated: January 13, 2025
					</p>
				</section>
			</div>
		</div>
	</div>
</template>
