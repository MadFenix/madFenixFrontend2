<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 class="leading-10 text-xl font-bold text-center mb-4 bg-madfenix-naranja py-6 h-[100px] flex items-center justify-center">Login</h2>

    <div class="p-5 sm:p-20">
      <div class="relative rounded-tr-3xl sm:m-auto sm:w-1/2 border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
        <img src="/img/formularios/madfenix7.png" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div class="p-6 py-[120px] relative z-50">
          <!-- Campo para Email -->
          <div class="mt-5">
            <div class="relative">
              <input
                  id="email"
                  type="text"
                  v-model="signInData.email"
                  placeholder="Ingresa tu email"
                  class="w-full text-madfenix-blanco text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
              />
            </div>
          </div>

          <!-- Campo para Password -->
          <div class="mt-3">
            <div class="relative">
              <input
                  id="password"
                  type="password"
                  v-model="signInData.password"
                  placeholder="Ingresa tu contraseña"
                  class="w-full text-madfenix-blanco text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
              />
            </div>
          </div>

          <!-- Mensaje del servidor (visible condicionalmente) -->
          <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" class="text-madfenix-rojo"></div>

          <!-- Enlace para "¿Has olvidado el password?" -->
          <div class="mt-5 flex justify-center">
            <NuxtLink to="/recordar-password" class="text-madfenix-azul hover:underline">
              ¿Has olvidado el password?
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios">
        <div class="flex justify-center">
          <!-- Botón: Perfil -->
          <div class="contenedor-boton-left-formularios">
            <NuxtLink
                to="/registro"
                class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2"
            >
              Registro
            </NuxtLink>
          </div>

          <div class="w-2 sm:w-12">
            &nbsp;
          </div>

          <!-- Botón: Siguiente paso -->
          <div class="contenedor-boton-right-formularios">
            <button
                @click="login"
                class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2"
            >
              Entrar
            </button>
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
