<template>
  <div :class="`text-white container mx-auto`">
    <header :class="`entry-header ast-no-thumbnail`">
      <h1 :class="`entry-title w-full text-center text-[color:var(--naranja)]`" itemprop="headline">Política de cookies (UE)</h1>
    </header> <!-- .entry-header -->
    <div :class="`relative p-4 rounded-tr-3xl rounded-bl-3xl sm:m-auto sm:w-3/4 border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
      <div :class="`entry-content clear`" itemprop="text" v-html="user.config?.config?.cookies_policy?? 'En construcción.'" />
    </div>
    <br>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      route: useRoute(),
      accountParameterToUrl: '',
    }
  },

    computed: {
      token () {
        return this.user.token
      },
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
        title: 'Política de cookies - ' + this.user.config?.config?.name_ecosystem ?? '',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Política de cookies en ' + this.user.config?.config?.name_ecosystem ?? ''
          }
        ]
      });
    },

    methods: {
    setBackground () {
      if (window.location.hostname == 'madfenix.com') {
        document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";

      }
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

    }
  }
</script>
