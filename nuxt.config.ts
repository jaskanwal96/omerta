// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxtjs/tailwindcss'],
  // css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Special+Elite&display=swap' }
      ]
    }
  },
  experimental: {
    clientFallback: true // Helps with some SSR libraries
  },
  nitro: {
    storage: {
      db: {
        driver: process.env.NODE_ENV === 'development' ? 'fs' : 'redis',
        base: process.env.NODE_ENV === 'development' ? './server/data' : undefined,
        url: process.env.REDIS_URL,
        tls: true // Required for Vercel Redis usually
      }
    }
  }
})
