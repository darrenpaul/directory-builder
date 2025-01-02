<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta';
import { pageMetaApiRoute } from '~~/constants/routes-api';
import settings from '~~/constants/settings';
import ContactForm from '~/components/contact-form.vue';
import UrlQueryBuilder from '~/lib/builders/url-query-builder';

const pageMetaUrlQueryBuilder = new UrlQueryBuilder(pageMetaApiRoute.path);
const route = useRoute();

const { data: pageMetaData } = await useFetch<PageMeta>(
  pageMetaUrlQueryBuilder.withSlug({ slug: 'contact' }).build(),
  { method: 'GET' },
);

useHead({
  link: [
    {
      hid: 'canonical',
      rel: 'canonical',
      href: `${settings.siteUrl}${route.path}`,
    },
  ],
});

useSeoMeta({
  title: pageMetaData.value?.title || 'Coffee Nearby',
  ogTitle: pageMetaData.value?.title || 'Coffee Nearby',
  description: pageMetaData.value?.description || 'Coffee Nearby',
  ogDescription: pageMetaData.value?.description || 'Coffee Nearby',
  ogImage: pageMetaData.value?.image || '',
  twitterCard: 'summary_large_image',
});

defineWebPage({
  '@type': 'ContactPage',
  image: pageMetaData.value?.image || '',
});
</script>

<template>
  <div class="p-3 lg:p-6 mx-auto max-w-[80ch] flex flex-col gap-8">
    <div class="flex flex-col gap-3">
      <h2 class="text-3xl font-bold">Contact NearbyCoffee.info</h2>

      <h3 class="text-xl font-bold">Get in Touch</h3>

      <p>
        Whether you're a coffee shop owner looking to list your business or a coffee enthusiast with
        feedback, we're here to help.
      </p>
    </div>

    <div class="flex flex-col gap-3">
      <p class="text-xl">How Can We Help You?</p>

      <ul class="list-disc list-inside text-left">
        <li class="mb-3">
          Add Your Coffee Shop Own or manage a coffee shop? Get listed on NearbyCoffee.info to reach
          thousands of coffee lovers in your area. Our directory helps local coffee shops connect
          with customers searching for their next favorite café.
        </li>
        <li class="mb-3">
          Update Business Information Need to update your coffee shop's details? Let us know about
          changes to your hours, location, amenities, or other information. We ensure our directory
          stays current for coffee lovers seeking the perfect spot.
        </li>
        <li class="mb-3">
          Report an Issue Found incorrect information? Help us maintain the quality of our coffee
          shop directory by reporting any inaccuracies.
        </li>
        <li class="mb-3">
          Partnership Opportunities Interested in collaborating? We work with coffee shops,
          roasters, and industry partners to create better experiences for coffee lovers.
        </li>
      </ul>
    </div>

    <ContactForm />
  </div>
</template>
