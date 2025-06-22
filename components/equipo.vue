<template>
    <div>
      En construcción
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
  },

  mounted() {
    useHead({
      title: 'Sobre nosotros - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Sobre nosotros en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();
    this.setBackground();

    this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';

    this.setConfigCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
    },

     setConfigCookies() {
      let config = Cookies.get(this.accountParameterToUrl.replace(/^\/+|\/+$/g, '') + '_config')
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
