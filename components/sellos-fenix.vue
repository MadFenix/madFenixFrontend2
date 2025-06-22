<template>
  <div>

    <!-- Case Study Hero -->
    <section class="px-4 py-12 md:py-16 sm:px-6 lg:px-8">
      <div class="max-w-screen-xl mx-auto">
        <!-- Hero text -->
        <div class="w-full max-w-3xl mx-auto text-center lg:max-w-5xl">
          <h1
              class="mt-4 text-4xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-5xl md:text-6xl"
              v-html="'Sellos del Fénix'"
          />
        </div>
      </div>
    </section>

    <section class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-4 sm:my-12" id="container-sello-fenix">
      <p class="text-2xl text-madfenix-blanco text-center">
        Los <span class="text-madfenix-naranja font-bold">Sellos del Fénix</span> son un distintivo de reconocimiento para quienes ayudan a <span class="text-madfenix-naranja font-bold">expandir el camino hacia la Unión Consciente</span>. Funcionan como un <span class="text-madfenix-naranja font-bold">sistema de referidos</span> donde tanto quien invita como la persona referida reciben <span class="text-madfenix-naranja font-bold">5 Oros</span>, y además, el referidor obtiene <span class="text-madfenix-naranja font-bold">el 10%</span> de cada compra con Oro en la tienda de Mad Fénix realizada por su referido. A su vez, quienes refieren miembros a la comunidad obtienen <span class="text-madfenix-naranja font-bold">Sellos del Fénix</span>, que desbloquean beneficios exclusivos cada quincena.
      </p>
    </section>

    <section class="hidden my-4 lg:ml-12 sm:my-12 md:flex sm:space-x-0">
      <div class="z-30">
        <img src="/img/sellos-fenix/SelloDelFenix.png" class="z-30" style="margin-top: 60px;">
      </div>

      <div class="grow z-20" style="margin-left: -100px;">
        <div class="grow">
          <div class="flex justify-end text-left sm:pt-[30px] lg:pt-[90px] mx-3 sm:mr-auto sm:w-3/4 sm:pl-24">
            <div class="text-4xl font-extrabold text-madfenix-naranja sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              Sello del Fénix
            </div>
          </div>
        </div>
        <!-- Hero card -->
        <div class="bg-madfenix-gris border border-madfenix-naranja sm:rounded-tr-3xl rounded-tl-3xl mt-24 p-5 mx-3 sm:mr-auto lg:pl-24 sm:w-3/4">
          <div class="flex flex-col items-center justify-center lg:items-start">
            <div class="z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl">
              <p class="text-2xl font-bold text-madfenix-blanco">
                Este distintivo busca reconocer y premiar a los <span class="text-madfenix-naranja font-bold">miembros más comprometidos de la comunidad</span>, ofreciendo recompensas exclusivas y oportunidades únicas dentro del <span class="text-madfenix-naranja font-bold">Universo Mad Fénix</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="block md:hidden my-4">
      <div class="">
        <img src="/img/sellos-fenix/SelloDelFenix.png" class="z-30 mx-auto w-1/2">
      </div>
      <div class="grow">
        <div class="relative text-right mx-3">
          <h2 class="text-4xl font-extrabold text-madfenix-naranja sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            Sello del Fénix
          </h2>
        </div>
        <!-- Hero card -->
        <div class="bg-madfenix-gris border border-madfenix-naranja sm:rounded-tr-3xl rounded-tl-3xl mt-3 p-5 mx-3 sm:ml-auto lg:pr-24 sm:w-3/4">
          <div class="flex flex-col items-center justify-center lg:items-start">
            <div class="z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl">
              <p class="text-2xl font-bold text-madfenix-blanco">
                Este distintivo busca reconocer y premiar a los <span class="text-madfenix-naranja font-bold">miembros más comprometidos de la comunidad</span>, ofreciendo recompensas exclusivas y oportunidades únicas dentro del <span class="text-madfenix-naranja font-bold">Universo Mad Fénix</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-screen-xl px-4 pt-8 pb-8 mx-auto md:pb-12 md:pt-16 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center">
        <div class="mx-auto text-center p-5 bg-madfenix-naranja rounded rounded-tl-3xl rounded-br-3xl px-12">
          <div
              class="mt-4 text-4xl font-extrabold text-madfenix-gris sm:text-5xl md:text-6xl orbitron-medium"
              v-html="'Recompensas'"
          />
          <div class="text-madfenix-gris text-2xl mt-4">
            (Cada 15 días)
          </div>
        </div>
      </div>

      <!-- Item -->
      <div class="overflow-hidden col-span-2 py-6">
        <div
            class="mt-4 w-full text-center text-3xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-3xl md:text-4xl"
            v-html="'Drop de Plumas'"
        />
      </div>

      <!-- Item -->
      <div class="overflow-hidden col-span-2 py-6">
        <div
            class="mt-4 w-full text-center text-3xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-3xl md:text-4xl"
            v-html="'Drop de Activo Digital'"
        />
        <div
            class="mt-4 w-full text-center text-xl font-extrabold text-madfenix-blanco md:mt-5 sm:text-xl md:text-xl"
            v-html="'relacionado con el Universo Mad Fénix, con las siguientes probabilidades'"
        />
      </div>

      <!-- Logos -->
      <div class="max-w-screen-xl mx-auto mt-12 lg:mt-14">
        <div class="grid grid-cols-2 gap-4 md:gap-6 sm:grid-cols-3">
          <!-- Item -->
          <span class="overflow-hidden">
            <div class="h-[150px] text-center text-xl w-full m-auto px-8 py-6 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out duration-250 border-madfenix-naranja border-2">
              <span class="text-4xl sm:text-7xl">70%</span><br>
              Obtener un<br><span class="font-extrabold">Activo Común</span>
            </div>
          </span>

          <!-- Item -->
          <span class="overflow-hidden">
            <div class="h-[150px] text-center text-xl w-full m-auto px-8 py-6 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out duration-250 border-madfenix-naranja border-2">
              <span class="text-4xl sm:text-7xl">20%</span><br>
              Obtener un<br><span class="font-extrabold">Activo Poco Común</span>
            </div>
          </span>

          <!-- Item -->
          <span class="overflow-hidden">
            <div class="h-[150px] text-center text-xl w-full m-auto px-8 py-6 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out duration-250 border-madfenix-naranja border-2">
              <span class="text-4xl sm:text-7xl">10%</span><br>
              Obtener un<br><span class="font-bold">Activo Raro</span>
            </div>
          </span>
        </div>
      </div>
    </section>

    <!-- Item -->
    <div class="overflow-hidden col-span-2 py-6">
      <div
          class="mt-4 w-full text-center text-3xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-3xl md:text-4xl"
          v-html="'Ruta del Tesoro'"
      />
      <div
          class="mt-4 w-full text-center text-xl font-extrabold text-madfenix-blanco md:mt-5 sm:text-xl md:text-xl"
      >
        Para encontrar un <span class="text-madfenix-naranja font-bold">drop de piezas de oro</span>
      </div>
    </div>

    <section class="max-w-screen-xl px-4 pt-8 pb-8 mx-auto md:pb-12 md:pt-16 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center">
        <div class="mx-auto text-center p-5 bg-madfenix-naranja rounded rounded-tl-3xl rounded-br-3xl px-12">
          <div
              class="mt-4 text-4xl font-extrabold text-madfenix-gris sm:text-5xl md:text-6xl orbitron-medium"
              v-html="'Requisitos'"
          />
        </div>
      </div>

      <!-- Item -->
      <div class="overflow-hidden col-span-2 py-6">
        <div
            class="mt-4 w-full text-center text-3xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-3xl md:text-4xl"
            v-html="'Publicar un tweet citado'"
        />
        <div
            class="mt-4 w-full text-center text-xl font-extrabold text-madfenix-blanco md:mt-5 sm:text-xl md:text-xl"
        >
          de la cuenta de <span class="text-madfenix-naranja font-bold">@madfenixgames</span> de los últimos 7 días
        </div>
      </div>

      <!-- Item -->
      <div class="overflow-hidden col-span-2 py-6">
        <div
            class="mt-4 w-full text-center text-3xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-3xl md:text-4xl"
            v-html="'Alcanzar el nivel 10 del pase de temporada'"
        />
      </div>

      <!-- Item -->
      <div class="overflow-hidden col-span-2 py-6">
        <div
            class="mt-4 w-full text-center text-3xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-3xl md:text-4xl"
            v-html="'Conseguir 3 referidos'"
        />
        <div
            class="mt-4 w-full text-center text-xl font-extrabold text-madfenix-blanco md:mt-5 sm:text-xl md:text-xl"
        >
          que completen el nivel 1 del pase de temporada y vinculen su cuenta de Twitch.
        </div>
      </div>
    </section>

    <section class="px-4 pb-8 md:pb-12 sm:px-6 lg:px-8 border-b border-madfenix-naranja">
      <div class="bg-madfenix-gris border-2 border-madfenix-naranja rounded-br-3xl rounded-tl-3xl mt-3 p-5 mx-3">
        <div class="z-30 mx-auto text-center">
          <p class="text-3xl sm:text-6xl font-bold text-madfenix-naranja">
            Limitado a 2500 personas
          </p>
        </div>
      </div>
    </section>

    <section class="hidden my-4 lg:ml-12 sm:my-12 md:flex sm:space-x-0">
      <div class="z-30">
        <img src="/img/sellos-fenix/SelloSuperiorDelFenix.png" class="z-30" style="margin-top: 60px;">
      </div>

      <div class="grow z-20" style="margin-left: -100px;">
        <div class="grow">
          <div class="flex justify-end text-left sm:pt-[30px] lg:pt-[90px] mx-3 sm:mr-auto sm:w-3/4 sm:pl-24">
            <div class="text-4xl font-extrabold text-madfenix-naranja sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              Sello del Fénix Superior
            </div>
          </div>
        </div>
        <!-- Hero card -->
        <div class="bg-madfenix-gris border border-madfenix-naranja sm:rounded-tr-3xl rounded-tl-3xl mt-12 p-5 mx-3 sm:mr-auto lg:pl-24 sm:w-3/4">
          <div class="flex flex-col items-center justify-center lg:items-start">
            <div class="z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl">
              <p class="text-2xl font-bold text-madfenix-blanco">
                El <span class="text-madfenix-naranja font-bold">Sello Superior del Fénix</span> es el siguiente escalón de reconocimiento dentro de la comunidad. Es <span class="text-madfenix-naranja font-bold">mucho más limitado</span> y ofrece mayores oportunidades de recompensas, reflejando un <span class="text-madfenix-naranja font-bold">nivel de compromiso sobresaliente</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="block md:hidden my-4">
      <div class="">
        <img src="/img/sellos-fenix/SelloSuperiorDelFenix.png" class="z-30 mx-auto w-1/2">
      </div>
      <div class="grow">
        <div class="relative text-right mx-3">
          <h2 class="text-4xl font-extrabold text-madfenix-naranja sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            Sello del Fénix Superior
          </h2>
        </div>
        <!-- Hero card -->
        <div class="bg-madfenix-gris border border-madfenix-naranja sm:rounded-tr-3xl rounded-tl-3xl mt-3 p-5 mx-3 sm:ml-auto lg:pr-24 sm:w-3/4">
          <div class="flex flex-col items-center justify-center lg:items-start">
            <div class="z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl">
              <p class="text-2xl font-bold text-madfenix-blanco">
                El <span class="text-madfenix-naranja font-bold">Sello Superior del Fénix</span> es el siguiente escalón de reconocimiento dentro de la comunidad. Es <span class="text-madfenix-naranja font-bold">mucho más limitado</span> y ofrece mayores oportunidades de recompensas, reflejando un <span class="text-madfenix-naranja font-bold">nivel de compromiso sobresaliente</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-screen-xl px-4 pt-8 pb-8 mx-auto md:pb-12 md:pt-16 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center">
        <div class="mx-auto text-center p-5 bg-madfenix-naranja rounded rounded-tl-3xl rounded-br-3xl px-12">
          <div
              class="mt-4 text-4xl font-extrabold text-madfenix-gris sm:text-5xl md:text-6xl orbitron-medium"
              v-html="'Recompensas'"
          />
          <div class="text-madfenix-gris text-2xl mt-4">
            (Cada 15 días)
          </div>
        </div>
      </div>

      <!-- Item -->
      <div class="overflow-hidden col-span-2 py-6">
        <div
            class="mt-4 w-full text-center text-3xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-3xl md:text-4xl"
            v-html="'Drop de Plumas Superior'"
        />
      </div>

      <!-- Item -->
      <div class="overflow-hidden col-span-2 py-6">
        <div
            class="mt-4 w-full text-center text-3xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-3xl md:text-4xl"
            v-html="'Drop de Activo Digital'"
        />
        <div
            class="mt-4 w-full text-center text-xl font-extrabold text-madfenix-blanco md:mt-5 sm:text-xl md:text-xl"
            v-html="'relacionado con el Universo Mad Fénix, con las siguientes probabilidades'"
        />
      </div>

      <!-- Logos -->
      <div class="max-w-screen-xl mx-auto mt-12 lg:mt-14">
        <div class="grid grid-cols-2 gap-4 md:gap-6">
          <!-- Item -->
          <span class="overflow-hidden">
            <div class="h-[150px] text-center text-xl w-full m-auto px-8 py-6 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out duration-250 border-madfenix-naranja border-2">
              <span class="text-4xl sm:text-7xl">50%</span><br>
              Obtener un<br><span class="font-extrabold">Activo Común</span>
            </div>
          </span>

          <!-- Item -->
          <span class="overflow-hidden">
            <div class="h-[150px] text-center text-xl w-full m-auto px-8 py-6 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out duration-250 border-madfenix-naranja border-2">
              <span class="text-4xl sm:text-7xl">30%</span><br>
              Obtener un<br><span class="font-extrabold">Activo Poco Común</span>
            </div>
          </span>

          <!-- Item -->
          <span class="overflow-hidden">
            <div class="h-[150px] text-center text-xl w-full m-auto px-8 py-6 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out duration-250 border-madfenix-naranja border-2">
              <span class="text-4xl sm:text-7xl">15%</span><br>
              Obtener un<br><span class="font-bold">Activo Raro</span>
            </div>
          </span>

          <!-- Item -->
          <span class="overflow-hidden">
            <div class="h-[150px] text-center text-xl w-full m-auto px-8 py-6 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out duration-250 border-madfenix-naranja border-2">
              <span class="text-4xl sm:text-7xl">5%</span><br>
              Obtener un<br><span class="font-bold">Activo Legendario</span>
            </div>
          </span>
        </div>
      </div>
    </section>

    <!-- Item -->
    <div class="overflow-hidden col-span-2 py-6">
      <div
          class="mt-4 w-full text-center text-3xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-3xl md:text-4xl"
          v-html="'Ruta del Tesoro Superior'"
      />
      <div
          class="mt-4 w-full text-center text-xl font-extrabold text-madfenix-blanco md:mt-5 sm:text-xl md:text-xl"
      >
        Para encontrar un <span class="text-madfenix-naranja font-bold">drop de piezas de oro</span>
      </div>
    </div>

    <section class="max-w-screen-xl px-4 pt-8 pb-8 mx-auto md:pb-12 md:pt-16 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center">
        <div class="mx-auto text-center p-5 bg-madfenix-naranja rounded rounded-tl-3xl rounded-br-3xl px-12">
          <div
              class="mt-4 text-4xl font-extrabold text-madfenix-gris sm:text-5xl md:text-6xl orbitron-medium"
              v-html="'Requisitos'"
          />
        </div>
      </div>

      <!-- Item -->
      <div class="overflow-hidden col-span-2 py-6">
        <div
            class="mt-4 w-full text-center text-3xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-3xl md:text-4xl"
            v-html="'Poseer el Sello del Fénix'"
        />
      </div>

      <!-- Item -->
      <div class="overflow-hidden col-span-2 py-6">
        <div
            class="mt-4 w-full text-center text-3xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-3xl md:text-4xl"
            v-html="'Alcanzar el nivel 15 del pase de temporada'"
        />
      </div>

      <!-- Item -->
      <div class="overflow-hidden col-span-2 py-6">
        <div
            class="mt-4 w-full text-center text-3xl font-extrabold text-madfenix-naranja md:mt-5 sm:text-3xl md:text-4xl"
            v-html="'Conseguir 9 referidos'"
        />
        <div
            class="mt-4 w-full text-center text-xl font-extrabold text-madfenix-blanco md:mt-5 sm:text-xl md:text-xl"
        >
          que completen el nivel 1 del pase de temporada y vinculen su cuenta de Twitch.
        </div>
      </div>
    </section>

    <section class="px-4 pb-8 md:pb-12 sm:px-6 lg:px-8">
      <div class="bg-madfenix-gris border-2 border-madfenix-naranja rounded-br-3xl rounded-tl-3xl mt-3 p-5 mx-3">
        <div class="z-30 mx-auto text-center">
          <p class="text-3xl sm:text-6xl font-bold text-madfenix-naranja">
            Limitado a 100 personas
          </p>
        </div>
      </div>
    </section>
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
      route: useRoute(),
      accountParameterToUrl: '',
    }
  },

  computed: {
  },

  mounted() {
    useHead({
      title: 'Sellos del Fénix - Mad Fénix',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Los Sellos del Fénix son un distintivo de reconocimiento para quienes ayudan a expandir el camino hacia la Unión Consciente.'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://madfenix.com/sellos-fenix'
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Sellos del Fénix - Mad Fénix'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://madfenix.com/img/sellos-fenix/SelloDelFenix.png'
        },
        {
          hid: 'og:image:width',
          name: 'og:image:width',
          content: '1067'
        },
        {
          hid: 'og:image:height',
          name: 'og:image:height',
          content: '405'
        },
        {
          hid: 'og:image:type',
          name: 'og:image:type',
          content: 'image/png'
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@MadFenixGames'
        },
      ]
    });
    this.setUserCookies();
    this.setBackground();

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    setBackground () {
      //document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
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
