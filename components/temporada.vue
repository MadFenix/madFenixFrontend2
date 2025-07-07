<template>
    <div v-if="seasonDetails && user">
      <h1 :class="`text-[color:var(--naranja)] w-full text-center py-12`"><span v-html="user.config?.theme?.title_season ?? 'Season'" /></h1>
      <div :class="`relative rounded-tl-3xl rounded-br-3xl min-h-[300px] mx-3 sm:m-auto sm:w-2/3 border border-[color:var(--blanco)] bg-[color:var(--gris)] overflow-hidden`">
        <img :src="user.config?.theme?.icon_rewards_pass ?? 'https://reports.madfenix.com/welore/demo-assets/rewards-pass/header2.png'" :class="`absolute`" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -40%);" />
        <div :class="`relative min-h-[300px] mb-0 p-6 z-50`">
          <div :class="`absolute w-full bottom-0 px-12 py-3`">
            <div :class="`flex items-end justify-end`">
              <h2
                  :class="`mt-4 text-4xl font-extrabold text-[color:var(--blanco)] md:mt-5 sm:text-5xl md:text-6xl title-season`"
                  v-html="seasonDetails.name"
              />
            </div>
          </div>
        </div>
      </div>
      <div :class="`relative mx-3 sm:m-auto sm:w-2/3`">
        <div :class="`flex items-end justify-end title-season`">
          <p :class="`text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight mt-4`" v-html="(user.config?.theme?.title_season_level ?? 'Level') + ': ' + (seasonDetails.user_season_level?? 0) + '&nbsp;&nbsp;&nbsp;'" />
          <p :class="`text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight mt-4`" v-html="(user.config?.theme?.title_season_points ?? 'Points') + ': ' + (seasonDetails.user_season_points?? 0) + '&nbsp;&nbsp;&nbsp;'" />
          <p :class="`text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight mt-4`" v-html="(user.config?.theme?.title_season_premium ?? 'Premium') + ': ' + (seasonDetails.user_season_premium? 'Si' : 'No')" />
        </div>
      </div>

      <div :class="`grid grid-cols-1 sm:grid-cols-2 gap-12 mx-3 xl:mx-auto xl:w-2/3 mt-12`">
        <div v-if="seasonDetails.seasonRewards" v-for="seasonReward in seasonDetails.seasonRewards" :key="seasonReward.id">
          <div :class="`relative rounded-tr-3xl rounded-bl-3xl border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
            <div :class="`p-6 pt-[50px] pb-[70px] relative z-50`">
              <div :class="`font-extrabold tracking-tight text-[color:var(--naranja)] w-full text-center lvl-season-reward`">
                <span v-html="user.config?.theme?.title_season_level ?? 'Level'" />: <span v-html="seasonReward.level" />
              </div>
              <div :class="`text-4xl min-h-[150px] tracking-tight text-[color:var(--blanco)] sm:text-3xl w-full text-center`">
                <span :class="`text-2xl sm:text-3xl`" v-html="seasonReward.required_points + ' ' + (user.config?.theme?.title_season_points ?? 'Points')" /><br>
                <span :class="`font-extrabold`">Premio:</span><br>
                <span v-if="seasonReward.oro" v-html="seasonReward.oro + ' ' + (user.config?.theme?.title_coin_premium ?? 'Oro')" /><span v-if="seasonReward.plumas" v-html="seasonReward.plumas + ' ' + (user.config?.theme?.title_coin_free ?? 'Plata')" /><span v-if="seasonReward.nft" v-html="'1 Ítem ' + seasonReward.nft.name + '. Límite: '" /><span v-if="seasonReward.max_nft_rewards" v-html="seasonReward.max_nft_rewards" /><span v-if="seasonReward.custom_reward" v-html="seasonReward.custom_reward" />
              </div>
            </div>
          </div>
          <div :class="`relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios`">
            <div :class="`flex justify-center`">
              <div :class="`grow`">
                &nbsp;
              </div>

              <!-- Botón: Siguiente paso -->
              <div :class="`contenedor-boton-right-formularios`">
                <a v-if="seasonReward.redeemed" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 border-[color:var(--naranja)] border-2`">
                  Canjeado
                </a>
                <a v-else-if="seasonReward.required_points < seasonDetails.user_season_points && !(seasonDetails.user_season_premium > 0) && !(seasonReward.level == 1 || seasonReward.level == 5 || seasonReward.level == 10 || seasonReward.level == 15 || seasonReward.level == 20)" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 border-[color:var(--naranja)] border-2`">
                  Necesitas el pase premium
                </a>
                <a v-else-if="seasonReward.required_points < seasonDetails.user_season_points" @click="canjearPremio(seasonReward.level)" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
                  Canjea el premio
                </a>
                <a v-else :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 border-[color:var(--naranja)] border-2`">
                  Por desbloquear
                </a>
              </div>

              <div :class="`grow`">
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

    this.setUserCookies();
    this.setBackground();

    if (window.location.hostname == 'our.welore.io' || window.location.hostname == 'localhost') {
        this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';
      } else {
        this.accountParameterToUrl = '';
      }

    this.setConfigCookies();

    useHead({
      title: 'Temporada - ' + this.user.config?.config?.name_ecosystem ?? '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Temporada en ' + this.user.config?.config?.name_ecosystem ?? ''
        }
      ]
    });

    const { $api } = useNuxtApp();
    this.api = $api;
    this.getSeasonDetails()
  },

  computed: {
  },

  methods: {
    setBackground () {
      if (window.location.hostname == 'madfenix.com') {
        document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";

      }
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
  },
}
</script>
