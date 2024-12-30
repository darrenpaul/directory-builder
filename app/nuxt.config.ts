// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxtjs/seo",
  ],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {},
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  supabase: {
    url: process.env.PUBLIC_SUPABASE_PROJECT_URL,
    key: process.env.PUBLIC_SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    redirectOptions: {
      login: "/sign-in",
      callback: "/confirm",
      include: ["/admin(/*)?"],
      cookieRedirect: false,
      exclude: [],
    },
  },
});