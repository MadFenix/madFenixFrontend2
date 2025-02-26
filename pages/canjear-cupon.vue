<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 class="leading-10 text-xl font-bold text-center mb-4 bg-madfenix-naranja py-6 h-[100px] flex items-center justify-center">Canjear Cupón para Plumas</h2>

    <div class="p-5 sm:p-20" v-if="user.user">
      <div class="relative rounded-tr-3xl sm:m-auto sm:w-1/2 border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
        <img src="/img/formularios/madfenix7.png" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div class="p-6 py-[170px] relative z-50">
          <!-- Campo de texto con ícono -->
          <div class="mt-5">
            <label for="coupon" class="block text-gray-700 mb-1">
              Cupón
            </label>
            <div class="relative">
              <input
                  id="coupon"
                  type="text"
                  v-model="couponData.coupon"
                  class="w-full text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
                  placeholder="Ingrese su cupón"
              />
              <!-- Ícono (ejemplo de SVG para mdi-ticket) -->
              <svg
                  class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
              >
                <path
                    d="M21 3H3C1.897 3 1 3.897 1 5v14c0 1.103.897 2 2 2h18c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM3 19V5h18l.002 14H3z"
                />
              </svg>
            </div>
          </div>

          <!-- Mensaje del servidor (visible condicionalmente) -->
          <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" class="text-red-500"></div>

          <!-- Botón para canjear el cupón -->
          <div>
            <button
                @click="useCoupon"
                class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2"
            >
              Canjear
            </button>
          </div>

          <!-- Botón para ir al perfil (utilizando router-link) -->
          <div class="my-5">
            <NuxtLink
                to="/perfil"
                class="w-full flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2"
            >
              Perfil
            </NuxtLink>
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

  data(){
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      couponData: {
        coupon: '',
      },
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Canjear cupón de plumas - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Canjear cupóon de plumas en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();
    this.setBackground();

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
    },
    afterUseCoupon(response){
      this.$router.push('/perfil')
    },

    useCoupon(){
      this.api('/api/coupon/usePlumasCoupon', {
        method: 'POST',
        body: this.couponData
      })
        .then((response) => this.afterUseCoupon(response))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
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
