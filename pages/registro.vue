<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <!-- Tarjeta contenedora con ancho fijo de 300px, fondo blanco, sombra, bordes redondeados y margen inferior -->
    <div class="bg-white shadow rounded p-6 mx-auto mb-7" style="width: 300px;">
      <!-- Título de la tarjeta -->
      <h2 class="text-2xl font-bold text-center mb-4">Registro</h2>

      <!-- Contenedor para los campos y elementos del formulario -->
      <div class="space-y-4">
        <!-- Campo: Nombre -->
        <div class="mt-5">
          <label for="name" class="block text-gray-700 mb-1">Nombre</label>
          <div class="relative">
            <input
                id="name"
                type="text"
                v-model="signUpData.name"
                placeholder="Ingresa tu nombre"
                class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
            />
            <!-- Ícono para Nombre (ejemplo de SVG para mdi-account) -->
            <svg class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>

        <!-- Campo: Email -->
        <div>
          <label for="email" class="block text-gray-700 mb-1">Email</label>
          <div class="relative">
            <input
                id="email"
                type="email"
                v-model="signUpData.email"
                placeholder="Ingresa tu email"
                class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
            />
            <!-- Ícono para Email (ejemplo de SVG para mdi-email) -->
            <svg class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,12c2.21,0,4-1.79,4-4s-1.79-4-4-4-4,1.79-4,4S9.79,12,12,12z M12,14c-2.67,0-8,1.34-8,4v2h16v-2 C20,15.34,14.67,14,12,14z"/>
            </svg>
          </div>
        </div>

        <!-- Campo: Password -->
        <div>
          <label for="password" class="block text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input
                id="password"
                type="password"
                v-model="signUpData.password"
                placeholder="Ingresa tu password"
                class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
            />
            <!-- Ícono para Password (ejemplo de SVG para mdi-lock) -->
            <svg class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17,8h-1V6c0-2.757-2.243-5-5-5S6,3.243,6,6v2H5C3.897,8,3,8.897,3,10v10c0,1.103,0.897,2,2,2h12 c1.103,0,2-0.897,2-2V10C19,8.897,18.103,8,17,8z M8,6c0-1.654,1.346-3,3-3s3,1.346,3,3v2H8V6z"/>
            </svg>
          </div>
        </div>

        <!-- Checkbox: Acepto los términos y condiciones -->
        <div>
          <div class="grid grid-cols-12 items-center mt-3">
            <div class="col-span-2">
              <input type="checkbox" v-model="signUpCheck" class="form-checkbox h-5 w-5 text-blue-500" />
            </div>
            <div class="col-span-10 text-gray-700">
              Acepto los <a href="/condiciones" target="_blank" class="text-blue-500 hover:underline">términos y condiciones</a>
            </div>
          </div>
        </div>

        <!-- Checkbox: Quiero recibir la newsletter -->
        <div>
          <div class="grid grid-cols-12 items-center mt-3">
            <div class="col-span-2">
              <input type="checkbox" v-model="signUpData.newsletter" class="form-checkbox h-5 w-5 text-blue-500" />
            </div>
            <div class="col-span-10 text-gray-700">
              Quiero recibir la newsletter
            </div>
          </div>
        </div>

        <!-- Mensaje del servidor (si existe) -->
        <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" class="text-red-500"></div>

        <!-- Botón: Enviar -->
        <div>
          <button @click="signUp" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded focus:outline-none">
            Enviar
          </button>
        </div>

        <!-- Botón: Volver -->
        <div class="my-5">
          <nuxt-link to="/login" class="block bg-green-500 hover:bg-green-600 text-white py-2 rounded text-center">
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
      signUpData: {
        name: '',
        email: '',
        password: '',
        newsletter: false,
      },
      signUpCheck: false,
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Registro - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Registro en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    signUp(){
      if (this.signUpData.name == "") {
        this.serverMessage.setServerMessage("Debes poner un nombre de usuario.");
        return;
      }
      if (this.signUpData.email == "") {
        this.serverMessage.setServerMessage("Debes poner un correo.");
        return;
      }
      if (this.signUpData.password == "" || this.signUpData.password.length < 8) {
        this.serverMessage.setServerMessage("Debes poner un password de almenos 8 carácteres.");
        return;
      }
      if (!this.signUpCheck) {
        this.serverMessage.setServerMessage("Debes aceptar los términos y condiciones.");
        return;
      }
      this.api('/api/register', {
        method: 'POST',
        body: this.signUpData
      })
        .then((response) => (response === 'User registered') ? this.$router.push({ path: '/login' }) : this.serverMessage.setServerMessage(response))
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
