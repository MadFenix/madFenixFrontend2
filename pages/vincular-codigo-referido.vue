<template>
  <div class="min-h-screen bg-gray-100 p-4" v-if="user.user">
    <!-- Tarjeta: Vincular código de referido -->
    <div class="bg-white shadow rounded p-6 mx-auto mb-4" style="width: 300px;">
      <h2 class="text-xl font-bold text-center mb-4">Vincular código de referido</h2>
      <div class="space-y-5">
        <!-- Campo para Código de referido -->
        <div class="mt-5">
          <label for="referred_code" class="block text-gray-700 mb-1">
            Código de referido
          </label>
          <div class="relative">
            <input
                id="referred_code"
                type="text"
                v-model="referred.referred_code_from"
                placeholder="Ingresa el código"
                class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
            />
            <!-- Ícono de ticket (simulación de mdi-ticket) -->
            <svg
                class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path d="M22,12l-4-4V9H2v6h16v1L22,12z" />
            </svg>
          </div>
        </div>
        <!-- Mensaje del servidor (si existe) -->
        <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" class="text-red-500"></div>
        <!-- Botón para vincular -->
        <div>
          <button
              @click="linkReferred"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded focus:outline-none"
          >
            Vincular
          </button>
        </div>
        <!-- Botón para ir al perfil -->
        <div class="my-5">
          <nuxt-link
              to="/perfil"
              class="block bg-green-500 hover:bg-green-600 text-white py-2 rounded text-center"
          >
            Perfil
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- Fila informativa centrada -->
    <div class="flex items-center mt-5">
      <div class="flex-1"></div>
      <div class="w-1/2 text-center text-gray-700">
        Cuando vinculas tu código de refereido obtienes 5 oros. También apoyas al referido que vinculas.
      </div>
      <div class="flex-1"></div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";
import Cookies from "js-cookie";

export default {
  middleware: 'auth',

  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      referred: {
        referred_code_from: '',
      },
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Vincular código de referidos - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Vincular código de referidos en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    afterCreateReferred(response){
      this.$router.push('/perfil')
    },

    linkReferred(){
      this.api('/api/profile/setUserProfileReferredCodeFrom', {
        method: 'POST',
        body: this.referred
      })
        .then((response) => this.afterCreateReferred(response))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage(error))
    },

    setUserCookies() {
      let token = Cookies.get('token')
      if (token) {
        this.user.setToken(token);

        //let user = document.cookie.match(new RegExp('(^| )user=([^;]+)'))
        let user = Cookies.get('user')

        if (user) {
          this.user.updateUser(JSON.parse(user));
        } else {
          console.log('test')
          try {
            this.user.fetchUser();
          } catch (error) {
          }
        }
      }
    },
  }
}
</script>
