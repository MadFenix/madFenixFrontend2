<template>
    <div v-if="user.user && perfil">
      <div class="md:grid md:grid-cols-3 md:items-center border-y-2 border-madfenix-naranja bg-madfenix-gris">
        <div class="col-span-1 h-full">
          <img src="/img/perfil/tiefling_bard.png" alt="Avatar perfil Mad Fénix" title="Avatar perfil Mad Fénix" class="h-full" />
        </div>

        <div class="text-right col-span-1 px-6">
          <div v-html="'@' + user.user.name" class="text-sm lg:text-xl font-black text-madfenix-naranja my-3" />
          <div v-html="user.user.email" class="text-sm lg:text-xl text-white my-3" />
          <div class="flex space-x-3 justify-end my-3">
            <div v-if="perfil && perfil.user_twitch" class="flex items-center space-x-3 text-white text-center">
              <a @click="desconectarTwitch()" class="cursor-pointer">
                <img src="/img/perfil/twitch_account.svg" alt="Desconectar Twitch" title="Desconectar Twitch" class="w-[50px] lg:w-[70px]">
              </a>
              <span v-html="perfil.user_twitch" />
            </div>
            <div v-else>
              <a :href="'https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=2wbjjwkzyy9t68a8ex5b4fsz7kfc37&redirect_uri=https%3A%2F%2Fapi.madfenix.com%2Fapi%2Ftwitch%2FconnectAccount&scope=user%3Aread%3Aemail&state=user' + user.user.id" class="cursor-pointer">
                <img src="/img/perfil/twitch_account.svg" alt="Conectar Twitch" title="Conectar Twitch" class="w-[50px] lg:w-[70px]">
              </a>
            </div>

            <div>
              <a @click="logout()" class="cursor-pointer">
                <img src="/img/perfil/logout.svg" alt="Logout" title="Logout" class="w-[50px] lg:w-[70px]">
              </a>
            </div>
          </div>
        </div>

        <div class="col-span-1 px-6">
          <div v-if="perfil && perfil.hedera_wallet" class="my-4 w-full text-white text-center text-sm lg:text-xl">
            Tu cartera de hedera vinculada: <span v-html="perfil.hedera_wallet" />.&nbsp;
          </div>
          <div v-else-if="perfil && perfil.hedera_wallet_check" class="my-4">
            <nuxt-link to="/vincular-wallet-hedera-2"  class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Vincular hedera
            </nuxt-link>
          </div>
          <div v-else class="my-4">
            <nuxt-link to="/vincular-wallet-hedera"  class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Vincular hedera
            </nuxt-link>
          </div>

          <div v-if="perfil && perfil.referred_code_from" class="my-4 w-full text-white text-center text-sm lg:text-xl">
            Tu referido: <span v-html="perfil.referred_code_from" />.&nbsp;
          </div>
          <div v-else class="my-4">
            <nuxt-link to="/vincular-codigo-referido"  class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Vincular código de referido
            </nuxt-link>
          </div>

          <div v-if="perfil && perfil.referred_code" class="my-4 w-full text-white text-center text-sm lg:text-xl">
            Tu código de referido: <span v-html="perfil.referred_code" />.&nbsp;
          </div>
          <div v-else class="my-4">
            <nuxt-link to="/crear-codigo-referido"  class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Crear código de referido
            </nuxt-link>
          </div>

          <div v-if="perfil && perfil.user_steam" class="my-4 w-full text-white text-center hidden text-sm lg:text-xl">
            Conectad@ con <span v-html="perfil.user_steam" />.&nbsp;
            <a @click="desconectarSteam()" class="text-white underline font-semibold hover:no-underline">
              Desconectar Steam
            </a>
          </div>
          <div v-else class="my-4 hidden text-sm lg:text-xl">
            <a @click="conectarSteam()" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Conectar Steam
            </a>
          </div>

          <div class="my-4">
            <nuxt-link to="/eliminar-cuenta" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Eliminar cuenta
            </nuxt-link>
          </div>
        </div>
      </div>

      <section class="max-w-screen-xl px-4 py-7 pt-12 mx-auto md:py-7 md:pt-16 sm:px-6 lg:px-8">
        <div class="relative z-30 grid grid-cols-1 sm:grid-cols-12 items-center justify-center mx-auto text-center px-4 sm:px-16 lg:flex-row lg:text-left">
          <div class="sm:col-span-3 flex items-center py-6 sm:py-0 px-12 h-full text-2xl font-bold sm:text-4xl rounded-tr-3xl sm:rounded-tr-none rounded-tl-3xl sm:rounded-bl-3xl bg-madfenix-gris">
            <h5 class="font-extrabold tracking-tight text-white text-size-token-number text-center w-full">
              <span v-if="perfil" v-html="perfil.oro" /><span v-else>...</span>
              <p v-if="perfil && perfil.oro_hedera" v-html="perfil.oro_hedera + ' RED'" class="mt-4 text-xl" />
            </h5>
          </div>
          <div class="sm:col-span-2 flex items-center justify-center bg-madfenix-azul">
            <img src="/img/perfil/oro.png" alt="Oro" class="absolute z-50 h-1/2 sm:h-full" />
            <svg class="inset-y-0 z-40 h-full text-madfenix-gris" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
          </div>
          <div class="sm:col-span-7 px-3 sm:px-0 py-3 sm:py-0 flex space-x-3 items-center justify-center h-full bg-madfenix-azul sm:rounded-tr-3xl rounded-bl-3xl sm:rounded-bl-none rounded-br-3xl sm:mr-12 lg:justify-end">
            <h5 class="grow font-extrabold tracking-tight text-white text-size-token">
              Oros
            </h5>
            <div class="botones-tokens">
              <nuxt-link to="/canjear-cupon-oro" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                Canjea un cupón
              </nuxt-link>
              <br>
              <nuxt-link to="/transfiere-oro-a-hedera-previo1" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                Transfiere Oro
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-screen-xl px-4 py-7 mx-auto md:py-7 sm:px-6 lg:px-8">
        <div class="relative z-30 grid grid-cols-1 sm:grid-cols-12 items-center justify-center mx-auto text-center px-4 sm:px-16 lg:flex-row lg:text-left">
          <div class="sm:col-span-3 flex items-center py-6 sm:py-0 px-12 h-full text-2xl font-bold sm:text-4xl rounded-tr-3xl sm:rounded-tr-none rounded-tl-3xl sm:rounded-bl-3xl bg-madfenix-gris">
            <h5 class="font-extrabold tracking-tight text-white text-size-token-number text-center w-full">
              <span v-if="perfil" v-html="perfil.plumas" /><span v-else>...</span>
              <p v-if="perfil && perfil.plumas_hedera" v-html="perfil.plumas_hedera + ' RED'" class="mt-4 text-xl" />
            </h5>
          </div>
          <div class="sm:col-span-2 flex items-center justify-center bg-madfenix-azul">
            <img src="/img/perfil/pluma.png" alt="Plumas" class="absolute z-50 h-1/2 sm:h-full" />
            <svg class="inset-y-0 z-40 h-full text-madfenix-gris" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
          </div>
          <div class="sm:col-span-7 px-3 sm:px-0 py-3 sm:py-0 flex items-center space-x-3 justify-center h-full bg-madfenix-azul sm:rounded-tr-3xl rounded-bl-3xl sm:rounded-bl-none rounded-br-3xl sm:mr-12 lg:justify-end">
            <h5 class="grow font-extrabold tracking-tight text-white text-size-token">
              Plumas
            </h5>
            <div class="botones-tokens">
              <nuxt-link to="/canjear-cupon" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                Canjea un cupón
              </nuxt-link>
              <br>
              <nuxt-link to="/transfiere-plumas-a-hedera-previo1" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                Transfiere Plumas
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-screen-xl px-4 py-7 pb-12 mx-auto md:py-7 md:pb-16 sm:px-6 lg:px-8">
        <div class="relative z-30 grid grid-cols-1 sm:grid-cols-12 items-center justify-center mx-auto text-center px-4 sm:px-16 lg:flex-row lg:text-left">
          <div class="sm:col-span-3 flex items-center py-6 sm:py-0 px-12 h-full text-2xl font-bold sm:text-4xl rounded-tr-3xl sm:rounded-tr-none rounded-tl-3xl sm:rounded-bl-3xl bg-madfenix-gris">
            <h5 class="font-extrabold tracking-tight text-white text-size-token-number text-center w-full">
              <span v-html="pollsNotAnswered" />
            </h5>
          </div>
          <div class="sm:col-span-2 flex items-center justify-center bg-madfenix-azul">
            <img src="/img/perfil/adivinacion.png" alt="Influye" class="absolute z-50 h-1/2 sm:h-full" />
            <svg class="inset-y-0 z-40 h-full text-madfenix-gris" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
          </div>
          <div class="sm:col-span-7 px-3 sm:px-0 py-3 sm:py-0 flex items-center space-x-3 justify-center h-full bg-madfenix-azul sm:rounded-tr-3xl rounded-bl-3xl sm:rounded-bl-none rounded-br-3xl sm:mr-12 lg:justify-end">
            <h5 class="grow font-extrabold tracking-tight text-white text-size-token">
              Destino
            </h5>
            <div class="botones-tokens">
              <nuxt-link to="/influye" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                Influye en Névoran
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <div class="w-full" v-if="nftCollections" v-for="nftCollection in nftCollections" :key="nftCollection.nft_id">
        <div class="relative rounded-tl-3xl rounded-br-3xl min-h-[300px] mx-3 mt-12 sm:mx-auto sm:w-2/3 bg-madfenix-gris border border-madfenix-naranja overflow-hidden">
          <img :src="nftCollection.featured_image" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -40%);" />
          <div class="relative min-h-[300px] mb-0 p-6 z-50">
            &nbsp;
          </div>
        </div>
        <div class="relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios">
          <div class="flex justify-center">
            <div class="contenedor-boton-right-formularios">
              <NuxtLink
                  :to="'/coleccion/?nft_id=' + nftCollection.nft_id"
                  class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer"
                  v-html="nftCollection.name + ' (' + countNFTsByid(nftCollection.nft_id) + ')'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { usePollsStore } from '../stores/polls'
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";
import Cookies from "js-cookie";

