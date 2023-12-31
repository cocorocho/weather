// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "vue-select/dist/vue-select.css",
    "@fortawesome/fontawesome-svg-core/styles.css"
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@nuxt/image",
    "@vueuse/nuxt",
    "nuxt-lodash"
  ],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL
    }
  },
  image: {
    dir: "public/images",
  },
  app: {
    layoutTransition: { mode: 'out-in' }
  }
})
