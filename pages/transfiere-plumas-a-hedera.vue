<template>
  <div class="min-h-screen bg-gray-100 p-4" v-if="user.user">
    <!-- Primera fila: Mensaje IMPORTANTE -->
    <div class="flex items-center my-5">
      <div class="flex-1"></div>
      <div class="w-1/2 text-center text-gray-800">
        IMPORTANTE: Debes agregar el token 0.0.5127845 a tu wallet.
      </div>
      <div class="flex-1"></div>
    </div>

    <!-- Segunda fila: Mensaje sobre transferencias -->
    <div class="flex items-center mb-5">
      <div class="flex-1"></div>
      <div class="w-1/2 text-center text-gray-700">
        Las transferencias pueden tardar de 5 a 15 minutos. Si hay problemas en la red, tras 30 minutos no te llegan tus plumas o tienes cualquier problema contacta con iam@valentigamez.com o en Twitter en la cuenta @MadFenixGames o @iamvalentigamez.
      </div>
      <div class="flex-1"></div>
    </div>

    <!-- Tarjeta: Transferir plumas a Hedera -->
    <div class="bg-white shadow rounded p-6 mx-auto" style="width: 300px;">
      <h2 class="text-xl font-bold text-center mb-4">Transferir plumas a Hedera</h2>
      <div class="space-y-5">
        <!-- Campo: Id de hedera -->
        <div class="mt-5">
          <label for="id_hedera" class="block text-gray-700 mb-1">Id de hedera</label>
          <div class="relative">
            <input
                id="id_hedera"
                type="text"
                v-model="transactionData.id_hedera"
                placeholder="Ingresa el Id de hedera"
                class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
            />
            <!-- Ícono: simulando mdi-ticket -->
            <svg
                class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path d="M22,12l-4-4V9H2v6h16v1L22,12z" />
            </svg>
          </div>
        </div>

        <!-- Campo: Cantidad de plumas -->
        <div class="mt-5">
          <label for="plumas" class="block text-gray-700 mb-1">Cantidad de plumas (Mínimo 1)</label>
          <div class="relative">
            <input
                id="plumas"
                type="number"
                v-model="transactionData.plumas"
                placeholder="Ingresa la cantidad"
                class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
            />
            <!-- Ícono similar -->
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

        <!-- Botón: Transferir -->
        <div>
          <button @click="transferToHedrera" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded focus:outline-none">
            Transferir
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

    <!-- Última fila: Instrucciones adicionales -->
    <div class="flex items-center mt-5 mb-5">
      <div class="flex-1"></div>
      <div class="w-1/2 text-center text-gray-700">
        <b>Para transferir Plumas desde Hedera a tu cuenta de Mad Fénix</b><br>
        Debes enviar las plumas que quieras ingresar a la cuenta 0.0.4970116 con el siguiente memo:<br>
        <span class="text-3xl" v-html="'deposito:' + user.id"></span><br>
        Este proceso puede tardar de 10 a 20 minutos.<br>
        No envíes decimales ya que se perderán.
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
      transactionData: {
        id_hedera: '',
        plumas: '',
      },
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Transferir plumas a Hedera - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Transferir plumas a Hedera en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    afterTransferToHedrera(response){
      this.$router.push('/perfil')
    },

    transferToHedrera(){
      this.api('/api/blockchain/transferPlumasToHedera', {
        method: 'POST',
        body: this.transactionData
      })
        .then((response) => this.afterTransferToHedrera(response))
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
