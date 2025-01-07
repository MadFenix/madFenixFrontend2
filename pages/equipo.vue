<template>
  <div>
    <div class="text-5xl my-7 text-center" v-html="'Página del equipo'" />
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";

export default {
  head: {
    title: 'Equipo - Mad Fénix Games',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Equipo en Mad Fénix Games.'
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
  },

  methods: {
    setUserCookies() {
      this.user.token = localStorage.getItem('token');
      this.user.user = JSON.parse(localStorage.getItem('user'));
    },
  }
}
</script>
