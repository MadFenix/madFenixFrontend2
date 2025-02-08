<template>
  <div v-if="user.user" class="min-h-screen flex items-center justify-center bg-gray-100">
    <!-- Tarjeta centrada con ancho fijo de 500px -->
    <div class="bg-white shadow rounded p-6 mx-auto" style="width: 500px;">
      <!-- Título de la tarjeta -->
      <h2 class="text-2xl font-bold text-center mb-4">Hábitos</h2>

      <!-- Contenedor con separación vertical para los elementos -->
      <div class="space-y-5">
        <!-- Iteración para cada hábito existente -->
        <div
            v-for="habit in perfil.habits"
            :key="habit.id"
            class="grid grid-cols-3 gap-4"
        >
          <!-- Campo de texto para el nombre del hábito -->
          <div>
            <label class="block text-gray-700 mb-1">Nombre</label>
            <div class="relative">
              <input
                  type="text"
                  v-model="habit.name"
                  placeholder="Nombre"
                  class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
              />
              <!-- Ícono de usuario (ejemplo de SVG para mdi-user) -->
              <svg
                  class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
              >
                <path d="M12,12c2.21,0,4-1.79,4-4s-1.79-4-4-4-4,1.79-4,4S9.79,12,12,12z M12,14c-2.67,0-8,1.34-8,4v2h16v-2 C20,15.34,14.67,14,12,14z"/>
              </svg>
            </div>
          </div>
          <!-- Campo de texto para el orden del hábito -->
          <div>
            <label class="block text-gray-700 mb-1">Orden</label>
            <div class="relative">
              <input
                  type="text"
                  v-model="habit.order"
                  placeholder="Orden"
                  class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
              />
              <!-- Ícono de orden (ejemplo sencillo) -->
              <svg
                  class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
              >
                <path d="M3 6h18v2H3z M3 11h18v2H3z M3 16h18v2H3z"/>
              </svg>
            </div>
          </div>
          <!-- Botón para guardar el hábito -->
          <div class="flex items-end">
            <button
                @click="postHabit(habit.id, habit.name, habit.order)"
                class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Guardar
            </button>
          </div>
        </div>

        <!-- Sección para crear un nuevo hábito -->
        <div class="grid grid-cols-3 gap-4 mt-5">
          <!-- Campo para el nombre del nuevo hábito -->
          <div>
            <label class="block text-gray-700 mb-1">Nombre</label>
            <div class="relative">
              <input
                  type="text"
                  v-model="newHabit.name"
                  placeholder="Nombre"
                  class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
              />
              <svg
                  class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
              >
                <path d="M12,12c2.21,0,4-1.79,4-4s-1.79-4-4-4-4,1.79-4,4S9.79,12,12,12z M12,14c-2.67,0-8,1.34-8,4v2h16v-2 C20,15.34,14.67,14,12,14z"/>
              </svg>
            </div>
          </div>
          <!-- Campo para el orden del nuevo hábito -->
          <div>
            <label class="block text-gray-700 mb-1">Orden</label>
            <div class="relative">
              <input
                  type="text"
                  v-model="newHabit.order"
                  placeholder="Orden"
                  class="w-full border border-gray-300 rounded py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500"
              />
              <svg
                  class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
              >
                <path d="M3 6h18v2H3z M3 11h18v2H3z M3 16h18v2H3z"/>
              </svg>
            </div>
          </div>
          <!-- Botón para crear el nuevo hábito -->
          <div class="flex items-end">
            <button
                @click="postHabit(0, newHabit.name, newHabit.order)"
                class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Crear
            </button>
          </div>
        </div>

        <!-- Mensaje del servidor (se muestra condicionalmente) -->
        <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" class="text-red-500"></div>

        <!-- Botón para navegar a Home -->
        <div class="my-5">
          <NuxtLink
              to="/"
              class="block bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded text-center"
          >
            Home
          </NuxtLink>
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

  head: {
    title: 'Hábitos - Mad Fénix Games',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Hábitos en Mad Fénix Games.'
      }
    ]
  },
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
    }
  },

  computed: {
  },

  mounted() {
    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;;
    this.getPerfil();
  },

  methods: {
    afterPostHabit(response){
      this.getPerfil();
    },

    postHabit(id, name, order){
      this.transactionData.id = id;
      this.transactionData.name = name;
      this.transactionData.order = order;
      this.api('/api/habit/post', {
        method: 'POST',
        body: this.transactionData
      })
        .then((response) => this.afterPostHabit(response))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage(error))
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
      this.api('/api/logout', {
        method: 'POST'
      })
        .then(() => this.afterLogout())
        .catch(() => this.afterLogout())
    },

    afterPerfil(response) {
      this.perfil = response;
    },

    getPerfil() {
      this.api('/api/profile/getUserProfile', {
        method: 'POST'
      })
        .then((response) => this.afterPerfil(response))
        .catch(() => this.logout())
    },

    setUserCookies() {
      let token = Cookies.get('token')
      if (token) {
        this.user.setToken(token);

        //let user = document.cookie.match(new RegExp('(^| )user=([^;]+)'))
        let user = Cookies.get('user')

        if (user) {
          this.user.updateUser(user);
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
