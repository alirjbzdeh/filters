// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: [
    '~/assets/css/main.scss',
    '~/assets/css/essential_styles.scss',
    '~/assets/css/transition.scss',
  ],
})
