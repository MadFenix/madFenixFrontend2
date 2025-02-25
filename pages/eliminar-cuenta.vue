<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100" v-if="user.user">
    <!-- Tarjeta con ancho fijo, fondo blanco, sombra y bordes redondeados -->
    <div class="bg-white shadow rounded p-6 mx-auto" style="width: 300px;">
      <!-- Título de la tarjeta -->
      <h2 class="text-xl font-bold text-center mb-4">Eliminar cuenta</h2>
      <!-- Contenedor de elementos con espaciado vertical -->
      <div class="space-y-4">
        <!-- Texto descriptivo -->
        <p class="mt-5 text-gray-700">
          Con esta acción eliminarás la cuenta de Mad Fénix junto a todos los datos introducidos en la aplicación 2 Elevado de la Play Store, App Store y Itch.io. El proceso puede tardar hasta 48 horas laborables.
        </p>
        <!-- Campo de entrada para Email -->
        <div class="mt-5">
          <label for="email" class="block text-gray-700 mb-1">Email</label>
          <div class="relative">
            <input
                id="email"
                type="text"
                v-model="deleteAccount.email"
                placeholder="Ingresa tu email"
                class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
            />
            <!-- Ícono de email (SVG de ejemplo) -->
            <svg
                class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path d="M20,4H4C2.897,4,2,4.897,2,6v12c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2V6C22,4.897,21.103,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"/>
            </svg>
          </div>
        </div>
        <!-- Campo de entrada para Password -->
        <div>
          <label for="password" class="block text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input
                id="password"
                type="password"
                v-model="deleteAccount.password"
                placeholder="Ingresa tu contraseña"
                class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
            />
            <!-- Ícono de candado (SVG de ejemplo) -->
            <svg
                class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path d="M17,8h-1V6c0-2.757-2.243-5-5-5S6,3.243,6,6v2H5C3.897,8,3,8.897,3,10v10c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V10C19,8.897,18.103,8,17,8z M8,6c0-1.654,1.346-3,3-3s3,1.346,3,3v2H8V6z"/>
            </svg>
          </div>
        </div>
        <!-- Mensaje del servidor (se muestra condicionalmente) -->
        <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" class="text-red-500"></div>
        <!-- Botón para eliminar cuenta -->
        <div>
          <button
              @click="deleteAccountAction"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded focus:outline-none"
          >
            Eliminar cuenta
          </button>
        </div>
        <!-- Botón para ir al perfil -->
        <div class="my-5">
          <NuxtLink
              to="/perfil"
              class="w-full block bg-green-500 hover:bg-green-600 text-white py-2 rounded text-center"
          >
            Perfil
          </NuxtLink>
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
  middleware: 'auth',

  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      deleteAccount: {
        email: '',
        password: '',
      },
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Eliminar cuenta - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Eliminar cuenta en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    deleteAccountAction(){
      this.api('/api/deleteAccount', {
        method: 'POST',
        body: this.deleteAccount
      })
        .then((response) => (response === 'Cuenta en proceso de eliminación') ? this.$router.push('/') : this.serverMessage.setServerMessage(response))
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
