<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 class="leading-10 text-xl font-bold text-center mb-4 bg-madfenix-naranja py-6 h-[100px] flex items-center justify-center">Canjear Cupón</h2>

    <div class="p-5 sm:p-20" v-if="user.user">
      <div class="relative rounded-tr-3xl rounded-bl-3xl sm:m-auto sm:w-1/2 border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
        <img src="/img/formularios/madfenix7.png" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div class="p-6 py-[120px] relative z-50">
          <!-- Campo de texto con ícono -->
          <div class="mt-5">
            <div class="relative">
              <input
                  id="coupon"
                  type="text"
                  v-model="couponData.coupon"
                  class="w-full text-madfenix-blanco text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
                  placeholder="Ingrese su cupón"
              />
            </div>
          </div>

          <!-- Mensaje del servidor (visible condicionalmente) -->
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
            <button
                @click="useCoupon"
                class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer"
            >
              Canjear
            </button>
          </div>
        </div>
      </div>
      <div v-if="showProductsModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden bg-madfenix-gris bg-opacity-50 fixed top-0 right-0 left-0 z-50 w-full h-modal md:h-full">
        <div class="flex items-center justify-center p-4 w-full h-screen">
          <!-- Modal content -->
          <div class="bg-madfenix-gris text-madfenix-blanco rounded-lg shadow border border-madfenix-blanco">
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b border-madfenix-blanco">
              <h3 class="text-xl font-semibold">
                ¡Tus nuevos ítems!
              </h3>
              <button type="button" @click="showProductsModal = false; imageItemsReveal = false" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Cerrar pantalla</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="w-full p-3 overflow-y-auto" style="height: 500px; max-width: 700px;">
              <video id="video-storemadfenix" class="rounded rounded-3xl border border-2 border-madfenix-gris" playsinline @ended="revealImageItems()" v-if="!imageItemsReveal">
                <source :src="videoNewItems" type="video/mp4">
                Tu navegador no soporta el video.
              </video>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-2" v-if="imageItemsReveal && itemsPurchaseToShow">
                <div v-for="nft in itemsPurchaseToShow.nfts" :key="nft.id">
                  <div class="relative rounded-tr-3xl rounded-bl-3xl border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
                    <img :src="nft.image" style="width: 100%;" :alt="nft.name" :title="nft.name" />

                    <div class="px-6 mt-3 mb-10 relative z-50 w-full text-center text-madfenix-blanco" v-html="nft.name" />
                  </div>
                </div>
                <div v-if="itemsPurchaseToShow.plumas">
                  <div class="relative rounded-tr-3xl rounded-bl-3xl border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
                    <img :src="'/img/perfil/pluma.png'" style="width: 100%;" :alt="itemsPurchaseToShow.plumas" :title="itemsPurchaseToShow.plumas" />

                    <div class="px-6 mt-3 mb-10 relative z-50 w-full text-center text-madfenix-blanco" v-html="itemsPurchaseToShow.plumas" />
                  </div>
                </div>
                <div v-if="itemsPurchaseToShow.oro">
                  <div class="relative rounded-tr-3xl rounded-bl-3xl border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
                    <img :src="'/img/perfil/oro.png'" style="width: 100%;" :alt="itemsPurchaseToShow.oro" :title="itemsPurchaseToShow.oro" />

                    <div class="px-6 mt-3 mb-10 relative z-50 w-full text-center text-madfenix-blanco" v-html="itemsPurchaseToShow.oro" />
                  </div>
                </div>
              </div>
            </div>
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
import { nextTick } from 'vue';

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
      showProductsModal: false,
      imageItemsReveal: false,
      videoNewItems: '/video/MadFenixLogoReveal.mp4',
      itemsPurchaseToShow: null,
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
    revealImageItems() {
      this.imageItemsReveal = true;
    },

    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
    },

    openNewItems(itemsPurchase) {
      this.showEventModal = false;
      this.event = null;
      this.videoNewItems = itemsPurchase.video_purchase;
      this.itemsPurchaseToShow = itemsPurchase;
      if (itemsPurchase.video_purchase) {
        this.imageItemsReveal = false;
      } else {
        this.imageItemsReveal = true;
      }

      this.showProductsModal = true;

      if (itemsPurchase.video_purchase) {
        nextTick(() => {
          document.getElementById("video-storemadfenix").play();
        });
      }
    },

    afterUseCoupon(response){
      this.openNewItems(response);
    },

    useCoupon(){
      this.api('/api/host/coupon/useCoupon', {
        method: 'POST',
        body: this.couponData
      })
        .then((response) => this.afterUseCoupon(response))
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
