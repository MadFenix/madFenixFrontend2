<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 class="leading-10 text-xl font-bold text-center mb-4 bg-madfenix-naranja py-6 h-[100px] flex items-center justify-center">Transferir Oro Hedera - Paso 2/3</h2>

    <div class="p-5 sm:p-20" v-if="user.user">
      <div class="relative rounded-tr-3xl rounded-bl-3xl sm:m-auto sm:w-1/2 border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
        <img src="/img/formularios/madfenix7.png" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div class="p-6 py-[120px] relative z-50">
          <div class="w-full text-center text-xl text-madfenix-blanco">
            Las transferencias pueden tardar de 5 a 15 minutos. Si hay problemas en la red, tras 30 minutos no te llega tu oro o tienes cualquier problema contacta con iam@valentigamez.com o en X en la cuenta @MadFenixGames o @elfenixvalenti.
          </div>

          <div>
            <div class="grid grid-cols-12 gap-3 items-center mt-3">
              <div class="col-span-2 text-right">
                <input type="checkbox" v-model="tokenAdded" class="form-checkbox h-5 w-5 text-blue-500" />
              </div>
              <div class="col-span-10 text-madfenix-blanco">
                Estoy de acuerdo en enviar oro de mi cuenta de Mad Fénix a Hedera
              </div>
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
            <nuxt-link to="/perfil" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Volver al Perfil
            </nuxt-link>
          </div>

          <div class="w-2 sm:w-12">
            &nbsp;
          </div>

          <!-- Botón: Siguiente paso -->
          <div class="contenedor-boton-right-formularios">
            <button @click="nextStep" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Siguiente
            </button>
          </div>
        </div>
      </div>

      <div class="relative rounded-tr-3xl sm:mx-auto my-12 sm:w-1/2 border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
        <img src="/img/formularios/madfenix7.png" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div class="p-6 py-[40px] relative z-50">

          <!-- Información adicional para transferir oro desde Hedera a tu cuenta -->
          <div class="flex items-center mt-5 mb-5">
            <div class="flex-1"></div>
            <div class="w-1/2 text-center text-madfenix-blanco">
              <b>Para transferir Oro desde Hedera a tu cuenta</b><br>
              Debes enviar el oro que quieras ingresar a la cuenta 0.0.4970116 con el siguiente memo:<br>
              <span class="text-3xl" v-html="'deposito:' + user.user.id"></span><br>
              Este proceso puede tardar de 10 a 20 minutos.<br>
              No envíes decimales ya que se perderán.
            </div>
            <div class="flex-1"></div>
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
    useHead({
      title: 'Transferir oro a Hedera - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Transferir oro a Hedera en Mad Fénix Games.'
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

    nextStep(){
      if (this.tokenAdded) {
        this.$router.push('/transfiere-oro-a-hedera')
      } else {
        this.serverMessage.setServerMessage('Debes aceptar que quieres enviar oro a tu cuenta de Hedera.')
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
