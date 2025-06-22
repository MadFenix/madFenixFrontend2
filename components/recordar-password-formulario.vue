<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 class="leading-10 text-xl font-bold text-center mb-4 bg-madfenix-naranja py-6 h-[100px] flex items-center justify-center">Modificar Password</h2>

    <div class="p-5 sm:p-20">
      <div class="relative rounded-tr-3xl rounded-bl-3xl sm:m-auto sm:w-1/2 border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
        <img src="/img/formularios/madfenix7.png" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div class="p-6 py-[120px] relative z-50">
          <!-- Campo Email -->
          <div class="mt-5">
            <div class="relative">
              <input
                  id="email"
                  type="text"
                  v-model="forgotData.email"
                  placeholder="Ingresa tu email"
                  class="w-full text-madfenix-blanco text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
              />
            </div>
          </div>

          <!-- Campo Password -->
          <div class="mt-3">
            <div class="relative">
              <input
                  id="password"
                  type="password"
                  v-model="forgotData.password"
                  placeholder="Ingresa tu password"
                  class="w-full text-madfenix-blanco text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
              />
            </div>
          </div>

          <!-- Campo Confirmación Password -->
          <div class="mt-3">
            <div class="relative">
              <input
                  id="password_confirmation"
                  type="password"
                  v-model="forgotData.password_confirmation"
                  placeholder="Confirma tu password"
                  class="w-full text-madfenix-blanco text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
              />
            </div>
          </div>

          <!-- Mensaje del servidor (si existe) -->
          <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" class="text-madfenix-rojo w-full text-center"></div>
        </div>
      </div>
      <div class="relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios">
        <div class="flex justify-center">
          <!-- Botón: Perfil -->
          <div class="contenedor-boton-left-formularios">
            <nuxt-link to="/" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Volver a la Home
            </nuxt-link>
          </div>

          <div class="w-2 sm:w-12">
            &nbsp;
          </div>

          <!-- Botón: Siguiente paso -->
          <div class="contenedor-boton-right-formularios">
            <button
                @click="forgot"
                class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer"
            >
              Enviar
            </button>
          </div>
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
      route: null,
      forgotData: {
        email: '',
        password: '',
        password_confirmation: '',
        token: '',
      },
      route: useRoute(),
      accountParameterToUrl: '',
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
    this.setBackground();

    this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';

    const { $api } = useNuxtApp();
    this.api = $api;
    this.route = useRoute()
  },

  methods: {
    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
    },
    forgot(){
      (this.route.query.token) ? this.forgotData.token = this.route.query.token : this.$router.push( '/'+ this.accountParameterToUrl + 'login')
      this.api('/api/host/forgotReset', {
        method: 'POST',
        body: this.forgotData
      })
        .then((response) => (response === 'Password reset') ? this.$router.push( '/'+ this.accountParameterToUrl + 'login') : this.serverMessage.setServerMessage(response))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error.message) : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error))
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
