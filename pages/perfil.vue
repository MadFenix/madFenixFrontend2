<template>
  <div>
    <div class="text-5xl my-7 text-center" v-html="'Página de perfil'" />
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";

export default {
  head: {
    title: 'Perfil - Mad Fénix Games',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Perfil en Mad Fénix Games.'
      }
    ]
  },
  data(){
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
    }
  },

  mounted() {
    this.setUserCookies();
    if (!this.user.token) {
      setTimeout(() => this.$router.push({ path: '/login' }), 1000)
      return
    }
  },

  methods: {
    setUserCookies() {
      this.user.token = localStorage.getItem('token');
      this.user.user = JSON.parse(localStorage.getItem('user'));
    },
  }
}
</script>
