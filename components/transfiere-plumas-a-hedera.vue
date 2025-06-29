<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 :class="`leading-10 text-xl font-bold text-center mb-4 bg-[color:var(--naranja)] py-6 h-[100px] flex items-center justify-center`">Transferir <span v-html="user.config?.theme?.title_coin_free ?? 'Plata'" /> a Hedera - Paso 3/3</h2>

    <!-- Segunda fila: Mensaje sobre transferencias -->
    <div :class="`flex items-center mb-5`">
      <div :class="`flex-1`"></div>
      <div :class="`w-1/2 text-center text-[color:var(--blanco)]`">
        Ingresa un número entero en la cantidad de <span v-html="user.config?.theme?.title_coin_free ?? 'Plata'" />.
      </div>
      <div :class="`flex-1`"></div>
    </div>

    <div :class="`p-5 sm:p-20`" v-if="user.user">
      <div :class="`relative rounded-tr-3xl rounded-bl-3xl sm:m-auto sm:w-1/2 border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
        <img src="/img/formularios/madfenix7.png" :class="`absolute`" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div :class="`p-6 py-[120px] relative z-50`">
          <!-- Campo: Id de hedera -->
          <div>
            <div :class="`relative`">
              <input
                  id="id_hedera"
                  type="text"
                  v-model="transactionData.id_hedera"
                  placeholder="Ingresa el Id de hedera"
                  :class="`w-full text-[color:var(--blanco)] text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-[color:var(--gris)] py-4 pl-10 pr-3 border-2 border-[color:var(--gris)] focus:border-[color:var(--naranja)]`"
              />
            </div>
          </div>

          <!-- Campo: Cantidad de <span v-html="user.config?.theme?.title_coin_free ?? 'Plata'" /> -->
          <div :class="`mt-3`">
            <div :class="`relative`">
              <input
                  id="plumas"
                  type="number"
                  v-model="transactionData.plumas"
                  placeholder="Ingresa la cantidad"
                  :class="`w-full text-[color:var(--blanco)] text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-[color:var(--gris)] py-4 pl-10 pr-3 border-2 border-[color:var(--gris)] focus:border-[color:var(--naranja)]`"
              />
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
            <button @click="transferToHedrera" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
              Transferir
            </button>
          </div>
        </div>
      </div>
    </div>

    <div :class="`relative rounded-tr-3xl sm:mx-auto my-12 sm:w-1/2 border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
      <img src="/img/formularios/madfenix7.png" :class="`absolute`" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

      <div :class="`p-6 py-[40px] relative z-50`">

        <div :class="`flex items-center mt-5 mb-5`">
          <div :class="`flex-1`"></div>
          <div :class="`w-1/2 text-center text-[color:var(--blanco)]`">
            <b>Para transferir <span v-html="user.config?.theme?.title_coin_free ?? 'Plata'" /> desde Hedera a tu cuenta de Mad Fénix</b><br>
            Debes enviar las <span v-html="user.config?.theme?.title_coin_free ?? 'Plata'" /> que quieras ingresar a la cuenta 0.0.4970116 con el siguiente memo:<br>
            <span :class="`text-3xl`" v-html="'deposito:' + user.user.id"></span><br>
            Este proceso puede tardar de 10 a 20 minutos.<br>
            No envíes decimales ya que se perderán.
          </div>
          <div :class="`flex-1`"></div>
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
      transactionData: {
        id_hedera: '',
        plumas: '',
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

    if (window.location.hostname == 'our.welore.io' || window.location.hostname == 'localhost') {
        this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';
      } else {
        this.accountParameterToUrl = '';
      }

    this.setConfigCookies();

    useHead({
      title: 'Transferir ' + (this.user.config?.theme?.title_coin_free ?? 'Plata') + ' a Hedera - ' + this.user.config?.config?.name_ecosystem ?? '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Transferir ' + (this.user.config?.theme?.title_coin_free ?? 'Plata') + ' a Hedera en ' + this.user.config?.config?.name_ecosystem ?? ''
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
    afterTransferToHedrera(response){
      this.$router.push( '/'+ this.accountParameterToUrl + 'perfil')
    },

    transferToHedrera(){
      this.api('/api/host/blockchain/transferPlumasToHedera', {
        method: 'POST',
        body: this.transactionData
      })
        .then((response) => this.afterTransferToHedrera(response))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error.message) : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error))
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
