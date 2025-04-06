<template>
  <div>

    <section class="sm:absolute sm:block z-10" id="container-logomadfenix">
      <video id="video-logomadfenix" muted autoplay playsinline @ended="revealImageLogo()" v-if="!imageLogoReveal">
        <source src="/video/MadFenixLogoReveal.mp4" type="video/mp4">
        Tu navegador no soporta el video.
      </video>
      <img id="image-logomadfenix" src="/img/home/logomadenix-home.jpg" alt="Logo Mad Fénix" v-if="imageLogoReveal">
    </section>

    <section class="relative px-4 py-12 md:py-16 sm:px-6 lg:px-8 z-20">
      <h2 class="sm:mt-[50px] md:mt-[150px] lg:mt-[300px] text-madfenix-naranja" id="title-nuestra-mision">
        Nuestra misión
      </h2>
      <div id="container-nuestra-mision" class="p-8 text-madfenix-blanco bg-madfenix-gris">
        Mad Fénix crea experiencias de juego donde las relaciones genuinas entre jugadores, creadores y comunidades son el motor de cada partida.<br>Con torneos como nuestra liga web3, convertimos el gaming en un espacio de conexión, competición y colaboración.
      </div>
    </section>

    <section class="px-4 py-12 md:py-16 sm:px-6 lg:px-8" id="container-nuestros-juegos">
      <h2 class="text-madfenix-naranja w-full text-right" id="title-nuestros-juegos">
        Nuestros juegos
      </h2>
      <div class="max-w-screen-xl mx-auto mt-10 md:mt-12 lg:mt-16">
        <!-- Blog container -->
        <div class="order-2 mt-12 overflow-hidden md:mt-0 md:order-1 md:col-span-9">
          <!-- Posts container -->
          <div class="grid gap-6 lg:grid-cols-2 md:gap-8">
            <!-- Juego 1 -->
            <div class="max-w-lg mx-auto shadow-xl rounded-3xl bg-dark-700">
              <div class="w-full bg-center">
                <img src="/img/games/habitos/habitos.jpg" class="w-full max-h-[250px] rounded-t-3xl" title="Hábitos" />
              </div>
              <div class="w-full bg-madfenix-gris p-6 lg:p-4 xl:p-6">
                <div class="flex flex-wrap w-full">
                  <div class="flex grow items-center justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                      <line x1="16" y1="3" x2="16" y2="7"></line>
                      <line x1="8" y1="3" x2="8" y2="7"></line>
                      <line x1="4" y1="11" x2="20" y2="11"></line>
                      <line x1="11" y1="15" x2="12" y2="15"></line>
                      <line x1="12" y1="15" x2="12" y2="18"></line>
                    </svg>
                    <div class="ml-2 text-base font-medium leading-6 text-white">
                      06 de Mayo 2024
                    </div>
                  </div>
                  <div class="flex justify-end space-x-1">
                    <svg class="w-6 h-6 text-white" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" stroke="currentColor" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path class="st1" d="M21.8,10C15,14.5,7.1,23.4,5,29.4"/><path class="st0" d="M5.7,22.4c-0.1-2.6,0.2-6,2-7.8c8.9-8.9,21-11.3,21-11.3s-2.5,9.8-8.5,17.7l0,0H15l2.4,3.3  c-1.8,1.8-5.2,2.1-7.7,2"/>
                      </svg>
                  </div>
                </div>
                <h3 class="mt-6 text-xl font-semibold leading-6 text-white md:text-2xl">
                  Hábitos
                </h3>
                <p class="mt-4 text-base leading-relaxed text-white">
                  Configura tus hábitos y consigue puntos de temporada por completar todo el día.
                </p>
                <div v-if="perfil">
                  <div class="mt-3 text-base leading-relaxed text-white grid grid-cols-5 space-x-3" v-for="habit in perfil.habits" :key="habit.id">
                    <div v-if="!habit.habit_completed" class="flex justify-end mt-1">
                      <input class="mr-0 cursor-pointer" type="checkbox" @click="completeHabit(habit.id)" />
                    </div>
                    <div v-else class="flex justify-end mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-0 w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <div class="col-span-4" v-html="habit.name" />
                  </div>
                </div>
                <div class="mt-8">
                  <nuxt-link to="/habitos" class="mt-3 relative inline-flex items-center justify-center w-auto h-12 px-8 text-base font-medium leading-snug text-white md:h-14 group">
                    <span class="absolute top-0 left-0 z-10 block w-full h-full transition-all ease-in-out rounded-full bg-gradient-to-r duration-250 from-dark-800 to-dark-900 md:w-14 md:group-hover:w-full"></span>
                    <span class="relative z-20">Configurar</span>
                  </nuxt-link>
                </div>
              </div>
            </div>


            <!-- Juego 2 -->
            <div class="max-w-lg mx-auto shadow-xl rounded-3xl bg-dark-700">
              <!--<nuxt-link to="/blog/2024-03-12-tokens-mad-fenix">-->
              <div class="w-full">
                <img src="/img/games/2elevado/portadaStores.jpg" class="w-full max-h-[250px] rounded-t-3xl" title="2 Elevado" />
              </div>
              <!--</nuxt-link>-->
              <div class="w-full bg-madfenix-gris p-6 lg:p-4 xl:p-6">
                <div class="flex flex-wrap w-full">
                  <div class="flex grow items-center justify-start">
                    <!-- TablerIcon name: calendar -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                      <line x1="16" y1="3" x2="16" y2="7"></line>
                      <line x1="8" y1="3" x2="8" y2="7"></line>
                      <line x1="4" y1="11" x2="20" y2="11"></line>
                      <line x1="11" y1="15" x2="12" y2="15"></line>
                      <line x1="12" y1="15" x2="12" y2="18"></line>
                    </svg>
                    <div class="ml-2 text-base font-medium leading-6 text-white">
                      06 de Mayo 2024
                    </div>
                  </div>
                  <div class="flex justify-end space-x-1">
                    <!-- TablerIcon name: brand-tailwind -->
                    <svg class="w-6 h-6 text-white" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" stroke="currentColor" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path class="st1" d="M21.8,10C15,14.5,7.1,23.4,5,29.4"/><path class="st0" d="M5.7,22.4c-0.1-2.6,0.2-6,2-7.8c8.9-8.9,21-11.3,21-11.3s-2.5,9.8-8.5,17.7l0,0H15l2.4,3.3  c-1.8,1.8-5.2,2.1-7.7,2"/>
                      </svg>
                  </div>
                </div>
                <h3 class="mt-6 text-xl font-semibold leading-6 text-white md:text-2xl">
                  2 Elevado
                </h3>
                <p class="mt-4 text-base leading-relaxed text-white">
                  Un juego de sumar números iguales
                </p>
                <div class="mt-8 mt-3">
                  <!--<a href="https://apps.apple.com/es/app/2-elevado/id6499581395" target="_blank" class="relative inline-flex items-center justify-center w-auto h-12 px-8 text-base font-medium leading-snug text-white md:h-14 group">
                    <span class="absolute top-0 left-0 z-10 block w-full h-full transition-all ease-in-out rounded-full bg-gradient-to-r duration-250 from-dark-800 to-dark-900 md:w-14 md:group-hover:w-full"></span>
                    <span class="relative z-20">Descargar iOS</span>
                  </a>-->
                  <a href="https://play.google.com/store/apps/details?id=com.madfenix.twoelevado" target="_blank" class="relative inline-flex items-center justify-center w-auto h-12 px-8 text-base font-medium leading-snug text-white md:h-14 group">
                    <span class="absolute top-0 left-0 z-10 block w-full h-full transition-all ease-in-out rounded-full bg-gradient-to-r duration-250 from-dark-800 to-dark-900 md:w-14 md:group-hover:w-full"></span>
                    <span class="relative z-20">Descargar Android</span>
                  </a>
                  <!--<div class="col-span-2 mt-3">
                    <a href="https://iamvalentigamez.itch.io/2elevado" target="_blank" class="relative inline-flex items-center justify-center w-auto h-12 px-8 text-base font-medium leading-snug text-white md:h-14 group">
                      <span class="absolute top-0 left-0 z-10 block w-full h-full transition-all ease-in-out rounded-full bg-gradient-to-r duration-250 from-dark-800 to-dark-900 md:w-14 md:group-hover:w-full"></span>
                      <span class="relative z-20">Jugar en navegador</span>
                    </a>
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="my-4 container mx-auto p-12">
      <h2 class="text-madfenix-naranja">
        Juegos que mueven comunidades
      </h2>
      <p class="mt-6 text-xl text-white">
        Desde ligas a premios personalizados en nuestro pase de temporada.
      </p>
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="mt-3 p-8 text-white bg-madfenix-gris border-2 border-madfenix-naranja container-movemos-comunidades-modulos">
          <h3 class="mb-3 w-full text-center text-madfenix-naranja">Ligas</h3>
          <p>
            Organizamos ligas gamificadas donde creadores de contenido presiden los equipos. Cada uno tiene un sponsor.
          </p>
        </div>
        <div class="mt-3 p-8 text-white bg-madfenix-gris border-2 border-madfenix-naranja container-movemos-comunidades-modulos">
          <h3 class="mb-3 w-full text-center text-madfenix-naranja">Plumas Fénix</h3>
          <p>
            Son un reclamo para nuestro ecosistema ya que pueden dar ventaja a equipos de la liga, participaciones en sorteos, etc.
          </p>
        </div>
        <div class="mt-3 p-8 text-white bg-madfenix-gris border-2 border-madfenix-naranja container-movemos-comunidades-modulos">
          <h3 class="mb-3 w-full text-center text-madfenix-naranja">Pase de Temporada</h3>
          <p>
            Nuestros jugadores ganan premios con cada nivel superado. Podemos agregar ventajas de proyectos amigos.
          </p>
        </div>
      </div>
    </div>

    <section class="my-4 sm:my-12 container mx-auto">
      <!-- Hero card -->
      <div class="bg-madfenix-naranja flex">
        <!-- Hero card content -->
        <div class="p-5 sm:p-20 sm:w-2/3">
          <!-- Card content text-->
          <div class="flex flex-col items-center justify-center lg:items-start">
            <p class="z-30 inline-flex items-center justify-center pb-2 text-lg font-medium tracking-wide text-madfenix-gris rounded-r-full rounded-tl-full bg-gradient-to-r from-dark-800 to-dark-900">
              Dragones Custodio
            </p>
            <div class="z-30 w-full max-w-lg mx-auto mt-6 text-center lg:text-left lg:max-w-none md:max-w-2xl">
              <h2 class="text-4xl font-extrabold text-madfenix-gris sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                Colección matriz de <br>Mad Fénix
              </h2>
              <p class="mt-6 text-xl text-madfenix-gris">
                Los Dragones Custodio simbolizan los guardianes de la esencia del proyecto. Tienen las mayores utilidades y son el activo digital más preciado de Mad Fenix Games.
              </p>
            </div>
            <!-- Hero buttons -->
            <div class="z-30 mt-10 sm:flex sm:justify-center lg:justify-start">
              <a class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-madfenix-gris rounded-full h-14 duration-250 text-madfenix-naranja hover:text-madfenix-blanco focus:outline-none hover:bg-dark-900" href="/dragones-custodio#utilidades">
                Ver utilidades
              </a>
            </div>
          </div>
        </div>

        <div class="sm:w-1/3 flex items-center justify-center">
          <img src="/img/dragones-custodio/dragon_fenix.png" class="z-30 object-cover h-3/4">
        </div>
      </div>
    </section>

    <section class="my-12 container mx-auto">
      <h2 class="text-madfenix-naranja w-full text-center">
        Sellos del Fénix
      </h2>

      <div class="grid grid-cols-2">
        <div class="">
          <img src="/img/sellos-fenix/SelloSuperiorDelFenix.png" class="z-30 mx-auto w-1/2">
        </div>
        <div class="">
          <img src="/img/sellos-fenix/SelloDelFenix.png" class="z-30 mx-auto w-1/2">
        </div>
      </div>
      <div class="grow">
        <!-- Hero card -->
        <div class="bg-madfenix-naranja mt-3 p-5 mx-3 lg:px-24">
          <div class="flex flex-col items-center justify-center lg:items-start">
            <div class="z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl">
              <p class="text-2xl font-bold text-madfenix-gris">
                Los sellos del Fénix nacen como un <span class="text-madfenix-gris font-bold">distintivo de reconocimiento</span> a quienes ayuden a difundir el camino a la Unión Consciente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="z-30 container mx-auto mt-10 flex justify-center w-full">
      <NuxtLink :to="'/sellos-fenix'" class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-madfenix-naranja rounded-full h-14 duration-250 text-madfenix-gris hover:text-madfenix-blanco focus:outline-none hover:bg-madfenix-gris border-2 border-madfenix-gris hover:border-madfenix-naranja">
        Más sobre los sellos
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";
import Cookies from "js-cookie";