export default {
  middleware: 'auth',

  data() {
    return {
      polls: usePollsStore(),
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
    if (this.user.token) {
      this.polls.fetchPolls();
    }
    this.setBackground();

    const { $api } = useNuxtApp();
    this.api = $api;
    this.getPerfil()
  },

  computed: {
    nftCollections() {
      let collections = [];
      if (this.perfil && this.perfil.nfts) {
        for (let i = 0; i < this.perfil.nfts.length; i++) {
          if (!collections.some(obj => obj.nft_id === this.perfil.nfts[i].nft_id)) {
            collections.push({
              nft_id: this.perfil.nfts[i].nft_id,
              name: this.perfil.nfts[i].nft.name,
              short_description: this.perfil.nfts[i].nft.short_description,
              portrait_image: this.perfil.nfts[i].nft.portrait_image,
              featured_image: this.perfil.nfts[i].nft.featured_image,
            });
          }
        }
      }
      if (this.perfil && this.perfil.nfts_hedera) {
        for (let i = 0; i < this.perfil.nfts_hedera.length; i++) {
          if (!collections.some(obj => obj.nft_id === this.perfil.nfts_hedera[i].nft_id)) {
            collections.push({
              nft_id: this.perfil.nfts_hedera[i].nft_id,
              name: this.perfil.nfts_hedera[i].nft.name,
              short_description: this.perfil.nfts_hedera[i].nft.short_description,
              portrait_image: this.perfil.nfts_hedera[i].nft.portrait_image,
              featured_image: this.perfil.nfts_hedera[i].nft.featured_image,
            });
          }
        }
      }

      return collections;
    },

    pollsNotAnswered () {
      let pollsNotAnswered = 0;
      if (this.polls.polls) {
        for (let i = 0; i < this.polls.polls.length; i++) {
          if (!this.polls.polls[i].userAnswer) {
            pollsNotAnswered++;
          }
        }
      }

      return pollsNotAnswered;
    },
  },

  methods: {
    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
    },

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
      let confirmDisconnect = confirm('¿Estás seguro que quieres desconectar tu cuenta de Twitch?');

      if (confirmDisconnect) {
        this.api('/api/twitch/disconnectTwitch', {
          method: 'POST'
        })
            .then((response) => this.getPerfil())
            .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
      }
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

    countNFTsByid(nft_id) {
      let counted = 0;
      if (this.perfil && this.perfil.nfts) {
        for (let i = 0; i < this.perfil.nfts.length; i++) {
          if (this.perfil.nfts[i].nft_id == nft_id) {
            counted += 1;
          }
        }
      }
      if (this.perfil && this.perfil.nfts_hedera) {
        for (let i = 0; i < this.perfil.nfts_hedera.length; i++) {
          if (this.perfil.nfts_hedera[i].nft_id == nft_id) {
            counted += 1;
          }
        }
      }
      return counted;
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
