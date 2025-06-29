<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 :class="`leading-10 text-xl font-bold text-center mb-4 bg-[color:var(--naranja)] py-6 h-[100px] flex items-center justify-center`">Hábitos</h2>

    <div :class="`p-5 sm:p-20`" v-if="user.user">
      <div :class="`relative rounded-tr-3xl rounded-bl-3xl sm:m-auto sm:w-1/2 border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
        <img src="/img/formularios/madfenix7.png" :class="`absolute`" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div :class="`p-6 py-[120px] relative z-50`">
          <!-- Iteración para cada hábito existente -->
          <div
              v-for="habit in perfil.habits"
              :key="habit.id"
              :class="`grid grid-cols-3 gap-4`"
          >
            <!-- Campo de texto para el nombre del hábito -->
            <div>
              <div :class="`relative`">
                <input
                    type="text"
                    v-model="habit.name"
                    placeholder="Nombre"
                    :class="`w-full text-[color:var(--blanco)] text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-[color:var(--gris)] py-4 pl-10 pr-3 border-2 border-[color:var(--gris)] focus:border-[color:var(--naranja)]`"
                />
              </div>
            </div>
            <!-- Campo de texto para el orden del hábito -->
            <div>
              <div :class="`relative`">
                <input
                    type="text"
                    v-model="habit.order"
                    placeholder="Orden"
                    :class="`w-full text-[color:var(--blanco)] text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-[color:var(--gris)] py-4 pl-10 pr-3 border-2 border-[color:var(--gris)] focus:border-[color:var(--naranja)]`"
                />
              </div>
            </div>
            <!-- Botón para guardar el hábito -->
            <div :class="`flex items-end`">
              <button
                  @click="postHabit(habit.id, habit.name, habit.order)"
                  :class="`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded`"
              >
                Guardar
              </button>
            </div>
          </div>

          <!-- Sección para crear un nuevo hábito -->
          <div :class="`grid grid-cols-3 gap-4 mt-5`">
            <!-- Campo para el nombre del nuevo hábito -->
            <div>
              <div :class="`relative`">
                <input
                    type="text"
                    v-model="newHabit.name"
                    placeholder="Nombre"
                    :class="`w-full text-[color:var(--blanco)] text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-[color:var(--gris)] py-4 pl-10 pr-3 border-2 border-[color:var(--gris)] focus:border-[color:var(--naranja)]`"
                />
              </div>
            </div>
            <!-- Campo para el orden del nuevo hábito -->
            <div>
              <div :class="`relative`">
                <input
                    type="text"
                    v-model="newHabit.order"
                    placeholder="Orden"
                    :class="`w-full text-[color:var(--blanco)] text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-[color:var(--gris)] py-4 pl-10 pr-3 border-2 border-[color:var(--gris)] focus:border-[color:var(--naranja)]`"
                />
              </div>
            </div>
            <!-- Botón para crear el nuevo hábito -->
            <div :class="`flex items-end`">
              <button
                  @click="postHabit(0, newHabit.name, newHabit.order)"
                  :class="`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded`"
              >
                Crear
              </button>
            </div>
          </div>

          <!-- Mensaje del servidor (se muestra condicionalmente) -->
          <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" :class="`text-[color:var(--rojo)] w-full text-center`"></div>
        </div>
      </div>
      <div :class="`relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios`">
        <div :class="`flex justify-center`">
          <!-- Botón: Perfil -->
          <div :class="`contenedor-boton-left-formularios`">
            <nuxt-link to="/" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
              Volver a la Home
            </nuxt-link>
          </div>

          <div :class="`w-2 sm:w-12`">
            &nbsp;
          </div>

          <!-- Botón: Siguiente paso -->
          <div :class="`contenedor-boton-right-formularios`">
            <nuxt-link :to="'/' + accountParameterToUrl + 'perfil'" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
              Ir al Perfil
            </nuxt-link>
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
      transactionData: {
        id: '',
        name: '',
        order: 0,
      },
      newHabit: {
        id: '',
        name: '',
        order: 0,
      },
      perfil: null,
      route: useRoute(),
      accountParameterToUrl: '',
    }
  },

  computed: {
  },

  mounted() {

    this.setUserCookies();
    this.setBackground();

    if (window.location.hostname == 'our.welore.io' || window.location.hostname == 'localhost') {
        this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';
      } else {
        this.accountParameterToUrl = '';
      }

    this.setConfigCookies();

    useHead({
      title: 'Hábitos - ' + this.user.config?.config?.name_ecosystem ?? '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Hábitos en ' + this.user.config?.config?.name_ecosystem ?? ''
        }
      ]
    });

    const { $api } = useNuxtApp();
    this.api = $api;;
    this.getPerfil();
  },

  methods: {
    setBackground () {
      if (window.location.hostname == 'madfenix.com') {
        document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";

      }
    },
    afterPostHabit(response){
      this.getPerfil();
    },

    postHabit(id, name, order){
      this.transactionData.id = id;
      this.transactionData.name = name;
      this.transactionData.order = order;
      this.api('/api/host/habit/post', {
        method: 'POST',
        body: this.transactionData
      })
        .then((response) => this.afterPostHabit(response))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error.message) : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error))
    },
    afterLogout(){
      Cookies.remove('token')
      Cookies.remove('user')
      this.user.setToken('')
      this.user.setUserToNull()
      this.user.removeUser()
      setTimeout(() => this.$router.push({ path: '/'+ this.accountParameterToUrl + 'login' }), 2000)
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

     setConfigCookies() {
      let config = localStorage.getItem(this.accountParameterToUrl.replace(/^\/+|\/+$/g, '') + '_config')
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
      let token = localStorage.getItem('token')
      if (token) {
        this.user.setToken(token);

        //let user = document.cookie.match(new RegExp('(^| )user=([^;]+)'))
        let user = localStorage.getItem('user')

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
