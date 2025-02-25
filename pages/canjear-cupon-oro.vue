<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100" v-if="user.user">
    <!-- Card con ancho fijo, sombra y bordes redondeados -->
    <div class="bg-white shadow rounded p-6 mx-auto" style="width: 300px;">
      <!-- Título del card -->
      <h2 class="text-xl font-bold text-center mb-4">
        Canjear cupón para oro
      </h2>

      <!-- Contenedor de elementos con separación vertical -->
      <div class="space-y-4">
        <!-- Campo de texto con ícono -->
        <div class="mt-5">
          <label for="coupon" class="block text-gray-700 mb-1">
            Cupón
          </label>
          <div class="relative">
            <input
                id="coupon"
                type="text"
                v-model="couponData.coupon"
                class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
                placeholder="Ingrese su cupón"
            />
            <!-- Ícono (ejemplo de SVG para mdi-ticket) -->
            <svg
                class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path
                  d="M21 3H3C1.897 3 1 3.897 1 5v14c0 1.103.897 2 2 2h18c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM3 19V5h18l.002 14H3z"
              />
            </svg>
          </div>
        </div>

        <!-- Mensaje del servidor (visible condicionalmente) -->
        <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" class="text-red-500"></div>

        <!-- Botón para canjear el cupón -->
        <div>
          <button
              @click="useCoupon"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded focus:outline-none"
          >
            Canjear
          </button>
        </div>

        <!-- Botón para ir al perfil (utilizando router-link) -->
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

  data(){
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      couponData: {
        coupon: '',
      },
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Canjear cupón de oro - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Canjear cupón de oro en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    afterUseCoupon(response){
      this.$router.push('/perfil')
    },

    useCoupon(){
      this.api('/api/coupon/useOroCoupon', {
        method: 'POST',
        body: this.couponData
      })
        .then((response) => this.afterUseCoupon(response))
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
