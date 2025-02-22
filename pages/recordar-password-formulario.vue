<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <!-- Tarjeta con ancho fijo de 300px, fondo blanco, sombra y bordes redondeados -->
    <div class="bg-white shadow rounded p-6 mx-auto" style="width: 300px;">
      <!-- Título de la tarjeta -->
      <h2 class="text-2xl font-bold text-center mb-4">Modificar password</h2>

      <!-- Contenedor con separación vertical para los campos -->
      <div class="space-y-4">
        <!-- Campo Email -->
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
            <!-- Ícono de email (ejemplo de SVG para mdi-email) -->
            <svg
                class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path d="M12,12c2.21,0,4-1.79,4-4s-1.79-4-4-4-4,1.79-4,4S9.79,12,12,12z M12,14c-2.67,0-8,1.34-8,4v2h16v-2 C20,15.34,14.67,14,12,14z"/>
            </svg>
          </div>
        </div>

        <!-- Campo Password -->
        <div>
          <label for="password" class="block text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input
                id="password"
                type="password"
                v-model="forgotData.password"
                placeholder="Ingresa tu password"
                class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
            />
            <!-- Ícono de candado (ejemplo de SVG para mdi-lock) -->
            <svg
                class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path d="M17,8h-1V6c0-2.757-2.243-5-5-5S6,3.243,6,6v2H5C3.897,8,3,8.897,3,10v10c0,1.103,0.897,2,2,2h12 c1.103,0,2-0.897,2-2V10C19,8.897,18.103,8,17,8z M8,6c0-1.654,1.346-3,3-3s3,1.346,3,3v2H8V6z"/>
            </svg>
          </div>
        </div>

        <!-- Campo Confirmación Password -->
        <div>
          <label for="password_confirmation" class="block text-gray-700 mb-1">Confirmación password</label>
          <div class="relative">
            <input
                id="password_confirmation"
                type="password"
                v-model="forgotData.password_confirmation"
                placeholder="Confirma tu password"
                class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
            />
            <!-- Ícono de candado (reutilizando el SVG anterior) -->
            <svg
                class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path d="M17,8h-1V6c0-2.757-2.243-5-5-5S6,3.243,6,6v2H5C3.897,8,3,8.897,3,10v10c0,1.103,0.897,2,2,2h12 c1.103,0,2-0.897,2-2V10C19,8.897,18.103,8,17,8z M8,6c0-1.654,1.346-3,3-3s3,1.346,3,3v2H8V6z"/>
            </svg>
          </div>
        </div>

        <!-- Mensaje del servidor (si existe) -->
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
        password: '',
        password_confirmation: '',
        token: '',
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
      (this.$router.currentRoute.query.token) ? this.forgotData.token = this.$router.currentRoute.query.token : this.$router.push('/login')
      this.api('/api/forgotReset', {
        method: 'POST',
        body: this.forgotData
      })
        .then((response) => (response === 'Password reset') ? this.$router.push('/login') : this.serverMessage.setServerMessage(response))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
    },

    setUserCookies() {
      let token = Cookies.get('token')
      if (token) {
        this.user.setToken(token);

        //let user = document.cookie.match(new RegExp('(^| )user=([^;]+)'))
        let user = Cookies.get('user')

        if (user) {
          this.user.updateUser(user);
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
