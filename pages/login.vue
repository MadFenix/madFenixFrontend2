<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 class="leading-10 text-xl font-bold text-center mb-4 bg-madfenix-naranja py-6 h-[100px] flex items-center justify-center">Login</h2>

    <div class="p-5 sm:p-20">
      <div class="relative rounded-tr-3xl sm:m-auto sm:w-1/2 border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
        <img src="/img/formularios/madfenix7.png" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div class="p-6 py-[170px] relative z-50">
          <!-- Campo para Email -->
          <div class="mt-5">
            <label for="email" class="block text-gray-700 mb-1">Email</label>
            <div class="relative">
              <input
                  id="email"
                  type="text"
                  v-model="signInData.email"
                  placeholder="Ingresa tu email"
                  class="w-full text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
              />
              <!-- Ícono de email (SVG de ejemplo para mdi-email) -->
              <svg
                  class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
              >
                <path d="M12,12c2.21,0,4-1.79,4-4s-1.79-4-4-4-4,1.79-4,4S9.79,12,12,12z M12,14c-2.67,0-8,1.34-8,4v2h16v-2 C20,15.34,14.67,14,12,14z" />
              </svg>
            </div>
          </div>

          <!-- Campo para Password -->
          <div>
            <label for="password" class="block text-gray-700 mb-1">Password</label>
            <div class="relative">
              <input
                  id="password"
                  type="password"
                  v-model="signInData.password"
                  placeholder="Ingresa tu contraseña"
                  class="w-full text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
              />
              <!-- Ícono de candado (SVG de ejemplo para mdi-lock) -->
              <svg
                  class="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
              >
                <path d="M17,8h-1V6c0-2.757-2.243-5-5-5S6,3.243,6,6v2H5C3.897,8,3,8.897,3,10v10c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V10 C19,8.897,18.103,8,17,8z M8,6c0-1.654,1.346-3,3-3s3,1.346,3,3v2H8V6z"/>
              </svg>
            </div>
          </div>

          <!-- Mensaje del servidor (visible condicionalmente) -->
          <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" class="text-red-500"></div>

          <!-- Botón "Entrar" -->
          <div>
            <button
                @click="login"
                class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2"
            >
              Entrar
            </button>
          </div>

          <!-- Enlace para "¿Has olvidado el password?" -->
          <div class="mt-5 flex justify-center">
            <NuxtLink to="/recordar-password" class="text-blue-500 hover:underline">
              ¿Has olvidado el password?
            </NuxtLink>
          </div>

          <!-- Botón "Registro" -->
          <div class="my-5">
            <NuxtLink
                to="/registro"
                class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2"
            >
              Registro
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
  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      signInData: {
        email: '',
        password: '',
        device_name: 'website',
      },
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Login - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login en Mad Fénix Games.'
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
    afterLogin(response){
      this.user.setToken(response.token)
      this.user.fetchUser()
      this.$router.push('/sala-de-espera')
    },

    login(){
      this.api('/api/login', {
        method: 'POST',
        body: this.signInData
      })
        .then((response) => (response.token) ? this.afterLogin(response) : this.serverMessage.setServerMessage(response))
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
