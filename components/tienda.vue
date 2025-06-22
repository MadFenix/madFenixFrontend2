<template>
  <div v-if="storeDetails">
    <!-- Case Study Hero -->
    <section class="px-4 py-12 md:py-16 sm:px-6 lg:px-8">
      <div class="max-w-screen-xl mx-auto">
        <!-- Hero text -->
        <div class="w-full max-w-3xl mx-auto text-center lg:max-w-5xl">
          <h1
              class="mt-4 text-4xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-5xl md:text-6xl"
              v-html="'Pasa al siguiente nivel'"
          />
        </div>
      </div>
    </section>

    <section class="max-w-screen-xl px-4 py-12 mx-auto md:py-16 sm:px-6 lg:px-8" v-if="storeDetails.products" v-for="product in storeDetails.products" :key="product.id">
      <div class="relative z-30 grid grid-cols-1 sm:grid-cols-12 items-center justify-center mx-auto text-center px-4 sm:px-16 lg:flex-row lg:text-left">
        <div class="sm:col-span-3 flex items-center py-6 sm:py-0 px-12 h-full text-2xl rounded-tl-3xl rounded-tr-3xl sm:rounded-tr-none bg-madfenix-gris border border-madfenix-naranja sm:border-r-0 font-bold sm:text-4xl">
          <img :src="product.image" :title="product.name" :alt="product.name" class="inset-y-0 z-40 h-full" />
        </div>
        <div class="sm:col-span-9 px-3 sm:px-0 py-3 sm:py-0 sm:flex sm:items-center space-x-3 justify-center h-full rounded-br-3xl rounded-bl-3xl sm:rounded-bl-none bg-madfenix-gris border border-madfenix-naranja sm:border-l-0 sm:mr-12 lg:justify-end">
          <div class="grow font-extrabold tracking-tight">
            <h5 class="font-extrabold tracking-tight text-madfenix-naranja text-4xl sm:text-5xl">
              <span v-html="product.name" />
            </h5>
            <p class="text-madfenix-blanco text-xl" v-if="product.short_description" v-html="product.short_description" />
          </div>
          <div class="botones-tokens">
            <stripe-buy-button v-if="product.price_fiat > 0 && product.price_fiat == 5"
                                                         buy-button-id="buy_btn_1PAYYpHruUfPE2wuw5Mhazx8"
                                                         publishable-key="pk_live_51PAXsOHruUfPE2wuT1MTCc3LMcanaF77ZykWh93fUu8whnI6GLIFVfPcBSJVNTzGSiQtchKVsRu2kiziQlOD44XH006ERR5INg"
                                                         :customer-email="user.email"
            >
            </stripe-buy-button>
            <stripe-buy-button v-else-if="product.price_fiat > 0 && product.price_fiat == 10"
                               buy-button-id="buy_btn_1PAaDhHruUfPE2wuOkz0bx5C"
                               publishable-key="pk_live_51PAXsOHruUfPE2wuT1MTCc3LMcanaF77ZykWh93fUu8whnI6GLIFVfPcBSJVNTzGSiQtchKVsRu2kiziQlOD44XH006ERR5INg"
                               :customer-email="user.email"
            >
            </stripe-buy-button>
            <stripe-buy-button v-else-if="product.price_fiat > 0 && product.price_fiat == 20"
                               buy-button-id="buy_btn_1PAaEuHruUfPE2wu6DXK5KYT"
                               publishable-key="pk_live_51PAXsOHruUfPE2wuT1MTCc3LMcanaF77ZykWh93fUu8whnI6GLIFVfPcBSJVNTzGSiQtchKVsRu2kiziQlOD44XH006ERR5INg"
                               :customer-email="user.email"
            >
            </stripe-buy-button>
            <stripe-buy-button v-else-if="product.price_fiat > 0 && product.price_fiat == 40"
                               buy-button-id="buy_btn_1PAaI3HruUfPE2wu9m6H5vGp"
                               publishable-key="pk_live_51PAXsOHruUfPE2wuT1MTCc3LMcanaF77ZykWh93fUu8whnI6GLIFVfPcBSJVNTzGSiQtchKVsRu2kiziQlOD44XH006ERR5INg"
                               :customer-email="user.email"
            >
            </stripe-buy-button>
            <stripe-buy-button v-else-if="product.price_fiat > 0 && product.price_fiat == 80"
                               buy-button-id="buy_btn_1PAaHCHruUfPE2wua82AVGzY"
                               publishable-key="pk_live_51PAXsOHruUfPE2wuT1MTCc3LMcanaF77ZykWh93fUu8whnI6GLIFVfPcBSJVNTzGSiQtchKVsRu2kiziQlOD44XH006ERR5INg"
                               :customer-email="user.email"
            >
            </stripe-buy-button>
            <stripe-buy-button v-else-if="product.price_fiat > 0 && product.price_fiat == 160"
                               buy-button-id="buy_btn_1PAaJKHruUfPE2wuU9Jq0Nu9"
                               publishable-key="pk_live_51PAXsOHruUfPE2wuT1MTCc3LMcanaF77ZykWh93fUu8whnI6GLIFVfPcBSJVNTzGSiQtchKVsRu2kiziQlOD44XH006ERR5INg"
                               :customer-email="user.email"
            >
            </stripe-buy-button>
            <a v-else-if="product.price_fiat > 0" class="flex cursor-pointer items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900">
              Próximamente
            </a>
            <a v-else @click="buyProduct(product.id, product.price_oro, product.price_plumas)" class="w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Comprar por <span v-html="getPrice(product)" />
            </a>
          </div>
        </div>
      </div>
    </section>
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
      storeDetails: null,
      showProductsModal: false,
      imageItemsReveal: false,
      videoNewItems: '/video/MadFenixLogoReveal.mp4',
      itemsPurchaseToShow: null,
      route: useRoute(),
      accountParameterToUrl: '',
    }
  },

  mounted() {
    useHead({
      title: 'Tienda - Mad Fénix',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Tienda en Mad Fénix.'
        }
      ],
      script: [
        {
          async: true,
          src: "https://js.stripe.com/v3/buy-button.js",
        }
      ]
    });
    this.setUserCookies();
    this.setBackground();

    this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';

    this.setConfigCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
    this.getStoreDetails()
  },

  computed: {
  },

  methods: {
    revealImageItems() {
      this.imageItemsReveal = true;
    },
    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
    },
    afterLogout(){
      Cookies.remove('token')
      Cookies.remove('user')
      this.user.setToken('')
      this.user.setUserToNull()
      this.user.removeUser()
      setTimeout(() => this.$router.push({ path: '/'+ this.accountParameterToUrl + 'login' }), 2000)
    },

    logout () {
      this.api('/api/host/logout', {
        method: 'POST'
      })
        .then(() => this.afterLogout())
        .catch(() => this.afterLogout())
    },

    afterStoreDetails(response) {
      this.storeDetails = response;
    },

    getStoreDetails() {
      this.api('/api/host/store/details', {
        method: 'GET'
      })
        .then((response) => this.afterStoreDetails(response))
        .catch(() => this.logout())
    },

    openNewItems(itemsPurchase) {
      if (itemsPurchase.nfts.length > 0) {
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
      } else {
        this.$router.push({ path: '/'+ this.accountParameterToUrl + 'perfil' })
      }

      this.getStoreDetails()
    },

    validateProduct(product_order) {
      this.api('/api/host/store/validateProductOrder', {
        method: 'POST',
        body: {product_order_id: product_order.id}
      })
        .then((response) => this.openNewItems(response))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error.message) : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error))
    },

    buyProduct(product_id, price_oro, price_plumas) {
      this.api('/api/host/store/addProductToOrder', {
        method: 'POST',
        body: {product_id: product_id}
      })
        .then((response) => {
          if (price_oro > 0 || price_plumas > 0) {
            this.validateProduct(response);
          }
        })
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error.message) : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error))
    },

    getPrice(product) {
      if (product.price_oro > 0) {
        return '<span class="text-size-token-store">' + product.price_oro + '</span> oros';
      } else {
        return '<span class="text-size-token-store">' + product.price_plumas + '</span> plumas';
      }
    },

     setConfigCookies() {
      let config = Cookies.get(this.accountParameterToUrl + '_config')
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
  },
}
</script>
