<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 :class="`leading-10 text-xl font-bold text-center mb-4 bg-[color:var(--naranja)] py-6 h-[100px] flex items-center justify-center`">Crear Código de Referido</h2>

    <div :class="`p-5 sm:p-20`" v-if="user.user">
      <div :class="`relative rounded-tr-3xl rounded-bl-3xl sm:m-auto sm:w-1/2 border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
        <img src="/img/formularios/madfenix7.png" :class="`absolute`" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div :class="`p-6 py-[120px] relative z-50`">
          <!-- Campo de texto para el código de referido -->
          <div :class="`mt-5`">
            <div :class="`relative`">
              <input
                  id="referred_code"
                  type="text"
                  v-model="referred.referred_code"
                  :class="`w-full text-[color:var(--blanco)] text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-[color:var(--gris)] py-4 pl-10 pr-3 border-2 border-[color:var(--gris)] focus:border-[color:var(--naranja)]`"
                  placeholder="Ingrese su código de referido"
              />
            </div>
          </div>
          <!-- Mensaje del servidor (visible condicionalmente) -->
          <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" :class="`text-[color:var(--rojo)] w-full text-center`"></div>
        </div>
      </div>
      <div :class="`relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios`">
        <div :class="`flex justify-center`">
          <!-- Botón: Perfil -->
          <div :class="`contenedor-boton-left-formularios`">
            <nuxt-link :to="'/' + accountParameterToUrl + 'perfil'" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
              Volver al Perfil
            </nuxt-link>
          </div>

          <div :class="`w-2 sm:w-12`">
            &nbsp;
          </div>

          <!-- Botón: Siguiente paso -->
          <div :class="`contenedor-boton-right-formularios`">
            <button
                @click="createReferred"
                :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
            >
              Crear
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Texto informativo debajo de la card -->
    <div :class="`flex justify-center mt-5 mb-5 w-full`">
      <div :class="`w-1/2 text-center`">
        Cuando alguien vincula tu código de referido obtienes 5 <span v-html="user.config?.theme?.title_coin_premium ?? 'Oro'" />. También obtienes el 10% de <span v-html="user.config?.theme?.title_coin_premium ?? 'Oro'" /> de las compras con esta moneda en la tienda por parte de tus referidos.
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
      referred: {
        referred_code: '',
      },
      route: useRoute(),
      accountParameterToUrl: '',
    }
  },

  computed: {
  },

  mounted() {

    this.setUserCookies();
    this.setBackground();

    if (window.location.hostname == 'our.welore.io') {
        this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';
      } else {
        this.accountParameterToUrl = window.location.hostname.split('.')[0] + '/';
      }

    this.setConfigCookies();

    useHead({
      title: 'Crear tu código de referidos - ' + this.user.config?.config?.name_ecosystem ?? '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Crear tu código de referidos en ' + this.user.config?.config?.name_ecosystem ?? ''
        }
      ]
    });

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    setBackground () {
      if (window.location.hostname == 'madfenix.com') {
        document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";

      }
    },
    afterCreateReferred(response){
      this.$router.push( '/'+ this.accountParameterToUrl + 'perfil')
    },

    createReferred(){
      this.api('/api/host/profile/setUserProfileReferredCode', {
        method: 'POST',
        body: this.referred
      })
        .then((response) => this.afterCreateReferred(response))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error.message) : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error))
    },

     setConfigCookies() {
      let config = Cookies.get(this.accountParameterToUrl.replace(/^\/+|\/+$/g, '') + '_config')
      if (config) {
        config = JSON.parse(config)
      }
      if (config) {
        this.user.setConfig(this.accountParameterToUrl, config);

      } else {
        try {
          this.user.fetchConfig(this.accountParameterToUrl);
        } catch (error) {
        }
      }
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
