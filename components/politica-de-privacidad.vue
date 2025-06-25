<template>
  <div :class="`text-white container mx-auto`">
    <header :class="`entry-header ast-no-thumbnail`">
      <h1 :class="`entry-title w-full text-center text-[color:var(--naranja)]`" itemprop="headline">Política de privacidad</h1>
    </header>
    <div :class="`relative p-4 rounded-tr-3xl rounded-bl-3xl sm:m-auto sm:w-3/4 border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
      <div :class="`entry-content clear`" ast-blocks-layout="true" itemprop="text" v-html="user.config?.config?.privacy_policy?? 'En construcción.'" />
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

      this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';

    this.setConfigCookies();

    useHead({
        title: 'Política de privacidad - ' + this.user.config?.config?.name_ecosystem ?? '',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Política de privacidad en ' + this.user.config?.config?.name_ecosystem ?? ''
          }
        ]
      });
    },

    methods: {
    setBackground () {
      if (window.location.hostname == 'madfenix') {
        document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";

      }
    },

       setConfigCookies() {
      let config = Cookies.get(this.accountParameterToUrl.replace(/^\/+|\/+$/g, '') + '_config')
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