export default {
  middleware: 'basic',

  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      perfil: null,
      imageLogoReveal: false,
      newCompleteHabit: {
        id: 0
      }
    }
  },

  mounted() {
    useHead({
      title: 'Creamos juegos que mueven comunidades - Mad Fénix',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Desarrolladora indie Open Source. Desde torneos a premios personalizados en nuestro pase de temporada.'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://madfenix.com/'
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Creamos juegos que mueven comunidades - Mad Fénix'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://madfenix.com/img/home/chicaJugandoA2Elevado.jpg'
        },
        {
          hid: 'og:image:width',
          name: 'og:image:width',
          content: '1067'
        },
        {
          hid: 'og:image:height',
          name: 'og:image:height',
          content: '684'
        },
        {
          hid: 'og:image:type',
          name: 'og:image:type',
          content: 'image/jpg'
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@MadFenixGames'
        },
      ]
    });
    document.getElementById('video-logomadfenix').play();
    this.setUserCookies();
    this.setBackground();

    const { $api } = useNuxtApp();
    this.api = $api;
    this.pwaInstall();
    this.getPerfil();
  },

  methods: {
    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/home/feather-back-2.png') no-repeat top right";
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
      if (!this.user.token) {
        return;
      }

      this.api('/api/profile/getUserProfile', {
        method: 'POST'
      })
        .then((response) => this.afterPerfil(response))
        .catch(() => this.logout())
    },

    completeHabit(habitId) {
      if (!this.user.token) {
        return;
      }

      this.newCompleteHabit.id = habitId;

      this.api('/api/habit/postComplete', {
        method: 'POST',
        body: this.newCompleteHabit
      })
        .then((response) => this.getPerfil())
        .catch(() => this.logout())
    },

    pwaInstall() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();

          const deferredPrompt = e;

          const installButton = document.createElement('button');
          installButton.textContent = 'Instalar App Mad Fénix';
          installButton.style.position = 'fixed';
          installButton.style.background = 'white';
          installButton.style.bottom = '70px';
          installButton.style.left = '20vw';
          installButton.style.width = '60vw';
          //installButton.style.transform = 'translateX(-50%)';
          installButton.style.zIndex = '9999';
          installButton.style.padding = '10px 20px';
          installButton.classList.add('btn-grad');
          installButton.style.fontWeight = 'bold';
          installButton.style.color = 'black';
          installButton.style.border = 'none';
          installButton.style.borderRadius = '5px';
          installButton.style.cursor = 'pointer';

          installButton.addEventListener('click', () => {

            deferredPrompt.prompt();

            deferredPrompt.userChoice.then(choiceResult => {
              if (choiceResult.outcome === 'accepted') {
                console.log('App installed');
              } else {
                console.log('App installation declined');
              }

              installButton.style.display = 'none';
            });
          });

          document.body.appendChild(installButton);
        });
      }
    },

    revealImageLogo() {
      this.imageLogoReveal = true;
    },
  }
}
</script>
