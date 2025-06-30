<template>
  <div>
    <Home v-if="pageParameter == '' && getHostname == 'madfenix.com'" />
    <div v-else-if="page" v-html="page" />
    <div v-else>
      Cargando...
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";
import Cookies from "js-cookie";

export default {
  data(){
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      route: useRoute(),
      accountParameterToUrl: '',
      pageParameter: '',
      page: null,
    }
  },

  computed: {
    getHostname: () => {
      return window.location.hostname;
    }
  },

  mounted() {

    this.setUserCookies();

    if (window.location.hostname == 'our.welore.io' || window.location.hostname == 'localhost') {
      this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';
    } else {
      this.accountParameterToUrl = '';
    }

    this.pageParameter = (this.route.params.page) ? this.route.params.page : 'home';

    this.setConfigCookies();

    const { $api } = useNuxtApp();
    this.api = $api;

    this.fetchPage();
  },

  methods: {
    afterFetchPage(page) {
      this.page = page.content.replace(/<\/?body[^>]*>/gi, '');

      useHead({
        title: page.seo_title + ' - ' + this.user.config?.config?.name_ecosystem ?? '',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: page.seo_description + this.user.config?.config?.name_ecosystem ?? ''
          }
        ]
      });
    },

    fetchPage() {
      if (this.pageParameter == '') {
        return;
      }
      this.api('/api/host/page/' + this.pageParameter + '/get', {
        method: 'GET'
      })
          .then((response) => this.afterFetchPage(response.data))
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
