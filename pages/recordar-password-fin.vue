<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <!-- Tarjeta con ancho fijo de 300px, fondo blanco, sombra y bordes redondeados -->
    <div class="bg-white shadow rounded p-6 mx-auto" style="width: 300px;">
      <!-- Título de la tarjeta -->
      <h2 class="text-2xl font-bold text-center mb-4">Recordar password</h2>

      <!-- Mensaje informativo -->
      <p class="mt-5 text-gray-700">
        En unos momentos recibirás un correo con las instrucciones para modificar el password.
      </p>

      <!-- Botón "Home" -->
      <div class="mt-5">
        <nuxt-link
            to="/"
            class="block bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-center"
        >
          Home
        </nuxt-link>
      </div>

      <!-- Botón "Login" -->
      <div class="my-5">
        <nuxt-link
            to="/login"
            class="block bg-green-500 hover:bg-green-600 text-white py-2 rounded text-center"
        >
          Login
        </nuxt-link>
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
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Recordar password fin - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Recordar password fin en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
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
