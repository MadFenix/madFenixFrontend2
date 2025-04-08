// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  mode: 'universal',
  /*
  ** Headers of the page
  */
  app: {
    head: {
      title: 'Mad Fénix',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Estudio de videojuegos indie Mad Fénix.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: true },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Poppins&family=Ubuntu:wght@300;400&display=swap' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: '/css/main.css' },
      ],
      script: [
        { type: 'application/javascript', src: '/js/flowbite.js' }
      ]
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-gtag', 'nuxt-meta-pixel'],
  gtag: {
    id: 'G-8RYGGHXWFG'
  },
  runtimeConfig: {
    public: {
      metapixel: {
        default: { id: '9303409733121965', pageView: '/**' },
      }
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})