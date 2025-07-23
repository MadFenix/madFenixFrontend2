<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 :class="`leading-10 text-xl font-bold text-center mb-4 bg-[color:var(--naranja)] py-6 h-[100px] flex items-center justify-center`">Transferir <span v-html="user.config?.theme?.title_coin_premium ?? 'Oro'" /> Hedera - Paso 1/3</h2>

    <div :class="`p-5 sm:p-20`" v-if="user.user">
      <div :class="`relative rounded-tr-3xl rounded-bl-3xl sm:m-auto sm:w-1/2 border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
        <img src="/img/formularios/madfenix7.png" :class="`absolute`" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div :class="`p-6 py-[120px] relative z-50`">
          <div :class="`w-full text-xl text-center text-[color:var(--blanco)]`">
            Agrega el token 0.0.5127766 a tu wallet.
          </div>

          <div>
            <div :class="`grid grid-cols-12 gap-3 items-center mt-3`">
              <div :class="`col-span-4 text-right`">
                <input type="checkbox" v-model="tokenAdded" :class="`form-checkbox h-5 w-5 text-blue-500`" />
              </div>
              <div :class="`col-span-6 text-[color:var(--blanco)]`">
                Confirmo que he agregado el token
              </div>
            </div>
          </div>

          <!-- Mensaje del servidor (si existe) -->
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
            <button @click="nextStep" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
              Siguiente
            </button>
          </div>
        </div>
      </div>

      <div :class="`relative rounded-tr-3xl sm:mx-auto my-12 sm:w-1/2 border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
        <img src="/img/formularios/madfenix7.png" :class="`absolute`" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div :class="`p-6 py-[40px] relative z-50`">

          <!-- Información adicional para transferir <span v-html="user.config?.theme?.title_coin_premium ?? 'Oro'" /> desde Hedera a tu cuenta -->
          <div :class="`flex items-center mt-5 mb-5`">
            <div :class="`flex-1`"></div>
            <div :class="`w-1/2 text-center text-[color:var(--blanco)]`">
              <b>Para transferir <span v-html="user.config?.theme?.title_coin_premium ?? 'Oro'" /> desde Hedera a tu cuenta</b><br>
              Debes enviar el oro que quieras ingresar a la cuenta 0.0.4970116 con el siguiente memo:<br>
              <span :class="`text-3xl`" v-html="'deposito:' + user.user.id"></span><br>
              Este proceso puede tardar de 10 a 20 minutos.<br>
              No envíes decimales ya que se perderán.
            </div>
            <div :class="`flex-1`"></div>
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
  middleware: 'auth',

  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      tokenAdded: false,
      route: useRoute(),
      accountParameterToUrl: '',
    }
  },

  computed: {
  },

  mounted() {

    this.setUserCookies();
    this.setBackground();

    if (window.location.hostname == 'our.welore.io' || window.location.hostname == 'localhost') {
        this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';
      } else {
        this.accountParameterToUrl = '';
      }

    this.setConfigCookies();

    useHead({
      title: 'Transferir ' + (this.user.config?.theme?.title_coin_premium ?? 'Oro') + ' a Hedera - ' + this.user.config?.config?.name_ecosystem ?? '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Transferir ' + (this.user.config?.theme?.title_coin_premium ?? 'Oro') + ' a Hedera en ' + this.user.config?.config?.name_ecosystem ?? ''
        }
      ]
    });

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    setBackground () {
      if (window.location.hostname == 'madfenix.com' || window.location.hostname == 'www.madfenix.com') {
        document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";

      }
    },

    nextStep(){
      if (this.tokenAdded) {
        this.$router.push( '/'+ this.accountParameterToUrl + 'transfiere-oro-a-hedera-previo2')
      } else {
        this.serverMessage.setServerMessage('Debes aceptar que has agregado el token.')
      }
    },

     setConfigCookies() {
      let config = localStorage.getItem(this.accountParameterToUrl.replace(/^\/+|\/+$/g, '') + '_config')
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
      let token = localStorage.getItem('token')
      if (token) {
        this.user.setToken(token);

        //let user = document.cookie.match(new RegExp('(^| )user=([^;]+)'))
        let user = localStorage.getItem('user')

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
