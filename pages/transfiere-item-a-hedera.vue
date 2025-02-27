<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 class="leading-10 text-xl font-bold text-center mb-4 bg-madfenix-naranja py-6 h-[100px] flex items-center justify-center">Transferir Ítem a Hedera</h2>

    <!-- Primera fila: Mensaje IMPORTANTE centrado -->
    <div class="flex items-center my-5">
      <div class="flex-1"></div>
      <div class="w-1/2 text-center text-madfenix-blanco">
        IMPORTANTE: Debes agregar el token <span v-html="nft_token_id"></span> a tu wallet.
      </div>
      <div class="flex-1"></div>
    </div>

    <!-- Segunda fila: Mensaje de instrucciones sobre transferencias -->
    <div class="flex items-center mb-5">
      <div class="flex-1"></div>
      <div class="w-1/2 text-center text-madfenix-blanco">
        Las transferencias pueden tardar de 5 a 15 minutos. Si hay problemas en la red, tras 30 minutos no te llega tu oro o tienes cualquier problema contacta con iam@valentigamez.com o en X en la cuenta @MadFenixGames o @elfenixvalenti.
      </div>
      <div class="flex-1"></div>
    </div>

    <div class="p-5 sm:p-20" v-if="user.user">
      <div class="relative rounded-tr-3xl sm:m-auto sm:w-1/2 border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
        <img src="/img/formularios/madfenix7.png" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div class="p-6 py-[120px] relative z-50">
          <!-- Campo: Id de hedera -->
          <div class="mt-5">
            <div class="relative">
              <input
                  id="id_hedera"
                  type="text"
                  v-model="transactionData.id_hedera"
                  placeholder="Ingresa el Id de hedera"
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
            <nuxt-link to="/perfil" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2">
              Volver al Perfil
            </nuxt-link>
          </div>

          <div class="w-2 sm:w-12">
            &nbsp;
          </div>

          <!-- Botón: Siguiente paso -->
          <div class="contenedor-boton-right-formularios">
            <button @click="transferToHedrera" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2">
              Transferir
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Última fila: Instrucciones para transferir desde Hedera a la cuenta -->
    <div class="flex items-center mt-5 mb-5">
      <div class="flex-1"></div>
      <div class="w-1/2 text-center text-madfenix-blanco">
        <b>Para transferir un Ítem desde Hedera a tu cuenta</b><br>
        Debes enviar el ítem que quieras ingresar a la cuenta 0.0.4970116 con el siguiente memo:<br>
        <span class="text-3xl" v-html="'deposito:' + user.user.id"></span><br>
        Este proceso puede tardar de 10 a 20 minutos.
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
        nft_identification_id: '',
      },
      nft_token_id: '',
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Transferir ítem a Hedera - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Transferir ítem a Hedera en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();
    this.setBackground();

    const { $api } = useNuxtApp();
    this.api = $api;;
    this.transactionData.nft_identification_id = this.$route.query.item_identification_id;
    this.nft_token_id = this.$route.query.nft_token_id;
  },

  methods: {
    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
    },
    afterTransferToHedrera(response){
      this.$router.push('/perfil')
    },

    transferToHedrera(){
      this.api('/api/blockchain/transferNftToHedera', {
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
