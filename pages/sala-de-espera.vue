<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4" v-if="user.user">
    <!-- Tarjeta contenedora con ancho fijo de 300px, fondo blanco, sombra y bordes redondeados -->
    <div class="bg-white shadow rounded p-6 mx-auto" style="width: 300px;">
      <!-- Título de la tarjeta -->
      <h2 class="text-2xl font-bold text-center mb-4">Sala de espera</h2>

      <!-- Contenedor para el contenido con separación vertical -->
      <div class="space-y-5">
        <!-- Mensaje principal -->
        <p class="mt-5 text-gray-700 text-center">
          En breves momentos serás redirigido hacia el perfil.
        </p>

        <!-- Subtítulo centrado con "spacers" simulados -->
        <div class="flex items-center mt-5">
          <div class="flex-1"></div>
          <p class="text-sm text-gray-600">¿Ha pasado más de 5 segundos?</p>
          <div class="flex-1"></div>
        </div>

        <!-- Botón para ir al perfil -->
        <div class="my-5">
          <nuxt-link
              to="/perfil"
              class="block bg-green-500 hover:bg-green-600 text-white py-2 rounded text-center"
          >
            Ir al perfil
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
  head: {
    title: 'Sala de espera - Mad Fénix Games',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Sala de espera en Mad Fénix Games.'
      }
    ]
  },
  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
    }
  },

  mounted() {
    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
    setTimeout(() => this.$router.push({ path: '/perfil' }), 3000)
  },

  methods: {

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
