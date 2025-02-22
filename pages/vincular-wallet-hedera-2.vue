<template>
  <div class="min-h-screen bg-gray-100 p-4 flex items-center justify-center" v-if="user.user">
    <!-- Tarjeta contenedora con ancho fijo de 300px -->
    <div class="bg-white shadow rounded p-6 mx-auto" style="width: 300px;">
      <h2 class="text-xl font-bold text-center mb-4">Vincular cartera de Hedera</h2>

      <!-- Contenido informativo centrado -->
      <div class="space-y-5">
        <div class="mt-5 text-center text-gray-700">
          Debes enviar una transacción de 0.
          <span v-if="perfil" v-html="perfil.hedera_wallet_check"></span>
          hbar a la cartera 0.0.4970116 con el siguiente memo:<br>
          <span class="text-3xl" v-html="'vincular:' + user.id"></span><br>
          El proceso de vincular y asociar tus NFTs puede tardar hasta 1 hora.<br>
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
      perfil: null,
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
    this.getPerfil()
  },

  methods: {
    afterLogout(){
      Cookies.remove('token')
      Cookies.remove('user')
      this.user.setToken('')
      this.user.setUserToNull()
      this.user.removeUser()
      setTimeout(() => this.$router.push({ path: '/login' }), 2000)
    },

    logout () {
      this.api('/api/logout', {
        method: 'POST'
      })
        .then(() => this.afterLogout())
        .catch(() => this.afterLogout())
    },

    afterPerfil(response) {
      this.perfil = response;
    },

    getPerfil() {
      this.api('/api/profile/getUserProfile', {
        method: 'POST'
      })
        .then((response) => this.afterPerfil(response))
        .catch(() => this.logout())
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
