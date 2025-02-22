<template>
    <div v-if="user.user">
      <!-- Case Study Hero -->
      <section class="px-4 py-12 md:py-16 sm:px-6 lg:px-8" v-if="user.user">
        <div class="max-w-screen-xl mx-auto">
          <!-- Hero text -->
          <div class="w-full max-w-3xl mx-auto text-center lg:max-w-5xl">
            <p
              class="inline-flex items-center justify-center px-6 py-2 text-sm font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r from-dark-600 to-dark-700"
            >
              Perfil
            </p>
            <h1
              class="mt-4 text-4xl font-extrabold text-white md:mt-5 sm:text-5xl md:text-6xl"
              v-html="user.user.name"
            />
            <div class="w-full mx-auto lg:w-4/5">
              <p class="text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight mt-4" v-html="user.user.email" />
            </div>
          </div>
        </div>
      </section>

      <div v-if="perfil && perfil.hedera_wallet" class="my-4 w-full text-white text-center">
        Tu cartera de hedera vinculada: <span v-html="perfil.hedera_wallet" />.&nbsp;
      </div>
      <div v-else-if="perfil && perfil.hedera_wallet_check" class="my-4">
        <nuxt-link to="/vincular-wallet-hedera-2"  class="flex items-center w-2/3 md:w-1/3 m-auto justify-center px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
           Vincular cartera de hedera
        </nuxt-link>
      </div>
      <div v-else class="my-4">
        <nuxt-link to="/vincular-wallet-hedera"  class="flex items-center w-2/3 md:w-1/3 m-auto justify-center px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
           Vincular cartera de hedera
        </nuxt-link>
      </div>

      <div v-if="perfil && perfil.referred_code_from" class="my-4 w-full text-white text-center">
        Tu referido: <span v-html="perfil.referred_code_from" />.&nbsp;
      </div>
      <div v-else class="my-4">
        <nuxt-link to="/vincular-codigo-referido"  class="flex items-center w-2/3 md:w-1/3 m-auto justify-center px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
           Vincular código de referido
        </nuxt-link>
      </div>

      <div v-if="perfil && perfil.referred_code" class="my-4 w-full text-white text-center">
        Tu código de referido: <span v-html="perfil.referred_code" />.&nbsp;
      </div>
      <div v-else class="my-4">
        <nuxt-link to="/crear-codigo-referido"  class="flex items-center w-2/3 md:w-1/3 m-auto justify-center px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
          Crear código de referido
        </nuxt-link>
      </div>

      <div v-if="perfil && perfil.user_twitch" class="my-4 w-full text-white text-center">
        Conectad@ con <span v-html="perfil.user_twitch" />.&nbsp;
        <a @click="desconectarTwitch()" class="text-white underline font-semibold hover:no-underline">
          Desconectar Twitch
        </a>
      </div>
      <div v-else class="my-4">
        <a :href="'https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=2wbjjwkzyy9t68a8ex5b4fsz7kfc37&redirect_uri=https%3A%2F%2Fapi.madfenix.com%2Fapi%2Ftwitch%2FconnectAccount&scope=user%3Aread%3Aemail&state=user' + user.id" class="flex items-center w-2/3 md:w-1/3 m-auto justify-center px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
          Conectar Twitch
        </a>
      </div>

      <div v-if="perfil && perfil.user_steam" class="my-4 w-full text-white text-center hidden">
        Conectad@ con <span v-html="perfil.user_steam" />.&nbsp;
        <a @click="desconectarSteam()" class="text-white underline font-semibold hover:no-underline">
          Desconectar Steam
        </a>
      </div>
      <div v-else class="my-4 hidden">
        <a @click="conectarSteam()" class="flex items-center w-2/3 md:w-1/3 m-auto justify-center px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
          Conectar Steam
        </a>
      </div>

      <div class="my-4">
        <a @click="logout()" class="flex items-center w-2/3 md:w-1/3 m-auto justify-center px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
          Logout
        </a>
      </div>

      <!-- Buscamos creadores section -->
      <section class="max-w-screen-xl px-4 py-12 mx-auto md:py-16 sm:px-6 lg:px-8">
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
                Plumas: <span v-if="perfil" v-html="perfil.plumas" /><span v-else>...</span>
              </h5>
            </div>
            <div class="flex justify-center max-w-lg mt-10 lg:w-1/2 lg:mt-0 lg:justify-end">
              <div>
                <nuxt-link to="/canjear-cupon" class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
                  Canjea un cupón
                </nuxt-link>
                <br>
                <nuxt-link to="/transfiere-plumas-a-hedera" class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
                  Transfiere Plumas
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-screen-xl px-4 py-12 mx-auto md:py-16 sm:px-6 lg:px-8">
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
                Oro: <span v-if="perfil" v-html="perfil.oro" /><span v-else>...</span>
              </h5>
            </div>
            <div class="flex justify-center max-w-lg mt-10 lg:w-1/2 lg:mt-0 lg:justify-end">
              <div>
                <nuxt-link to="/canjear-cupon-oro" class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
                  Canjea un cupón
                </nuxt-link>
                <br>
                <nuxt-link to="/transfiere-oro-a-hedera" class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
                  Transfiere Oro
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div v-if="perfil">
        <section v-for="nft in perfil.nfts" :key="nft.id" class="max-w-screen-xl px-4 py-12 mx-auto md:py-16 sm:px-6 lg:px-8">
          <!-- CTA card -->
          <div class="relative py-16 rounded-3xl bg-dark-700 lg:py-20">
            <!-- Right background diagonal -->
            <svg class="absolute inset-y-0 top-0 z-20 w-1/4 h-full right-1/4 text-dark-700" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
            <div class="absolute inset-y-0 z-10 w-1/2 h-full left-1/2 bg-dark-800 rounded-r-3xl"></div>

            <!-- CTA content -->
            <div class="relative z-30 flex flex-col items-center justify-center px-4 mx-auto text-center sm:px-16 lg:flex-row lg:text-left">
              <div class="max-w-lg flex items-center space-x-3 text-2xl font-bold sm:text-4xl lg:w-1/2">
                <img :src="nft.image" width="80px" :alt="nft.name" />
                <h5 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  <span v-html="nft.name" />
                </h5>
              </div>
              <div class="flex justify-center max-w-lg mt-10 lg:w-1/2 lg:mt-0 lg:justify-end">
                <div>
                  <nuxt-link :to="'/transfiere-item-a-hedera/?item_identification_id=' + nft.id + '&nft_token_id=' + nft.nft.token_props + '.' + nft.nft.token_realm + '.' + nft.nft.token_number" class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
                    Transfiere el Ítem
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section v-for="nft in perfil.nfts_hedera" :key="nft.id" class="max-w-screen-xl px-4 py-12 mx-auto md:py-16 sm:px-6 lg:px-8">
          <!-- CTA card -->
          <div class="relative py-16 rounded-3xl bg-dark-700 lg:py-20">
            <!-- Right background diagonal -->
            <svg class="absolute inset-y-0 top-0 z-20 w-1/4 h-full right-1/4 text-dark-700" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
            <div class="absolute inset-y-0 z-10 w-1/2 h-full left-1/2 bg-dark-800 rounded-r-3xl"></div>

            <!-- CTA content -->
            <div class="relative z-30 flex flex-col items-center justify-center px-4 mx-auto text-center sm:px-16 lg:flex-row lg:text-left">
              <div class="max-w-lg flex items-center space-x-3 text-2xl font-bold sm:text-4xl lg:w-1/2">
                <img :src="nft.image" width="80px" :alt="nft.name" />
                <h5 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  <span v-html="nft.name" />
                </h5>
              </div>
              <div class="flex justify-center text-white max-w-lg mt-10 lg:w-1/2 lg:mt-0 lg:justify-end">
                <div>
                  En hedera
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="flex items-center py-5 text-white justify-center">
        <nuxt-link to="/eliminar-cuenta" class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
          Eliminar cuenta
        </nuxt-link>
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
      perfil: null,
    }
  },

  mounted() {
    useHead({
      title: 'Perfil - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Perfil en Mad Fénix Games.'
        }
      ]
    });

    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
    this.getPerfil()
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

    afterPerfil(response) {
      this.perfil = response;
    },

    getPerfil() {
      this.api('/api/profile/getUserProfile', {
        method: 'POST'
      })
        .then((response) => this.afterPerfil(response))
        .catch(() => this.logout())
    },

    desconectarTwitch() {
      this.api('/api/twitch/disconnectTwitch', {
        method: 'POST'
      })
        .then((response) => this.getPerfil())
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
    },

    desconectarSteam() {
      this.api('/api/steam/disconnectSteam', {
        method: 'POST'
      })
        .then((response) => this.getPerfil())
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
    },

    conectarSteam() {
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
