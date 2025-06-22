<template>
    <div v-if="seasonDetails && user">
      <h1 class="text-madfenix-naranja w-full text-center py-12">Temporada</h1>
      <div class="relative rounded-tl-3xl rounded-br-3xl min-h-[300px] mx-3 sm:m-auto sm:w-2/3 border border-madfenix-blanco bg-madfenix-gris overflow-hidden">
        <img src="/img/el-luchador/portada.jpg" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -40%);" />
        <div class="relative min-h-[300px] mb-0 p-6 z-50">
          <div class="absolute w-full bottom-0 px-12 py-3">
            <div class="flex items-end justify-end">
              <h2
                  class="mt-4 text-4xl font-extrabold text-madfenix-blanco md:mt-5 sm:text-5xl md:text-6xl title-season"
                  v-html="seasonDetails.name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="relative mx-3 sm:m-auto sm:w-2/3">
        <div class="flex items-end justify-end title-season">
          <p class="text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight mt-4" v-html="'Nivel: ' + (seasonDetails.user_season_level?? 0) + '&nbsp;&nbsp;&nbsp;'" />
          <p class="text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight mt-4" v-html="'Puntos: ' + (seasonDetails.user_season_points?? 0) + '&nbsp;&nbsp;&nbsp;'" />
          <p class="text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight mt-4" v-html="'Premium: ' + (seasonDetails.user_season_premium? 'Si' : 'No')" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-12 mx-3 sm:mx-auto sm:w-2/3 mt-12">
        <div v-if="seasonDetails.seasonRewards" v-for="seasonReward in seasonDetails.seasonRewards" :key="seasonReward.id">
          <div class="relative rounded-tr-3xl rounded-bl-3xl border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
            <div class="p-6 pt-[50px] pb-[70px] relative z-50">
              <div class="font-extrabold tracking-tight text-madfenix-naranja w-full text-center lvl-season-reward">
                Nivel: <span v-html="seasonReward.level" />
              </div>
              <div class="text-4xl min-h-[200px] tracking-tight text-madfenix-blanco sm:text-5xl w-full text-center">
                <span class="text-2xl sm:text-3xl" v-html="seasonReward.required_points + ' puntos'" /><br>
                <span class="font-extrabold">Premio:</span><br>
                <span v-if="seasonReward.oro" v-html="seasonReward.oro + ' oros'" /><span v-if="seasonReward.plumas" v-html="seasonReward.plumas + ' plumas'" /><span v-if="seasonReward.nft" v-html="'1 Ítem ' + seasonReward.nft.name + '. Límite: '" /><span v-if="seasonReward.max_nft_rewards" v-html="seasonReward.max_nft_rewards" /><span v-if="seasonReward.custom_reward" v-html="seasonReward.custom_reward" />
              </div>
            </div>
          </div>
          <div class="relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios">
            <div class="flex justify-center">
              <div class="grow">
                &nbsp;
              </div>

              <!-- Botón: Siguiente paso -->
              <div class="contenedor-boton-right-formularios">
                <a v-if="seasonReward.redeemed" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 border-madfenix-naranja border-2">
                  Canjeado
                </a>
                <a v-else-if="seasonReward.required_points < seasonDetails.user_season_points && !(seasonDetails.user_season_premium > 0) && !(seasonReward.level == 1 || seasonReward.level == 5 || seasonReward.level == 10 || seasonReward.level == 15 || seasonReward.level == 20)" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 border-madfenix-naranja border-2">
                  Necesitas el pase premium
                </a>
                <a v-else-if="seasonReward.required_points < seasonDetails.user_season_points" @click="canjearPremio(seasonReward.level)" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                  Canjea el premio
                </a>
                <a v-else class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 border-madfenix-naranja border-2">
                  Por desbloquear
                </a>
              </div>

              <div class="grow">
                &nbsp;
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

export default {
  middleware: 'auth',

  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      seasonDetails: null,
      route: useRoute(),
      accountParameterToUrl: '',
    }
  },

  mounted() {
    useHead({
      title: 'Temporada - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Temporada en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();
    this.setBackground();

    this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';

    this.setConfigCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
    this.getSeasonDetails()
  },

  computed: {
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
      setTimeout(() => this.$router.push({ path: '/'+ this.accountParameterToUrl + 'login' }), 2000)
    },

    logout () {
      this.api('/api/host/logout', {
        method: 'POST'
      })
        .then(() => this.afterLogout())
        .catch(() => this.afterLogout())
    },

    afterSeasonDetails(response) {
      this.seasonDetails = response;
    },

    getSeasonDetails() {
      this.api('/api/host/season/seasonDetails', {
        method: 'GET'
      })
        .then((response) => this.afterSeasonDetails(response))
        .catch(() => this.logout())
    },

    canjearPremio(level) {
      this.api('/api/host/season/redeemSeasonLvl', {
        method: 'POST',
        body: {level: level}
      })
        .then(() => this.getSeasonDetails())
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error.message) : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error))
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
