<template>
  <div class="min-h-screen bg-gray-100 p-4 flex items-center justify-center" v-if="user.user">
    <!-- Tarjeta con ancho fijo de 300px, fondo blanco, sombra y bordes redondeados -->
    <div class="bg-white shadow rounded p-6 mx-auto" style="width: 300px;">
      <!-- Título de la tarjeta -->
      <h2 class="text-xl font-bold text-center mb-4">Vincular cartera de Hedera</h2>

      <!-- Contenedor para los elementos con separación vertical -->
      <div class="space-y-5">
        <!-- Texto informativo -->
        <div class="mt-5 text-center text-gray-700">
          Tu account ID de Hedera<br /><b>(Sin el checksum)</b>
        </div>

        <!-- Campo de entrada: Account ID de Hedera -->
        <div class="mt-5">
          <label for="account" class="block text-gray-700 mb-1">Tu account ID de Hedera</label>
          <div class="relative">
            <input
                id="account"
                type="text"
                v-model="account.account"
                placeholder="Ingresa tu account ID"
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

        <!-- Botón: Siguiente paso -->
        <div>
          <button @click="linkWallet" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded focus:outline-none">
            Siguiente paso
          </button>
        </div>

        <!-- Botón: Perfil -->
        <div class="my-5">
          <nuxt-link to="/perfil" class="block bg-green-500 hover:bg-green-600 text-white py-2 rounded text-center">
            Perfil
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
  middleware: 'auth',

  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      account: {
        account: '',
      },
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Vincular cartera de Hedera - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Vincular cartera de Hedera en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    afterLinkWallet(response){
      this.$router.push('/vincular-wallet-hedera-2')
    },

    linkWallet(){
      this.api('/api/profile/setUserProfileHederaWalletCheck', {
        method: 'POST',
        body: this.account
      })
        .then((response) => this.afterLinkWallet(response))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage(error))
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
