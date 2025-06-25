<template>
    <div v-if="user.user && perfil && user.config?.config?.active_polls">
      <h1 :class="`text-[color:var(--naranja)] w-full text-center py-12`"><span v-html="user.config?.theme?.title_polls ?? 'Polls'" /></h1>
      <section :class="`max-w-screen-xl px-4 pb-12 mx-auto md:pb-16 sm:px-6 lg:px-8`">
        <div :class="`relative z-30 grid grid-cols-1 sm:grid-cols-12 items-center justify-center mx-auto text-center px-4 sm:px-16 lg:flex-row lg:text-left`">
          <div :class="`sm:col-span-3 flex items-center py-6 sm:py-0 px-12 h-full text-2xl font-bold sm:text-4xl rounded-tr-3xl sm:rounded-tr-none rounded-tl-3xl sm:rounded-bl-3xl bg-[color:var(--gris)]`">
            <h5 :class="`font-extrabold tracking-tight text-white text-size-token-number text-center w-full`">
              <span v-if="perfil" v-html="perfil.plumas" /><span v-else>...</span>
              <p v-if="perfil && perfil.plumas_hedera" v-html="perfil.plumas_hedera + ' RED'" :class="`mt-4 text-xl`" />
            </h5>
          </div>
          <div :class="`sm:col-span-2 flex items-center justify-center bg-[color:var(--azul)]`">
            <img src="/img/perfil/pluma.png" :alt="(user.config?.theme?.title_coin_free ?? 'Plata')" :class="`absolute z-50 h-1/2 sm:h-full`" />
            <svg :class="`inset-y-0 z-40 h-full text-[color:var(--gris)]`" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
          </div>
          <div :class="`sm:col-span-7 px-3 sm:px-0 py-3 sm:py-0 flex items-center space-x-3 justify-center h-full bg-[color:var(--azul)] sm:rounded-tr-3xl rounded-bl-3xl sm:rounded-bl-none rounded-br-3xl sm:mr-12 lg:justify-end`">
            <h5 :class="`grow font-extrabold tracking-tight text-white text-size-token`">
              <span v-html="user.config?.theme?.title_coin_free ?? 'Plata'" />
            </h5>
            <div :class="`botones-tokens`">
              <nuxt-link :to="'/' + accountParameterToUrl + 'canjear-cupon'" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
                Canjea un cupón
              </nuxt-link>
              <br>
              <nuxt-link :to="'/' + accountParameterToUrl + 'transfiere-plumas-a-hedera-previo1'" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
                Transfiere&nbsp;<span v-html="user.config?.theme?.title_coin_free ?? 'Plata'" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <template v-if="nftCollections" v-for="nftCollection in nftCollections" :key="nftCollection.nft_id">
        <div :class="`w-full`" v-if="nftCollection.name == 'Cronistas'">
          <div :class="`relative rounded-tl-3xl rounded-br-3xl min-h-[150px] mx-3 mt-4 sm:mx-auto sm:w-2/3 bg-[color:var(--gris)] border border-[color:var(--naranja)] overflow-hidden`">
            <img :src="nftCollection.featured_image" :class="`absolute`" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -40%);" />
            <div :class="`relative min-h-[150px] mb-0 p-6 z-50`">
              &nbsp;
            </div>
          </div>
          <div :class="`relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios`">
            <div :class="`flex justify-center`">
              <div :class="`contenedor-boton-right-formularios`">
                <NuxtLink
                    :to="'/coleccion/?nft_id=' + nftCollection.nft_id"
                    :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
                    v-html="nftCollection.name + ' (' + countNFTsByid(nftCollection.nft_id) + ')'"
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <div :class="`w-full`" v-if="this.eventos" v-for="(evento, indexEvento) in this.eventos" :key="indexEvento">
        <div :class="`max-w-screen-xl px-4 pt-12 mx-auto md:pt-16 sm:px-6 lg:px-8`">
          <h2 :class="`px-4 sm:px-16 text-[color:var(--blanco)] text-center capitalize-first`" v-html="evento.name" />
        </div>
        <div :class="`w-full`" v-if="evento.polls" v-for="(poll, indexPoll) in evento.polls" :key="poll.id">
          <div :class="`relative rounded-tl-3xl rounded-br-3xl min-h-[500px] mx-3 mt-12 sm:mx-auto sm:w-2/3 bg-[color:var(--gris)] border border-[color:var(--naranja)] overflow-hidden`">
            <img :src="poll.featured_image" :class="`absolute`" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -40%);" />
            <template v-if="currentListAnswers[indexPoll]">
              <div :class="`overflow-y-auto h-[430px] mt-3`">
                <div :class="`relative w-full text-center mb-0 p-2 z-50 text-[color:var(--blanco)]`" v-for="(currentAnswer, indexCurrentAnswer) in currentListAnswers[indexPoll]" :key="indexCurrentAnswer" v-html="'@' + currentAnswer.username + ': ' + currentAnswer.answer" />
              </div>
            </template>
            <template v-else>
              <div :class="`absolute bottom-0 w-full mb-0 p-6 z-50 text-[color:var(--blanco)] background-destino`" v-html="poll.description" />
            </template>
          </div>
          <div :class="`relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios`">
            <div :class="`flex space-x-3 justify-center`">
              <template v-if="poll.answers && poll.answers != ''">
                <div v-for="(answer, indexAnswer) in poll.answers" :key="indexAnswer" :class="` text-center`">
                  <a
                      @click="vote(poll, answer)"
                      :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
                      v-html="answer.description + '<br>(' + answer.votes + '%' + answerUser(poll, answer) + ')'"
                  />
                </div>
              </template>
              <template v-else>
                <template v-if="poll.userAnswer">
                  <a
                      v-if="!currentListAnswers[indexPoll]"
                      @click="currentListAnswers[indexPoll] = poll.customAnswers"
                      :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
                      v-html="'Listar respuesta'"
                  />
                  <a
                      v-else
                      @click="currentListAnswers[indexPoll] = null"
                      :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
                      v-html="'Ocultar respuesta'"
                  />
                </template>
                <template v-else>
                  <input
                      type="text"
                      v-model="customAnswers[index]"
                      :class="`w-full text-[color:var(--blanco)] text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-[color:var(--gris)] py-4 pl-10 pr-3 border-2 border-[color:var(--gris)] focus:border-[color:var(--naranja)]`"
                      placeholder="Respuesta"
                  />
                  <a
                      @click="vote(poll, customAnswers[index])"
                      :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
                      v-html="'Votar'"
                  />
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div>&nbsp;</div>
    </div>
