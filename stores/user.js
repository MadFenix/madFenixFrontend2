import { defineStore } from 'pinia';
import Cookies from "js-cookie";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: '',
    user: null,
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

    updateUser(user) {
      localStorage.setItem('user', JSON.stringify(user));
      Cookies.set('user', JSON.stringify(user), {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.user = user
    },

    removeUser() {
      localStorage.setItem('user', '');
      Cookies.set('user', '', {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.user = ''
    },

    fetchUser() {
      const { $api } = useNuxtApp();

      $api('/api/user')
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
  }
})
