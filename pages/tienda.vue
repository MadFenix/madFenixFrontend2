<template>
    <div v-if="storeDetails && user">
      <!-- Case Study Hero -->
      <section class="px-4 py-12 md:py-16 sm:px-6 lg:px-8">
        <div class="max-w-screen-xl mx-auto">
          <!-- Hero text -->
          <div class="w-full max-w-3xl mx-auto text-center lg:max-w-5xl">
            <p
              class="inline-flex items-center justify-center px-6 py-2 text-sm font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r from-dark-600 to-dark-700"
            >
              Tienda
            </p>
            <h1
              class="mt-4 text-4xl font-extrabold text-white md:mt-5 sm:text-5xl md:text-6xl"
              v-html="'Pasa al siguiente nivel'"
            />
          </div>
        </div>
      </section>

      <!-- Buscamos creadores section -->
      <section class="max-w-screen-xl px-4 py-12 mx-auto md:py-16 sm:px-6 lg:px-8" v-if="storeDetails.products" v-for="product in storeDetails.products" :key="product.id">
        <!-- CTA card -->
        <div class="relative py-16 rounded-3xl bg-dark-700 lg:py-20">
          <!-- Right background diagonal -->
          <svg class="absolute inset-y-0 top-0 z-20 w-1/4 h-full right-1/4 text-dark-700" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
            <polygon points="0,0 100,0 0,100"></polygon>
          </svg>
          <div class="absolute inset-y-0 z-10 w-1/2 h-full left-1/2 bg-dark-800 rounded-r-3xl"></div>

          <!-- CTA content -->
          <div class="relative z-30 flex flex-col items-center justify-center px-4 mx-auto text-center sm:px-16 lg:flex-row lg:text-left">
            <div class="max-w-lg text-2xl font-bold sm:text-4xl lg:w-1/2">
              <h5 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                <span v-html="product.name" />
              </h5>
              <p class="text-white text-md" v-if="product.short_description" v-html="product.short_description" />
            </div>
            <div class="flex justify-center max-w-lg mt-10 lg:w-1/2 lg:mt-0 lg:justify-end">
              <div>
                <stripe-buy-button v-if="product.price_fiat > 0 && product.price_fiat == 5"
                   buy-button-id="buy_btn_1PAYYpHruUfPE2wuw5Mhazx8"
                   publishable-key="pk_live_51PAXsOHruUfPE2wuT1MTCc3LMcanaF77ZykWh93fUu8whnI6GLIFVfPcBSJVNTzGSiQtchKVsRu2kiziQlOD44XH006ERR5INg"
                   :customer-email="user.user.email"
                >
                </stripe-buy-button>
                <stripe-buy-button v-else-if="product.price_fiat > 0 && product.price_fiat == 10"
                  buy-button-id="buy_btn_1PAaDhHruUfPE2wuOkz0bx5C"
                  publishable-key="pk_live_51PAXsOHruUfPE2wuT1MTCc3LMcanaF77ZykWh93fUu8whnI6GLIFVfPcBSJVNTzGSiQtchKVsRu2kiziQlOD44XH006ERR5INg"
                  :customer-email="user.user.email"
                >
                </stripe-buy-button>
                <stripe-buy-button v-else-if="product.price_fiat > 0 && product.price_fiat == 20"
                  buy-button-id="buy_btn_1PAaEuHruUfPE2wu6DXK5KYT"
                  publishable-key="pk_live_51PAXsOHruUfPE2wuT1MTCc3LMcanaF77ZykWh93fUu8whnI6GLIFVfPcBSJVNTzGSiQtchKVsRu2kiziQlOD44XH006ERR5INg"
                  :customer-email="user.user.email"
                >
                </stripe-buy-button>
                <stripe-buy-button v-else-if="product.price_fiat > 0 && product.price_fiat == 40"
                  buy-button-id="buy_btn_1PAaI3HruUfPE2wu9m6H5vGp"
                  publishable-key="pk_live_51PAXsOHruUfPE2wuT1MTCc3LMcanaF77ZykWh93fUu8whnI6GLIFVfPcBSJVNTzGSiQtchKVsRu2kiziQlOD44XH006ERR5INg"
                  :customer-email="user.user.email"
                >
                </stripe-buy-button>
                <stripe-buy-button v-else-if="product.price_fiat > 0 && product.price_fiat == 80"
                  buy-button-id="buy_btn_1PAaHCHruUfPE2wua82AVGzY"
                  publishable-key="pk_live_51PAXsOHruUfPE2wuT1MTCc3LMcanaF77ZykWh93fUu8whnI6GLIFVfPcBSJVNTzGSiQtchKVsRu2kiziQlOD44XH006ERR5INg"
                  :customer-email="user.user.email"
                >
                </stripe-buy-button>
                <stripe-buy-button v-else-if="product.price_fiat > 0 && product.price_fiat == 160"
                  buy-button-id="buy_btn_1PAaJKHruUfPE2wuU9Jq0Nu9"
                  publishable-key="pk_live_51PAXsOHruUfPE2wuT1MTCc3LMcanaF77ZykWh93fUu8whnI6GLIFVfPcBSJVNTzGSiQtchKVsRu2kiziQlOD44XH006ERR5INg"
                  :customer-email="user.user.email"
                >
                </stripe-buy-button>
                <a v-else-if="product.price_fiat > 0" class="flex cursor-pointer items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900">
                  Próximamente
                </a>
                <a v-else @click="buyProduct(product.id, product.price_oro)" class="flex cursor-pointer items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900">
                  Comprar por <span class="ml-2" /><span class="ml-2" v-html="product.price_oro + ' oros'" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";
import Cookies from "js-cookie";

export default {
  middleware: 'auth',

  head: {
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
  },

  data(){
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      storeDetails: null,
    }
  },

  mounted() {
    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
    this.getStoreDetails()
  },

  computed: {
  },

  methods: {
    afterLogout(){
      Cookies.remove('token')
      Cookies.remove('user')
      this.user.setToken('')
      this.user.setUserToNull()
      this.user.removeUser()
      setTimeout(() => this.$router.push({ path: '/login' }), 2000)
    },

    logout () {
      this.api('/api/logout', {
        method: 'POST'
      })
        .then(() => this.afterLogout())
        .catch(() => this.afterLogout())
    },

    afterStoreDetails(response) {
      this.storeDetails = response;
    },

    getStoreDetails() {
      this.api('/api/store/details', {
        method: 'GET'
      })
        .then((response) => this.afterStoreDetails(response))
        .catch(() => this.logout())
    },

    validateProduct(product_order) {
      this.api('/api/store/validateProductOrder', {
        method: 'POST',
        body: {product_order_id: product_order.id}
      })
        .then(() => this.$router.push({ path: '/perfil' }))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
    },

    buyProduct(product_id, price_oro) {
      this.api('/api/store/addProductToOrder', {
        method: 'POST',
        body: {product_id: product_id}
      })
        .then((response) => {
          if (price_oro > 0) {
            this.validateProduct(response);
          }
        })
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
    },

    setUserCookies() {
      let token = Cookies.get('token')
      if (token) {
        this.user.setToken(token);

        //let user = document.cookie.match(new RegExp('(^| )user=([^;]+)'))
        let user = Cookies.get('user')

        if (user) {
          this.user.updateUser(user);
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
