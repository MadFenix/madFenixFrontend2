<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 class="leading-10 text-xl font-bold text-center mb-4 bg-madfenix-naranja py-6 h-[100px] flex items-center justify-center">Eliminar Cuenta</h2>

    <div class="mt-12 h-[100px] px-4 text-center text-xl sm:text-3xl flex items-center justify-center text-madfenix-blanco">
      Con esta acción eliminarás la cuenta de Mad Fénix junto a todos los datos introducidos en la aplicación 2 Elevado de la Play Store, App Store y Itch.io. El proceso puede tardar hasta 48 horas laborables.
    </div>

    <div class="p-5 sm:p-20" v-if="user.user">
      <div class="relative rounded-tr-3xl sm:m-auto sm:w-1/2 border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
        <img src="/img/formularios/madfenix7.png" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <!-- Campo de entrada para Email -->
        <div class="p-6 py-[170px] relative z-50">
          <label for="email" class="block text-gray-700 mb-1">Email</label>
          <div class="relative">
            <input
                id="email"
                type="text"
                v-model="deleteAccount.email"
                placeholder="Ingresa tu email"
                class="w-full text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
            />
            <!-- Ícono de email (SVG de ejemplo) -->
            <svg
                class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path d="M20,4H4C2.897,4,2,4.897,2,6v12c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2V6C22,4.897,21.103,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"/>
            </svg>
          </div>

          <!-- Campo de entrada para Password -->
          <div>
            <label for="password" class="block text-gray-700 mb-1">Password</label>
            <div class="relative">
              <input
                  id="password"
                  type="password"
                  v-model="deleteAccount.password"
                  placeholder="Ingresa tu contraseña"
                  class="w-full text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
              />
              <!-- Ícono de candado (SVG de ejemplo) -->
              <svg
                  class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
              >
                <path d="M17,8h-1V6c0-2.757-2.243-5-5-5S6,3.243,6,6v2H5C3.897,8,3,8.897,3,10v10c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V10C19,8.897,18.103,8,17,8z M8,6c0-1.654,1.346-3,3-3s3,1.346,3,3v2H8V6z"/>
              </svg>
            </div>
          </div>
          <!-- Mensaje del servidor (se muestra condicionalmente) -->
          <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" class="text-red-500"></div>
          <!-- Botón para eliminar cuenta -->
          <div>
            <button
                @click="deleteAccountAction"
                class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2"
            >
              Eliminar cuenta
            </button>
          </div>
          <!-- Botón para ir al perfil -->
          <div class="my-5">
            <NuxtLink
                to="/perfil"
                class="w-full flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2"
            >
              Perfil
            </NuxtLink>
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
      deleteAccount: {
        email: '',
        password: '',
      },
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Eliminar cuenta - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Eliminar cuenta en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();
    this.setBackground();

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
    },
    deleteAccountAction(){
      this.api('/api/deleteAccount', {
        method: 'POST',
        body: this.deleteAccount
      })
        .then((response) => (response === 'Cuenta en proceso de eliminación') ? this.$router.push('/') : this.serverMessage.setServerMessage(response))
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
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
  }
}
</script>
