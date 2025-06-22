<template>
    <div v-if="user.user && perfil" class="mb-4">
      <div class="w-full" v-if="nftCollections" v-for="nftCollection in nftCollections" :key="nftCollection.nft_id">
        <div class="relative rounded-tl-3xl rounded-br-3xl min-h-[300px] mx-3 mt-12 sm:mx-auto sm:w-2/3 bg-madfenix-gris border border-madfenix-naranja overflow-hidden">
          <img :src="nftCollection.featured_image" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -40%);" />
          <div class="relative min-h-[300px] mb-0 p-6 z-50">
            &nbsp;
          </div>
        </div>
        <div class="relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios">
          <div class="flex justify-center">
            <!-- Botón: Perfil -->
            <div class="contenedor-boton-left-formularios">
              <nuxt-link to="/perfil" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                Volver al Perfil
              </nuxt-link>
            </div>

            <div class="w-2 sm:w-12">
              &nbsp;
            </div>

            <div class="contenedor-boton-right-formularios">
              <div class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 border-madfenix-naranja border-2" v-html="nftCollection.name + ' (' + countNFTsByid(nftCollection.nft_id) + ')'" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="perfil" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 mx-3 sm:mx-auto sm:w-2/3">
        <div v-for="nft in nfts" :key="nft.id">
          <div class="relative rounded-tr-3xl rounded-bl-3xl border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
            <img :src="nft.image" style="width: 100%;" :alt="nft.name" :title="nft.name" />

            <div class="px-6 mt-3 mb-10 relative z-50 w-full text-center text-madfenix-blanco" v-html="nft.name" />
          </div>
          <div class="relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios" v-if="nft.nft.token_number > 0">
            <div class="flex justify-center">
              <!-- Botón: Siguiente paso -->
              <div>
                <nuxt-link :to="'/transfiere-item-a-hedera/?item_identification_id=' + nft.id + '&nft_token_id=' + nft.nft.token_props + '.' + nft.nft.token_realm + '.' + nft.nft.token_number" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                  Transferir
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div v-for="nft in nfts_hedera" :key="nft.id">
          <div class="relative rounded-tr-3xl rounded-bl-3xl border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
            <img :src="nft.image" style="width: 100%;" :alt="nft.name" :title="nft.name" />

            <div class="px-6 mt-3 mb-10 relative z-50 w-full text-center text-madfenix-blanco" v-html="nft.name" />
          </div>
          <div class="relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios">
            <div class="flex justify-center">
              <!-- Botón: Siguiente paso -->
              <div>
                <div class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 border-madfenix-naranja border-2">
                  Hedera
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";
import Cookies from "js-cookie";

export default {
  middleware: 'auth',

  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      perfil: null,
      nft_id: null,
      categorySelected: null,
      subcategorySelected: null,
      route: useRoute(),
      accountParameterToUrl: '',
    }
  },

  mounted() {
    useHead({
      title: 'Colección - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Colección en Mad Fénix Games.'
        }
      ]
    });

    this.setUserCookies();
    this.setBackground();

    this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';

    const { $api } = useNuxtApp();
    this.api = $api;
    this.nft_id = this.$route.query.nft_id;
    this.getPerfil()
  },

  computed: {
    nfts() {
      let nftsToReturn = [];
      if (this.perfil && this.perfil.nfts) {
        for (let i = 0; i < this.perfil.nfts.length; i++) {
          if (this.nft_id == this.perfil.nfts[i].nft_id) {
            nftsToReturn.push(this.perfil.nfts[i]);
          }
        }
      }

      return nftsToReturn;
    },
    nfts_hedera() {
      let nftsToReturn = [];
      if (this.perfil && this.perfil.nfts_hedera) {
        for (let i = 0; i < this.perfil.nfts_hedera.length; i++) {
          if (this.nft_id == this.perfil.nfts_hedera[i].nft_id) {
            nftsToReturn.push(this.perfil.nfts_hedera[i]);
          }
        }
      }

      return nftsToReturn;
    },

    nftCollections() {
      let collections = [];
      let currentNFT = null;
      if (this.perfil && this.perfil.nft_categories) {
        for (let z = 0; z < this.perfil.nft_categories.length; z++) {
          for (let i = 0; i < this.perfil.nft_categories[z].nfts.length; i++) {
            currentNFT = this.perfil.nft_categories[z].nfts[i];
            if (this.nft_id == currentNFT.id) {
              collections.push({
                nft_id: currentNFT.id,
                category: currentNFT.category,
                subcategory: currentNFT.subcategory,
                name: currentNFT.name,
                short_description: currentNFT.short_description,
                portrait_image: currentNFT.portrait_image,
                featured_image: currentNFT.featured_image,
                token_number: currentNFT.token_number,
              });
            }
          }
        }
      }

      return collections;
    },
  },

  methods: {
    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
    },

    afterLogout(){
      Cookies.remove('token')
      Cookies.remove('user')
      this.user.setToken('')
      this.user.setUserToNull()
      this.user.removeUser()
      setTimeout(() => this.$router.push({ path: '/login' }), 2000)
    },

    logout () {
      this.api('/api/host/logout', {
        method: 'POST'
      })
        .then(() => this.afterLogout())
        .catch(() => this.afterLogout())
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
