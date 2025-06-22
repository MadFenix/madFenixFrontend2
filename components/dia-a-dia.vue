<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100" v-if="user.user">
    <!-- Card con ancho fijo, fondo blanco, sombra y bordes redondeados -->
    <div class="bg-white shadow rounded p-6 mx-auto" style="width: 600px;">
      <!-- Título del card -->
      <h2 class="text-2xl font-bold text-center mb-4">
        Día a día
      </h2>
      <!-- Contenedor para el botón -->
      <div class="flex justify-center">
        <NuxtLink
            :to="'/' + accountParameterToUrl + 'registro'"
            class="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
        >
          Registro gratuito
        </NuxtLink>
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
      route: useRoute(),
      accountParameterToUrl: '',
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Día a día - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Día a día en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();
    this.setBackground();

    this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
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
