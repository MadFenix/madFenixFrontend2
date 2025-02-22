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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: '/css/main.css' },
      ],
      script: [
        { type: 'application/javascript', src: '/js/flowbite.js' }
      ]
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  buildModules: [
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Orbitron: true,
      Poppins: true,
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})