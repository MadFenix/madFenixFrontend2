<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4" v-if="user.user">
    <!-- Tarjeta contenedora con ancho fijo de 500px -->
    <div class="bg-white shadow rounded p-6 mx-auto" style="width: 500px;">
      <h2 class="text-2xl font-bold text-center mb-4">Notificaciones</h2>

      <!-- Se itera sobre cada evento con separación vertical -->
      <div class="space-y-5">
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

    const { $api } = useNuxtApp();
    this.api = $api;
    this.fetch()
  },

  methods: {
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
