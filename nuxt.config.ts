import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: false },
  modules: ['@primevue/nuxt-module', "@pinia/nuxt"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: "app-dark"
        }
      }
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_API_URL,
      API_KEY: process.env.NUXT_API_KEY,
    }
  },
  app: {
    head: {
      link: [{rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"}],
    },
    pageTransition: {
      name: "page",
      mode: "out-in"
    }
  },
  
  css: ["~/assets/stylus/inc/_responsive.styl","~/assets/css/global.css", "~/assets/stylus/theme/app.styl", 'primeicons/primeicons.css'],
  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ]
})