</template>

<script>
import { usePollsStore } from '../stores/polls'
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";
import Cookies from "js-cookie";

export default {
  middleware: 'auth',

  data() {
    return {
      polls: usePollsStore(),
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      customAnswers: [],
      currentListAnswers: [],
      api: null,
      perfil: null,
      route: useRoute(),
      accountParameterToUrl: '',
    }
  },

  mounted() {


    this.setUserCookies();
    if (this.user.token) {
      this.polls.fetchPolls();
    }
    this.setBackground();

    this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';

    this.setConfigCookies();

    useHead({
      title: 'Influye - ' + this.user.config?.config?.name_ecosystem ?? '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Influye en ' + this.user.config?.config?.name_ecosystem ?? ''
        }
      ]
    });

    const { $api } = useNuxtApp();
    this.api = $api;
    this.getPerfil()
  },

  computed: {
    eventos() {
      let eventos = [];
      let currentPoll = null;
      let pastPoll = null;
      if (this.polls && this.polls.polls) {
        for (let i = 0; i < this.polls.polls.length; i++) {
          currentPoll = this.polls.polls[i];
          if (!pastPoll || pastPoll.name != currentPoll.name) {
            eventos.push({
              name: currentPoll.name,
              polls: [currentPoll]
            });
          } else {
            eventos[eventos.length - 1].polls.push(currentPoll);
          }
          pastPoll = this.polls.polls[i];
        }
      }

      return eventos;
    },

    nftCollections() {
      let collections = [];
      if (this.perfil && this.perfil.nfts) {
        for (let i = 0; i < this.perfil.nfts.length; i++) {
          if (!collections.some(obj => obj.nft_id === this.perfil.nfts[i].nft_id)) {
            collections.push({
              nft_id: this.perfil.nfts[i].nft_id,
              name: this.perfil.nfts[i].nft.name,
              short_description: this.perfil.nfts[i].nft.short_description,
              portrait_image: this.perfil.nfts[i].nft.portrait_image,
              featured_image: this.perfil.nfts[i].nft.featured_image,
            });
          }
        }
      }
      if (this.perfil && this.perfil.nfts_hedera) {
        for (let i = 0; i < this.perfil.nfts_hedera.length; i++) {
          if (!collections.some(obj => obj.nft_id === this.perfil.nfts_hedera[i].nft_id)) {
            collections.push({
              nft_id: this.perfil.nfts_hedera[i].nft_id,
              name: this.perfil.nfts_hedera[i].nft.name,
              short_description: this.perfil.nfts_hedera[i].nft.short_description,
              portrait_image: this.perfil.nfts_hedera[i].nft.portrait_image,
              featured_image: this.perfil.nfts_hedera[i].nft.featured_image,
            });
          }
        }
      }

      return collections;
    },
  },

  methods: {
    setBackground () {
      if (window.location.hostname == 'madfenix') {
        document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";

      }
    },

    afterPerfil(response) {
      this.perfil = response;
    },

    getPerfil() {
      this.api('/api/host/profile/getUserProfile', {
        method: 'POST'
      })
        .then((response) => this.afterPerfil(response))
        .catch(() => this.logout())
    },

    countNFTsByid(nft_id) {
      let counted = 0;
      if (this.perfil && this.perfil.nfts) {
        for (let i = 0; i < this.perfil.nfts.length; i++) {
          if (this.perfil.nfts[i].nft_id == nft_id) {
            counted += 1;
          }
        }
      }
      if (this.perfil && this.perfil.nfts_hedera) {
        for (let i = 0; i < this.perfil.nfts_hedera.length; i++) {
          if (this.perfil.nfts_hedera[i].nft_id == nft_id) {
            counted += 1;
          }
        }
      }
      return counted;
    },

    vote(poll, answer) {
      if (answer && !poll.userAnswer && poll.active) {
        let answerToSend = answer
        if (typeof answer != 'string') {
          answerToSend = answer.description
        }
        this.api('/api/host/poll/answerPoll', {
          method: 'POST',
          body: {poll_id: poll.id, answer: answerToSend}
        })
          .then((response) => this.polls.fetchPolls())
          .catch(() => this.logout())
      }
    },

    answerUser(poll, answer) {
      let returnAnswerUser = '';
      if (poll.userAnswer && answer.description == poll.userAnswer.answer) {
        returnAnswerUser = ' - ' + poll.userAnswer.votes + '% tuyos'
      }
      return returnAnswerUser;
    },

     setConfigCookies() {
      let config = Cookies.get(this.accountParameterToUrl.replace(/^\/+|\/+$/g, '') + '_config')
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
  },
}
</script>
