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

    this.setUserCookies();
    this.setBackground();

    if (window.location.hostname == 'our.welore.io' || window.location.hostname == 'localhost') {
        this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';
      } else {
        this.accountParameterToUrl = '';
      }

    this.setConfigCookies();

    useHead({
      title: 'Sobre nosotros - ' + this.user.config?.config?.name_ecosystem ?? '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Sobre nosotros en ' + this.user.config?.config?.name_ecosystem ?? ''
        }
      ]
    });

    const { $api } = useNuxtApp();
    this.api = $api;
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
