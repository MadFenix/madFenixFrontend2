<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 class="leading-10 text-xl font-bold text-center mb-4 bg-madfenix-naranja py-6 h-[100px] flex items-center justify-center">Registro</h2>

    <div class="p-5 sm:p-20">
      <div class="relative rounded-tr-3xl rounded-bl-3xl sm:m-auto sm:w-1/2 border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
        <img src="/img/formularios/madfenix7.png" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div class="p-6 py-[120px] relative z-50">
          <!-- Campo: Nombre -->
          <div class="mt-5">
            <div class="relative">
              <input
                  id="name"
                  type="text"
                  v-model="signUpData.name"
                  placeholder="Ingresa tu nombre"
                  class="w-full text-madfenix-blanco text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
              />
            </div>
          </div>

          <!-- Campo: Email -->
          <div class="mt-3">
            <div class="relative">
              <input
                  id="email"
                  type="email"
                  v-model="signUpData.email"
                  placeholder="Ingresa tu email"
                  class="w-full text-madfenix-blanco text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
              />
            </div>
          </div>

          <!-- Campo: Password -->
          <div class="mt-3">
            <div class="relative">
              <input
                  id="password"
                  type="password"
                  v-model="signUpData.password"
                  placeholder="Ingresa tu password"
                  class="w-full text-madfenix-blanco text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-madfenix-gris py-4 pl-10 pr-3 border-2 border-madfenix-gris focus:border-madfenix-naranja"
              />
            </div>
          </div>

          <!-- Checkbox: Acepto los términos y condiciones -->
          <div>
            <div class="grid grid-cols-12 items-center mt-3">
              <div class="col-span-2">
                <input type="checkbox" v-model="signUpCheck" class="form-checkbox h-5 w-5 text-blue-500" />
              </div>
              <div class="col-span-10 text-madfenix-blanco">
                Acepto los <a href="/condiciones" target="_blank" class="text-blue-500 hover:underline">términos y condiciones</a>
              </div>
            </div>
          </div>

          <!-- Checkbox: Quiero recibir la newsletter -->
          <div>
            <div class="grid grid-cols-12 items-center mt-3">
              <div class="col-span-2">
                <input type="checkbox" v-model="signUpData.newsletter" class="form-checkbox h-5 w-5 text-blue-500" />
              </div>
              <div class="col-span-10 text-madfenix-blanco">
                Quiero recibir la newsletter
              </div>
            </div>
          </div>

          <!-- Mensaje del servidor (si existe) -->
          <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" class="text-madfenix-rojo w-full text-center"></div>
        </div>
      </div>
      <div class="relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios">
        <div class="flex justify-center">
          <!-- Botón: Perfil -->
          <div class="contenedor-boton-left-formularios">
            <nuxt-link to="/login" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Volver al Login
            </nuxt-link>
          </div>

          <div class="w-2 sm:w-12">
            &nbsp;
          </div>

          <!-- Botón: Siguiente paso -->
          <div class="contenedor-boton-right-formularios">
            <button @click="signUp" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Enviar
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
      signUpData: {
        name: '',
        email: '',
        password: '',
        newsletter: false,
      },
      signUpCheck: false,
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Registro - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Registro en Mad Fénix Games.'
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
    signUp(){
      if (this.signUpData.name == "") {
        this.serverMessage.setServerMessage("Debes poner un nombre de usuario.");
        return;
      }
      if (this.signUpData.email == "") {
        this.serverMessage.setServerMessage("Debes poner un correo.");
        return;
      }
      if (this.signUpData.password == "" || this.signUpData.password.length < 8) {
        this.serverMessage.setServerMessage("Debes poner un password de almenos 8 carácteres.");
        return;
      }
      if (!this.signUpCheck) {
        this.serverMessage.setServerMessage("Debes aceptar los términos y condiciones.");
        return;
      }
      this.api('/api/register', {
        method: 'POST',
        body: this.signUpData
      })
        .then((response) => (response === 'User registered') ? this.$router.push({ path: '/login' }) : this.serverMessage.setServerMessage(response))
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
