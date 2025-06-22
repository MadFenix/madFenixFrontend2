<template>
  <div class="min-h-screen flex items-center justify-center bg-green-600 p-4" v-if="user.user">
    <audio id="audioNotification">
      <source src="/img/streams/notificationSong.ogg" type="audio/ogg">
    </audio>
    <div v-if="items">
      <div class="w-full items-center text-center">
        <img src="/img/streams/fenix_feliz.png" class="mx-auto w-[250px]" />
      </div>
      <div v-for="item in items" class="w-[800px]">
        <div v-html="item" class="text-5xl font-bold text-white" style="text-shadow: -4px -4px 0 black, 4px -4px 0 black, -4px  4px 0 black, 4px  4px 0 black;" />
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";
import Cookies from "js-cookie";

definePageMeta({
  layout: 'blank',
})

export default {
  middleware: 'auth',

  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      items: null,
      itemsInterval : null,
      itemsIntervalRemove : null,
      route: useRoute(),
      accountParameterToUrl: '',
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Notificaciones - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Notificaciones en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();

    this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';

    this.setConfigCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
    this.fetch();

    let thisObject = this;

    window.addEventListener('keyup', function(ev) {
      thisObject.fetch()
    });
  },

  methods: {
    removeItems() {
      this.items = null;
      window.document.getElementById("audioNotification").stop()
    },

    fetch() {
      this.api('/api/host/store/getLastProductOrders', {
        method: 'GET'
      })
          .then((response) => {
            if (response.length > 0) {
              this.items = response
              window.document.getElementById("audioNotification").play()
            }
          })
          .catch((error) => (error.message) ? this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
      this.itemsInterval = setTimeout(this.fetch, 60000);
      this.itemsIntervalRemove = setTimeout(this.removeItems, 15000);
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
