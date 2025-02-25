<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <!-- Tarjeta contenedora con ancho fijo de 300px, fondo blanco, sombra y bordes redondeados -->
    <div class="bg-white shadow rounded p-6 mx-auto" style="width: 300px;">
      <!-- Título de la tarjeta -->
      <h2 class="text-2xl font-bold text-center mb-4">Recordar password</h2>

      <!-- Contenedor de elementos con espaciado vertical -->
      <div class="space-y-4">
        <!-- Campo para Email -->
        <div class="mt-5">
          <label for="email" class="block text-gray-700 mb-1">Email</label>
          <div class="relative">
            <input
                id="email"
                type="text"
                v-model="forgotData.email"
                placeholder="Ingresa tu email"
                class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
            />
            <!-- Ícono de email (ejemplo con SVG similar a mdi-email) -->
            <svg
                class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path d="M12,12c2.21,0,4-1.79,4-4s-1.79-4-4-4-4,1.79-4,4S9.79,12,12,12z M12,14c-2.67,0-8,1.34-8,4v2h16v-2 C20,15.34,14.67,14,12,14z" />
            </svg>
          </div>
        </div>

        <!-- Mensaje del servidor (se muestra si existe) -->
        <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" class="text-red-500"></div>

        <!-- Botón "Enviar" -->
        <div>
          <button
              @click="forgot"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded focus:outline-none"
          >
            Enviar
          </button>
        </div>

        <!-- Botón "Volver" (navegación a /login) -->
        <div class="my-5">
          <nuxt-link
              to="/login"
              class="block bg-green-500 hover:bg-green-600 text-white py-2 rounded text-center"
          >
            Volver
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      forgotData: {
        email: '',
      },
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Recordar password - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Recordar password en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    forgot(){
      this.api('/api/forgotSendResetLinkEmail', {
        method: 'POST',
        body: this.forgotData
      })
        .then((response) => (response === 'Reset link sent') ? this.$router.push('/recordar-password-fin') : this.serverMessage.setServerMessage(response))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
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
