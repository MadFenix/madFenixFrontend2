<template>
    <div v-if="seasonDetails && user">
      <!-- Case Study Hero -->
      <section class="px-4 py-12 md:py-16 sm:px-6 lg:px-8">
        <div class="max-w-screen-xl mx-auto">
          <!-- Hero text -->
          <div class="w-full max-w-3xl mx-auto text-center lg:max-w-5xl">
            <p
              class="inline-flex items-center justify-center px-6 py-2 text-sm font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r from-dark-600 to-dark-700"
            >
              Temporada
            </p>
            <h1
              class="mt-4 text-4xl font-extrabold text-white md:mt-5 sm:text-5xl md:text-6xl"
              v-html="seasonDetails.name"
            />
            <div class="w-full mx-auto lg:w-4/5">
              <p class="text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight mt-4" v-html="'Nivel: ' + (seasonDetails.user_season_level?? 0)" />
              <p class="text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight mt-4" v-html="'Puntos: ' + (seasonDetails.user_season_points?? 0)" />
              <p class="text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight mt-4" v-html="'Premium: ' + (seasonDetails.user_season_premium? 'Si' : 'No')" />
            </div>
          </div>
        </div>
      </section>

      <!-- Buscamos creadores section -->
      <section class="max-w-screen-xl px-4 py-12 mx-auto md:py-16 sm:px-6 lg:px-8" v-if="seasonDetails.seasonRewards" v-for="seasonReward in seasonDetails.seasonRewards" :key="seasonReward.id">
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
                Nivel: <span v-html="seasonReward.level" />
              </h5>
              <h5 class="text-2xl font-extrabold tracking-tight text-white sm:text-2xl">
                Premio: <span v-if="seasonReward.oro" v-html="seasonReward.oro + ' oro'" /><span v-if="seasonReward.plumas" v-html="seasonReward.plumas + ' pluma'" /><span v-if="seasonReward.nft" v-html="'1 Ítem ' + seasonReward.nft.name + '. Límite: '" /><span v-if="seasonReward.max_nft_rewards" v-html="seasonReward.max_nft_rewards" /><span v-if="seasonReward.custom_reward" v-html="seasonReward.custom_reward" />
              </h5>
            </div>
            <div class="flex justify-center max-w-lg mt-10 lg:w-1/2 lg:mt-0 lg:justify-end">
              <div>
                <a v-if="seasonReward.redeemed" class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900">
                  Canjeado
                </a>
                <a v-else-if="seasonReward.required_points < seasonDetails.user_season_points && !(seasonDetails.user_season_premium > 0) && !(seasonReward.level == 1 || seasonReward.level == 5 || seasonReward.level == 10 || seasonReward.level == 15 || seasonReward.level == 20)" class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900">
                  Necesitas el pase premium
                </a>
                <a v-else-if="seasonReward.required_points < seasonDetails.user_season_points" @click="canjearPremio(seasonReward.level)" class="flex cursor-pointer items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
                  Canjea el premio
                </a>
                <a v-else class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900">
                  Por desbloquear
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

  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      seasonDetails: null,
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
      setTimeout(() => this.$router.push({ path: '/login' }), 2000)
    },

    logout () {
      this.api('/api/logout', {
        method: 'POST'
      })
        .then(() => this.afterLogout())
        .catch(() => this.afterLogout())
    },

    afterSeasonDetails(response) {
      this.seasonDetails = response;
    },

    getSeasonDetails() {
      this.api('/api/season/seasonDetails', {
        method: 'GET'
      })
        .then((response) => this.afterSeasonDetails(response))
        .catch(() => this.logout())
    },

    canjearPremio(level) {
      this.api('/api/season/redeemSeasonLvl', {
        method: 'POST',
        body: {level: level}
      })
        .then(() => this.getSeasonDetails())
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
  },
}
</script>
