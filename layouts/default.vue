<template>
  <div>
    <header id="container-header">
      <nav
          class="flex items-center px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex items-center justify-between w-full">
          <!-- Logo -->
          <div class="flex items-center">
            <!-- Large logo -->
            <nuxt-link to="/"
                       class="block flex space-x-2 items-center text-2xl font-black md:hidden lg:flex group font-ancient-god"
            >
              <img src="/img/logo-white.png" title="Mad Fénix" alt="Mad Fénix" class="w-12" />
              <span
                  class="text-white transition duration-200 ease-in-out"
              >Mad</span
              >
              <span
                  class="transition duration-200 ease-in-out text-white group-hover:text-madfenix-naranja"
              >Fénix</span
              >
            </nuxt-link>

            <!-- Small logo for mobile screens -->
            <a
                href="/"
                class="hidden text-3xl font-black md:block lg:hidden group"
            >
                <span
                    class="text-white transition duration-200 ease-in-out"
                >M</span
                ><span
                class="transition duration-200 ease-in-out text-white group-hover:text-madfenix-naranja"
            >F</span
            >
            </a>
          </div>

          <!-- Main menu for large screens -->
          <div
              class="hidden md:flex justify-between items-center md:space-x-0.5 lg:space-x-2 text-xl md:text-base font-medium text-white"
          >
            <nuxt-link to="/"
                       class="block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700"
            >
              Home
            </nuxt-link>

            <nuxt-link v-if="user.user" v-for="(item, key) in items" :key="key" :to="item.path"
                       class="block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700"
                       v-html="item.text"
            />

            <a v-if="user.user" @click="logout()"
               class="block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700"
            >
              Logout
            </a>
            <nuxt-link v-if="!user.user" to="/login"
                       class="block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700"
            >
              Login
            </nuxt-link>
            <nuxt-link v-if="!user.user" to="/registro"
                       class="block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700"
            >
              Registro
            </nuxt-link>
          </div>

          <!-- Mobile menu container -->
          <div class="block md:hidden">
            <!-- Hamburger menu button -->
            <!--
              Toggle classes based on menu state
            -->
            <!--<button
              class="relative z-50 w-6 h-5 transition duration-500 ease-in-out transform rotate-0 cursor-pointer group focus:outline-none"
              @click="open = !open"
            >
              <span
                class="absolute block h-1 transition-all duration-300 ease-in-out transform rotate-0 rounded-full opacity-100 bg-dark-300 group-hover:bg-white"
                :class="open ? 'top-2 left-1/2 w-0': 'w-full top-0 left-0'"
              ></span>
              <span
                class="absolute left-0 block w-full h-1 transition-all duration-300 ease-in-out transform rounded-full opacity-100 bg-dark-300 group-hover:bg-white top-2"
                :class="open ? 'rotate-45': 'rotate-0'"
              ></span>
              <span
                class="absolute left-0 block w-full h-1 transition-all duration-300 ease-in-out transform rounded-full opacity-100 bg-dark-300 group-hover:bg-white top-2"
                :class="open ? '-rotate-45': 'rotate-0'"
              ></span>
              <span
                class="absolute block h-1 transition-all duration-300 ease-in-out transform rotate-0 rounded-full opacity-100 bg-dark-300 group-hover:bg-white"
                :class="open ? 'top-2 left-1/2 w-0': 'w-full left-0 top-4'"
              ></span>
            </button>-->

            <!-- Mobile menu -->
            <!--
              Toggle classes based on menu state
            -->
            <!-- absolute top-0 left-0 z-40 w-screen h-screen  -->
            <!--
            @keydown.escape.window="open = false"
            @click.away="open = false"
            v-if="open"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 -translate-y-full"
            x-transition:enter-end="opacity-100 translate-y-0"
            x-transition:leave="transition ease-in duration-200"
            x-transition:leave-start="opacity-100 translate-y-0"
            x-transition:leave-end="opacity-0 -translate-y-full"
            -->
            <div
                class="fixed bottom-0 left-0 z-50 w-full flex items-center justify-center bg-gradient-to-tr"
            >
              <div
                  class="flex grid grid-cols-4 items-center w-full mx-auto text-xl"
              >
                <nuxt-link to="/"
                           class="block p-4 font-medium rounded-full text-white hover:text-white hover:bg-dark-700 sm:inline-block"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </nuxt-link>

                <nuxt-link :to="item.path" v-for="(item, key) in items" :key="key"
                           class="block border-l-2 border-dark-600 p-4 font-medium text-white hover:text-white hover:bg-dark-700 sm:inline-block"
                >
                  <svg v-if="item.text == 'Perfil'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <svg v-else-if="item.text == 'Temporada'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                  </svg>
                  <svg v-else-if="item.text == 'Tienda'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>
                </nuxt-link>
              </div>
            </div>
          </div>

        </div>
      </nav>
    </header>
    <slot />
    <footer class="px-4 py-12 md:py-16 bg-dark-900 sm:px-6 lg:px-8">
      <div class="grid gap-8 mx-auto lg:max-w-screen-xl sm:max-w-3xl md:grid-cols-3 md:gap-y-12 lg:grid-cols-4">
        <!-- Logo and copyright text -->
        <div class="flex flex-col lg:mx-auto">
          <div class="flex items-center">
            <a href="/" class="text-2xl font-black lg:block group font-ancient-god">
              <span class="text-white transition duration-200 ease-in-out">Mad</span>
              <span class="transition duration-200 ease-in-out text-white group-hover:text-madfenix-naranja">Fénix</span>
            </a>
          </div>
          <div class="mt-6 text-lg md:mt-8 text-white">
            © 2024 Mad Fénix.
            <br>
            Todos los derechos reservados.
          </div>
        </div>

        <!-- Contact information -->
        <div class="lg:mx-auto">
          <h6 class="text-xl font-semibold text-white">Ponte en contacto</h6>
          <p class="mt-2 text-lg text-white">
            C/ Sant Valentí 14 1er,
            <br>Sant Joan de Vilatorrada, Barcelona 08250
          </p>
          <p class="text-lg text-white">iam@valentigamez.com</p>
        </div>

        <!-- Site links -->
        <div class="lg:mx-auto">
          <h6 class="text-xl font-semibold text-white">Estudio</h6>
          <ul class="mt-2 space-y-1 text-lg">
            <li class="font-medium text-white hover:text-white">
              <nuxt-link to="/">
                Home
              </nuxt-link>
            </li>
            <li v-if="user.user" v-for="(item, key) in items" :key="key" class="font-medium text-white hover:text-white">
              <nuxt-link :to="item.path" v-html="item.text" />
            </li>
            <li v-if="user.user" class="font-medium text-white hover:text-white">
              <a @click="logout()" >
                Logout
              </a>
            </li>
            <li v-if="!user.user" class="font-medium text-white hover:text-white">
              <nuxt-link to="/login" >
                Login
              </nuxt-link>
            </li>
            <li v-if="!user.user" class="font-medium text-white hover:text-white">
              <nuxt-link to="/registro" >
                Registro
              </nuxt-link>
            </li>
            <li class="font-medium text-white hover:text-white">
              <nuxt-link to="/aviso-legal" >
                Aviso legal
              </nuxt-link>
            </li>
            <li class="font-medium text-white hover:text-white">
              <nuxt-link to="/condiciones" >
                Términos y condiciones
              </nuxt-link>
            </li>
            <li class="font-medium text-white hover:text-white">
              <nuxt-link to="/politica-de-cookies" >
                Política de cookies
              </nuxt-link>
            </li>
            <li class="font-medium text-white hover:text-white">
              <nuxt-link to="/politica-de-privacidad" >
                Política de privacidad
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Social links -->
        <div class="sm:col-span-3 lg:col-span-1 lg:mx-auto">
          <h6 class="text-xl font-semibold text-white">
            Síguenos
          </h6>
          <p class="mt-2 text-lg text-white">
            Renacer te vuelve más fuerte.
          </p>
          <div class="w-full mt-4 lg:mt-6">
            <!-- Social links container -->
            <div class="flex justify-start space-x-4">
              <!-- Instagram -->
              <a class="flex items-center justify-center w-12 h-12 transition duration-300 ease-in-out rounded-full bg-dark-700 hover:text-dark-900 hover:bg-white text-white" href="https://www.instagram.com/madfenixgames" target="_blank">
                <!-- TablerIcon name: brand-instagram -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <rect x="4" y="4" width="16" height="16" rx="4"></rect>
                  <circle cx="12" cy="12" r="3"></circle>
                  <line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
                </svg>
              </a>

              <!-- Facebook -->
              <!--<a class="flex items-center justify-center w-12 h-12 transition duration-300 ease-in-out rounded-full bg-dark-700 hover:text-dark-900 hover:bg-white text-white" href="#" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                </svg>
              </a>-->

              <!-- Twitter -->
              <a class="flex items-center justify-center w-12 h-12 transition duration-300 ease-in-out rounded-full bg-dark-700 hover:text-dark-900 hover:bg-white text-white" href="https://twitter.com/madfenixgames" target="_blank">
                <!-- TablerIcon name: brand-twitter -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <VueCookieComply
        :preferences="preferences"
        bannerTitle="Preferencias de cookies"
        bannerDescription="Utilizamos cookies y tecnologías similares para personalizar el contenido y ofrecer una mejor experiencia. Puede optar por personalizarlas haciendo clic en el botón de preferencias."
        preferencesBtnLabel="Preferencias"
        acceptAllBtnLabel="Aceptar"
        declineAllBtnLabel="Rechazar"
        savePreferencesBtnLabel="Guardar"
        modalTitle="Su configuración de cookies"
        @on-accept-all="onAccept"
        @on-decline-all="onDecline"
        @on-save-preferences="onSavePreferences"
    ></VueCookieComply>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage"
