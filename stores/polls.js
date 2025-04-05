import { defineStore } from 'pinia';
import Cookies from "js-cookie";

export const usePollsStore = defineStore('pollsStore', {
  state: () => ({
    polls: null,
  }),
  actions: {
    setPolls(polls) {
      localStorage.setItem('polls', JSON.stringify(polls));
      Cookies.set('polls', JSON.stringify(polls), {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.polls = polls
    },

    updatePolls(polls) {
      localStorage.setItem('polls', JSON.stringify(polls));
      Cookies.set('polls', JSON.stringify(polls), {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.polls = polls
    },

    removePolls() {
      localStorage.setItem('polls', '');
      Cookies.set('polls', '', {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.polls = ''
    },

    fetchPolls() {
      const { $api } = useNuxtApp();

      $api('/api/poll/pollsDetailsLast30Days')
          .then((response) => {
            if (response) {
              //window.document.cookie = 'user=' + JSON.stringify(response.data.data)
              Cookies.set('polls', JSON.stringify(response), {
                expires: 365, //60 * 60 * 24 * 365, // 1 year
                path: '/',
              })
              this.updatePolls(response)
            } else {
              this.removePolls()
            }
          })
          .catch(() => this.polls = null)
    },
  }
})
