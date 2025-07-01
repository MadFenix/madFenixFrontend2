import { defineStore } from 'pinia';
import Cookies from "js-cookie";

export const usePollsStore = defineStore('pollsStore', {
  state: () => ({
    polls: null,
  }),
  actions: {
    setPolls(polls) {
      localStorage.setItem('polls', JSON.stringify(polls));
      this.polls = polls
    },

    updatePolls(polls) {
      localStorage.setItem('polls', JSON.stringify(polls));
      this.polls = polls
    },

    removePolls() {
      localStorage.setItem('polls', '');
      this.polls = ''
    },

    fetchPolls() {
      const { $api } = useNuxtApp();

      $api('/api/host/poll/pollsDetailsLast30Days')
          .then((response) => {
            if (response) {
              this.updatePolls(response)
            } else {
              this.removePolls()
            }
          })
          .catch(() => this.polls = null)
    },
  }
})
