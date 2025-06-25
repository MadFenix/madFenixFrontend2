import { defineStore } from 'pinia';
import Cookies from "js-cookie";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: '',
    user: null,
    config: null,
    colors: {
      backgroundGeneral: '#303030',
      gris: '#161616',
      azul: '#326B8A',
      verde: '#517A31',
      rojo: '#7A313B',
      naranja: '#FC9208',
      blanco: '#EBEBEB',
    },
  }),
  actions: {
    setToken(token) {
      localStorage.setItem('token', token);
      Cookies.set('token', token, {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.token = token
    },

    setUserToNull() {
      const userValue = '';
      localStorage.setItem('user', JSON.stringify(userValue));
      Cookies.set('user', JSON.stringify(userValue), {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.user = userValue
    },

    setUser(user) {
      localStorage.setItem('user', JSON.stringify(user));
      Cookies.set('user', JSON.stringify(user), {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.user = user
    },

    setConfig(accountParameterToUrl, config) {
      this.colors.backgroundGeneral = config.theme.color_background_secondary?? '#303030';
      this.colors.gris = config.theme.color_black?? '#161616';
      this.colors.naranja = config.theme.color_primary?? '#FC9208';
      this.colors.azul = config.theme.color_secondary?? '#326B8A';
      this.colors.blanco = config.theme.color_white0?? '#EBEBEB';
      const accountParameter = accountParameterToUrl.replace(/^\/+|\/+$/g, '')
      localStorage.setItem(accountParameter + '_config', JSON.stringify(config));
      Cookies.set(accountParameter + '_config', JSON.stringify(config), {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.config = config
    },

    updateUser(user) {
      localStorage.setItem('user', JSON.stringify(user));
      Cookies.set('user', JSON.stringify(user), {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.user = user
    },

    updateConfig(accountParameterToUrl, config) {
      const accountParameter = accountParameterToUrl.replace(/^\/+|\/+$/g, '')
      localStorage.setItem(accountParameter + '_config', JSON.stringify(config));
      Cookies.set(accountParameter + '_config', JSON.stringify(config), {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.config = config
    },

    removeUser() {
      localStorage.setItem('user', '');
      Cookies.set('user', '', {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.user = ''
    },

    removeConfig(accountParameterToUrl) {
      const accountParameter = accountParameterToUrl.replace(/^\/+|\/+$/g, '')
      localStorage.setItem(accountParameter + '_config', '');
      Cookies.set(accountParameter + '_config', '', {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.user = ''
    },

    fetchUser() {
      const { $api } = useNuxtApp();

      $api('/api/host/user')
          .then((response) => {
            if (response && response.data) {
              //window.document.cookie = 'user=' + JSON.stringify(response.data.data)
              Cookies.set('user', JSON.stringify(response.data), {
                expires: 365, //60 * 60 * 24 * 365, // 1 year
                path: '/',
              })
              this.updateUser(response.data)
            } else {
              this.removeUser()
            }
          })
          .catch(() => this.user = null)
    },

    fetchConfig(accountParameterToUrl) {
      const { $api } = useNuxtApp();
      const accountParameter = accountParameterToUrl.replace(/^\/+|\/+$/g, '')

      $api('/api/host/theme/active')
          .then((response) => {
            if (response && response.data) {
              //window.document.cookie = 'user=' + JSON.stringify(response.data.data)
              Cookies.set(accountParameter + '_config', JSON.stringify(response.data), {
                expires: 365, //60 * 60 * 24 * 365, // 1 year
                path: '/',
              })
              this.updateConfig(accountParameter, response.data)
            } else {
              this.removeConfig(accountParameter)
            }
          })
          .catch(() => this.config = null)
    },
  }
})
