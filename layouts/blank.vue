<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage"
import VueCookieComply from '@ipaat/vue3-tailwind3-cookie-comply'
import { ref } from 'vue'
import Cookies from "js-cookie";

export default {
  components: {
    VueCookieComply
  },

  head: {
    title: 'Mad Fénix Games',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Mad Fénix Games.'
      }
    ]
  },
  data(){
    return {
      mobileNavOpen: false,
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      items: [
        { icon: ['fas', 'user'], text: 'Perfil', path: '/perfil' },
        { icon: ['fas', 'user'], text: 'Temporada', path: '/temporada' },
        { icon: ['fas', 'user'], text: 'Tienda', path: '/tienda' },
      ],
      footerItems: [
        {
          href: 'https://twitter.com/madfenixgames',
          icon: ['fab', 'twitter'],
          title: 'Pperfil de Twitter',
        },
        {
          href: 'https://www.instagram.com/madfenixgames/',
          icon: ['fab', 'instagram'],
          title: 'Perfil de Instagram',
        },
      ],
      preferences: [
        {
          title: 'Token (necesario)',
          description: 'Esta cookie contiene el token de acceso a la API del proyecto. Con este token se autoriza el acceso a los recursos protegidos y se mantiene la sesión del usuario. Su validez y renovación dependen de la configuración del backend.',
          items: [
            {
              label: 'token',
              value: 'token',
              isRequired: true,
            },
          ],
        },
        {
          title: 'User (necesario)',
          description: 'Esta cookie almacena los datos del perfil del usuario, lo que permite personalizar tu experiencia en el sitio. Se actualiza cada vez que se modifican los datos del usuario.',
          items: [
            {
              label: 'user',
              value: 'user',
              isRequired: true,
            },
          ],
        },
      ],
      result: null
    }
  },

  mounted() {
    this.setUserCookies();
    this.result = ref('Esperando la interacción del usuario...');

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
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

    setUserCookies() {
      this.user.token = localStorage.getItem('token');
      if (localStorage.getItem('user')) {
        this.user.user = JSON.parse(localStorage.getItem('user'));
      }
    },

    onDecline(accepted) {
      this.result.value = 'El usuario no aceptó cookies. 👎: ' + accepted.join(', ') + ' (requerido)'
    },

    onAccept(accepted) {
      this.result.value = 'El usuario aceptó todas las cookies. 👍: ' + accepted.join(', ')
    },

    _onSave(accepted) {
      this.result.value = 'El usuario aceptó las siguientes cookies 📋: ' + accepted.join(', ')
    },
  }
}
</script>