import VueCookieComply from '@ipaat/vue3-tailwind3-cookie-comply'
import { ref } from 'vue'
import Cookies from "js-cookie";

export default {
  components: {
    VueCookieComply
  },

  data(){
    return {
      mobileNavOpen: false,
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      items: [
        { icon: ['fas', 'user'], text: 'Perfil', path: '/perfil' },
        { icon: ['fas', 'user'], text: 'Temporada', path: '/temporada' },
        { icon: ['fas', 'user'], text: 'Tienda', path: '/tienda' },
      ],
      footerItems: [
        {
          href: 'https://twitter.com/madfenixgames',
          icon: ['fab', 'twitter'],
          title: 'Pperfil de Twitter',
        },
        {
          href: 'https://www.instagram.com/madfenixgames/',
          icon: ['fab', 'instagram'],
          title: 'Perfil de Instagram',
        },
      ],
      preferences: [
        {
          title: 'Token (necesario)',
          description: 'Esta cookie contiene el token de acceso a la API del proyecto. Con este token se autoriza el acceso a los recursos protegidos y se mantiene la sesión del usuario. Su validez y renovación dependen de la configuración del backend.',
          items: [
            {
              label: 'token',
              value: 'token',
              isRequired: true,
            },
          ],
        },
        {
          title: 'User (necesario)',
          description: 'Esta cookie almacena los datos del perfil del usuario, lo que permite personalizar tu experiencia en el sitio. Se actualiza cada vez que se modifican los datos del usuario.',
          items: [
            {
              label: 'user',
              value: 'user',
              isRequired: true,
            },
          ],
        },
      ],
      result: null
    }
  },

  mounted() {
    this.setUserCookies();
    this.result = ref('Esperando la interacción del usuario...');

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    afterLogout(){
      Cookies.remove('token')
      Cookies.remove('user')
      this.user.setToken('')
      this.user.setUserToNull()
      this.user.removeUser()
      setTimeout(() => this.$router.push({ path: '/login' }), 2000)
    },

    logout () {
      this.api('/api/logout', {
        method: 'POST'
      })
          .then(() => this.afterLogout())
          .catch(() => this.afterLogout())
    },

    setUserCookies() {
      this.user.token = localStorage.getItem('token');
      if (localStorage.getItem('user')) {
        this.user.user = JSON.parse(localStorage.getItem('user'));
      }
    },

    onDecline(accepted) {
      this.result.value = 'El usuario no aceptó cookies. 👎: ' + accepted.join(', ') + ' (requerido)'
    },

    onAccept(accepted) {
      this.result.value = 'El usuario aceptó todas las cookies. 👍: ' + accepted.join(', ')
    },

    _onSave(accepted) {
      this.result.value = 'El usuario aceptó las siguientes cookies 📋: ' + accepted.join(', ')
    },
  }
}
</script>
