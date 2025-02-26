<template>
  <div>
    <!-- Título de la tarjeta -->
    <h2 class="leading-10 text-xl font-bold text-center mb-4 bg-madfenix-naranja py-6 h-[100px] flex items-center justify-center">Notificaciones</h2>

    <div class="p-5 sm:p-20" v-if="user.user">
      <div class="relative rounded-tr-3xl sm:m-auto sm:w-1/2 border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
        <img src="/img/formularios/madfenix7.png" class="absolute" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

        <div class="p-6 py-[120px] relative z-50">
          <div v-for="calendarEvent in events" :key="calendarEvent.id" class="mt-5">
            <!-- Tarjeta individual de notificación con fondo primario (por ejemplo, azul) y texto blanco -->
            <div class="bg-blue-500 text-white rounded shadow">
              <!-- Encabezado de la notificación -->
              <div class="px-4 py-2">
                <div class="text-xl font-bold" v-html="calendarEvent.description"></div>
                <div class="text-sm" v-html="(new Date(calendarEvent.reservated_at)).toString()"></div>
              </div>
              <!-- Contenedor para los detalles -->
              <div class="px-4 py-2">
                <span v-html="calendarEvent.details"></span>
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
      events: [],
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Notificaciones - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Notificaciones en Mad Fénix Games.'
        }
      ]
    });
    this.setUserCookies();
    this.setBackground();

    const { $api } = useNuxtApp();
    this.api = $api;
    this.fetch()
  },

  methods: {
    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
    },
    fetch() {
      this.api('/api/event', {
        method: 'GET'
      })
        .then((response) => (response) ? this.events = response : '')
        .catch((error) => (error.message) ? this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
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
