<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 :class="`leading-10 text-xl font-bold text-center mb-4 bg-[color:var(--naranja)] py-6 h-[100px] flex items-center justify-center`">Transferir Ítem a Hedera</h2>

    <!-- Primera fila: Mensaje IMPORTANTE centrado -->
    <div :class="`flex items-center my-5`">
      <div :class="`flex-1`"></div>
      <div :class="`w-1/2 text-center text-[color:var(--blanco)]`">
        IMPORTANTE: Debes agregar el token <span v-html="nft_token_id"></span> a tu wallet.
      </div>
      <div :class="`flex-1`"></div>
    </div>

    <!-- Segunda fila: Mensaje de instrucciones sobre transferencias -->
    <div :class="`flex items-center mb-5`">
      <div :class="`flex-1`"></div>
      <div :class="`w-1/2 text-center text-[color:var(--blanco)]`">
        Las transferencias pueden tardar de 5 a 15 minutos. Si hay problemas en la red, tras 30 minutos no te llega tu <span v-html="user.config?.theme?.title_coin_premium ?? 'Oro'" /> o tienes cualquier problema contacta con iam@valentigamez.com o en X en la cuenta @MadFenixGames o @elfenixvalenti.
      </div>
      <div :class="`flex-1`"></div>
    </div>

    <div :class="`p-5 sm:p-20`" v-if="user.user">
      <div :class="`relative rounded-tr-3xl rounded-bl-3xl sm:m-auto sm:w-1/2 border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
        <img src="/img/formularios/madfenix7.png" :class="`absolute`" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div :class="`p-6 py-[120px] relative z-50`">
          <!-- Campo: Id de hedera -->
          <div :class="`mt-5`">
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

    <!-- Última fila: Instrucciones para transferir desde Hedera a la cuenta -->
    <div :class="`flex items-center mt-5 mb-5`">
      <div :class="`flex-1`"></div>
      <div :class="`w-1/2 text-center text-[color:var(--blanco)]`">
        <b>Para transferir un Ítem desde Hedera a tu cuenta</b><br>
        Debes enviar el ítem que quieras ingresar a la cuenta 0.0.4970116 con el siguiente memo:<br>
        <span :class="`text-3xl`" v-html="'deposito:' + user.user.id"></span><br>
        Este proceso puede tardar de 10 a 20 minutos.
      </div>
      <div :class="`flex-1`"></div>
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
        nft_identification_id: '',
      },
      nft_token_id: '',
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
      title: 'Transferir ítem a Hedera - ' + this.user.config?.config?.name_ecosystem ?? '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Transferir ítem a Hedera en ' + this.user.config?.config?.name_ecosystem ?? ''
        }
      ]
    });

    const { $api } = useNuxtApp();
    this.api = $api;;
    this.transactionData.nft_identification_id = this.$route.query.item_identification_id;
    this.nft_token_id = this.$route.query.nft_token_id;
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
      this.api('/api/host/blockchain/transferNftToHedera', {
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
