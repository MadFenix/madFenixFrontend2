<template>
  <div id="container-global">
    <header>
      <nav
          class="flex items-center px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex items-center justify-between w-full">
          <!-- Logo -->
          <div class="flex items-center">
            <!-- Large logo -->
            <nuxt-link to="/"
                       class="block flex space-x-2 items-center text-2xl font-black md:hidden lg:flex group font-ancient-god"
            >
              <img src="/img/logo-white.png" title="Mad Fénix" alt="Mad Fénix" class="w-12" />
              <span
                  class="text-white transition duration-200 ease-in-out"
              >Mad</span
              >
              <span
                  class="transition duration-200 ease-in-out text-white group-hover:text-madfenix-naranja"
              >Fénix</span
              >
            </nuxt-link>

            <!-- Small logo for mobile screens -->
            <a
                href="/"
                class="hidden text-3xl font-black md:block lg:hidden group"
            >
                <span
                    class="text-white transition duration-200 ease-in-out"
                >M</span
                ><span
                class="transition duration-200 ease-in-out text-white group-hover:text-madfenix-naranja"
            >F</span
            >
            </a>
          </div>

          <!-- Main menu for large screens -->
          <div
              class="hidden md:flex justify-between items-center md:space-x-0.5 lg:space-x-2 text-xl md:text-base font-medium text-white"
          >
            <nuxt-link to="/"
                       class="block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700"
            >
              Home
            </nuxt-link>

            <nuxt-link v-if="user.user" v-for="(item, key) in items" :key="key" :to="item.path"
                       class="block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700"
                       v-html="item.text"
            />

            <a href="https://universo.madfenix.com/shelves/nevoran" target="_blank"
               class="block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700">
              Universo
            </a>
            <a href="https://universo.madfenix.com/books/plataforma-web" target="_blank"
               class="block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700">
              Academia
            </a>

            <a v-if="user.user" @click="logout()"
               class="block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700 cursor-pointer"
            >
              Logout
            </a>
            <nuxt-link v-if="!user.user" to="/login"
                       class="block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700"
            >
              Login
            </nuxt-link>
            <nuxt-link v-if="!user.user" to="/registro"
                       class="block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700"
            >
              Registro
            </nuxt-link>
          </div>
          <div
              class="flex justify-between items-center md:space-x-0.5 lg:space-x-2 text-xl md:text-base font-medium text-white cursor-pointer"
              @click="fetchEvents(); showEventsModal = true;"
          >
            <div v-html="numberEventsNotRead" />
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
              </svg>
            </span>
          </div>

          <!-- Mobile menu container -->
          <div class="block md:hidden">
            <!-- Hamburger menu button -->
            <!--
              Toggle classes based on menu state
            -->
            <!--<button
              class="relative z-50 w-6 h-5 transition duration-500 ease-in-out transform rotate-0 cursor-pointer group focus:outline-none"
              @click="open = !open"
            >
              <span
                class="absolute block h-1 transition-all duration-300 ease-in-out transform rotate-0 rounded-full opacity-100 bg-dark-300 group-hover:bg-white"
                :class="open ? 'top-2 left-1/2 w-0': 'w-full top-0 left-0'"
              ></span>
              <span
                class="absolute left-0 block w-full h-1 transition-all duration-300 ease-in-out transform rounded-full opacity-100 bg-dark-300 group-hover:bg-white top-2"
                :class="open ? 'rotate-45': 'rotate-0'"
              ></span>
              <span
                class="absolute left-0 block w-full h-1 transition-all duration-300 ease-in-out transform rounded-full opacity-100 bg-dark-300 group-hover:bg-white top-2"
                :class="open ? '-rotate-45': 'rotate-0'"
              ></span>
              <span
                class="absolute block h-1 transition-all duration-300 ease-in-out transform rotate-0 rounded-full opacity-100 bg-dark-300 group-hover:bg-white"
                :class="open ? 'top-2 left-1/2 w-0': 'w-full left-0 top-4'"
              ></span>
            </button>-->

            <!-- Mobile menu -->
            <!--
              Toggle classes based on menu state
            -->
            <!-- absolute top-0 left-0 z-40 w-screen h-screen  -->
            <!--
            @keydown.escape.window="open = false"
            @click.away="open = false"
            v-if="open"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 -translate-y-full"
            x-transition:enter-end="opacity-100 translate-y-0"
            x-transition:leave="transition ease-in duration-200"
            x-transition:leave-start="opacity-100 translate-y-0"
            x-transition:leave-end="opacity-0 -translate-y-full"
            -->
            <div
                class="fixed bottom-0 left-0 w-full flex items-center justify-center bg-gradient-to-tr" style="z-index: 100;"
            >
              <div
                  class="flex grid grid-cols-6 items-center w-full bg-madfenix-gris mx-auto text-xl"
              >
                <nuxt-link to="/"
                           class="block p-4 font-medium rounded-full text-white hover:text-white hover:bg-dark-700 sm:inline-block"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </nuxt-link>

                <nuxt-link :to="item.path" v-for="(item, key) in items" :key="key"
                           class="block border-l-2 border-dark-600 p-4 font-medium text-white hover:text-white hover:bg-dark-700 sm:inline-block"
                >
                  <svg v-if="item.text == 'Perfil'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <svg v-else-if="item.text == 'Temporada'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                  </svg>
                  <svg v-else-if="item.text == 'Tienda'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                  </svg>

                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>
                </nuxt-link>

                <a href="https://universo.madfenix.com/shelves/nevoran" target="_blank"
                   class="block border-l-2 border-dark-600 p-4 font-medium text-white hover:text-white hover:bg-dark-700 sm:inline-block"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </a>

                <a href="https://universo.madfenix.com/books/plataforma-web" target="_blank"
                   class="block border-l-2 border-dark-600 p-4 font-medium text-white hover:text-white hover:bg-dark-700 sm:inline-block"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </nav>
    </header>
    <slot />
    <div v-if="showEventsModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden bg-madfenix-gris bg-opacity-50 fixed top-0 right-0 left-0 z-50 w-full h-modal md:h-full">
      <div class="flex items-center justify-center p-4 w-full h-screen">
        <!-- Modal content -->
        <div class="bg-madfenix-gris text-madfenix-blanco rounded-lg shadow border border-madfenix-blanco min-w-[300px]">
          <!-- Modal header -->
          <div class="flex justify-between items-start p-4 rounded-t border-b border-madfenix-blanco">
            <h3 class="text-xl font-semibold" v-html="'Eventos'" />
            <button type="button" @click="showEventsModal = false;" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Cerrar pantalla</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="w-full p-3 overflow-y-auto" style="height: 500px; max-width: 700px;">
            <div v-if="loadingEvents">Cargando eventos...</div>
            <div v-else-if="!events || events.length <= 0">No tienes eventos.</div>
            <div v-else v-for="eventToList in events" :key="eventToList.id">
              <div class="relative rounded-tr-3xl rounded-bl-3xl border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden min-h-[100px] p-3" v-html="eventToList.description" />
              <div class="relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios">
                <div class="flex justify-center">
                  <!-- Botón: Siguiente paso -->
                  <div>
                    <span @click="viewEvent(eventToList)" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                      <span v-if="eventToList.read_at">Releer</span><span v-else>Leer</span>&nbsp;evento
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showEventModal && event" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden bg-madfenix-gris bg-opacity-50 fixed top-0 right-0 left-0 z-50 w-full h-modal md:h-full">
      <div class="flex items-center justify-center p-4 w-full h-screen">
        <!-- Modal content -->
        <div class="bg-madfenix-gris text-madfenix-blanco rounded-lg shadow border border-madfenix-blanco">
          <!-- Modal header -->
          <div class="flex justify-between items-start p-4 rounded-t border-b border-madfenix-blanco">
            <h3 class="text-xl font-semibold" v-html="event.description" />
            <button type="button" @click="showEventModal = false;" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Cerrar pantalla</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="w-full p-3 overflow-y-auto" style="height: 500px; max-width: 700px;">
            <div>
              <div class="relative rounded-tr-3xl rounded-bl-3xl border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden min-h-[100px] p-3" v-html="event.details" />
              <div class="relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios">
                <div class="flex justify-center" v-if="event.product_gift_id">
                  <!-- Botón: Siguiente paso -->
                  <div>
                    <span v-if="event.product_gift_delivered" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2">
                      Recompensa obtenida
                    </span>
                    <span v-else @click="claimEventGift(event)" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                      Obtener recompensa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showProductsModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden bg-madfenix-gris bg-opacity-50 fixed top-0 right-0 left-0 z-50 w-full h-modal md:h-full">
      <div class="flex items-center justify-center p-4 w-full h-screen">
        <!-- Modal content -->
        <div class="bg-madfenix-gris text-madfenix-blanco rounded-lg shadow border border-madfenix-blanco">
          <!-- Modal header -->
          <div class="flex justify-between items-start p-4 rounded-t border-b border-madfenix-blanco">
            <h3 class="text-xl font-semibold">
              ¡Tus nuevos ítems!
            </h3>
            <button type="button" @click="showProductsModal = false; imageItemsReveal = false" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Cerrar pantalla</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="w-full p-3 overflow-y-auto" style="height: 500px; max-width: 700px;">
            <video id="video-storemadfenix" class="rounded rounded-3xl border border-2 border-madfenix-gris" playsinline @ended="revealImageItems()" v-if="!imageItemsReveal">
              <source :src="videoNewItems" type="video/mp4">
              Tu navegador no soporta el video.
            </video>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2" v-if="imageItemsReveal && itemsPurchaseToShow">
              <div v-for="nft in itemsPurchaseToShow.nfts" :key="nft.id">
                <div class="relative rounded-tr-3xl rounded-bl-3xl border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
                  <img :src="nft.image" style="width: 100%;" :alt="nft.name" :title="nft.name" />

                  <div class="px-6 mt-3 mb-10 relative z-50 w-full text-center text-madfenix-blanco" v-html="nft.name" />
                </div>
              </div>
              <div v-if="itemsPurchaseToShow.plumas">
                <div class="relative rounded-tr-3xl rounded-bl-3xl border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
                  <img :src="'/img/perfil/pluma.png'" style="width: 100%;" :alt="itemsPurchaseToShow.plumas" :title="itemsPurchaseToShow.plumas" />

                  <div class="px-6 mt-3 mb-10 relative z-50 w-full text-center text-madfenix-blanco" v-html="itemsPurchaseToShow.plumas" />
                </div>
              </div>
              <div v-if="itemsPurchaseToShow.oro">
                <div class="relative rounded-tr-3xl rounded-bl-3xl border-2 border-madfenix-naranja bg-madfenix-gris overflow-hidden">
                  <img :src="'/img/perfil/oro.png'" style="width: 100%;" :alt="itemsPurchaseToShow.oro" :title="itemsPurchaseToShow.oro" />

                  <div class="px-6 mt-3 mb-10 relative z-50 w-full text-center text-madfenix-blanco" v-html="itemsPurchaseToShow.oro" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="px-4 py-12 md:py-16 bg-madfenix-gris sm:px-6 lg:px-8">
      <div class="grid gap-8 mx-auto lg:max-w-screen-xl sm:max-w-3xl md:grid-cols-3 md:gap-y-12 lg:grid-cols-4">
        <!-- Logo and copyright text -->
        <div class="flex flex-col lg:mx-auto">
          <div class="flex items-center">
            <a href="/" class="text-2xl font-black lg:block group font-ancient-god">
              <span class="text-white transition duration-200 ease-in-out">Mad</span>
              <span class="transition duration-200 ease-in-out text-white group-hover:text-madfenix-naranja"> Fénix</span>
            </a>
          </div>
          <div class="mt-6 text-lg md:mt-8 text-white">
            © 2025 Mad Fénix.
            <br>
            Todos los derechos reservados.
          </div>
        </div>

        <!-- Contact information -->
        <div class="lg:mx-auto">
          <h6 class="text-xl font-semibold text-madfenix-naranja">Ponte en contacto</h6>
          <p class="mt-2 text-lg text-white">
            C/ Sant Valentí 14 1er,
            <br>Sant Joan de Vilatorrada, Barcelona 08250
          </p>
          <p class="text-lg text-white">iam@valentigamez.com</p>
        </div>

        <!-- Site links -->
        <div class="lg:mx-auto">
          <h6 class="text-xl font-semibold text-madfenix-naranja">Estudio</h6>
          <ul class="mt-2 space-y-1 text-lg">
            <li class="font-medium text-white hover:text-white">
              <nuxt-link to="/">
                Home
              </nuxt-link>
            </li>
            <li v-if="user.user" v-for="(item, key) in items" :key="key" class="font-medium text-white hover:text-white">
              <nuxt-link :to="item.path" v-html="item.text" />
            </li>
            <li class="font-medium text-white hover:text-white">
              <a href="https://universo.madfenix.com/shelves/nevoran" target="_blank" class="cursor-pointer" >
                Universo
              </a>
            </li>
            <li class="font-medium text-white hover:text-white">
              <a href="https://universo.madfenix.com/books/plataforma-web" target="_blank" class="cursor-pointer" >
                Academia
              </a>
            </li>
            <li v-if="user.user" class="font-medium text-white hover:text-white">
              <a @click="logout()" class="cursor-pointer" >
                Logout
              </a>
            </li>
            <li v-if="!user.user" class="font-medium text-white hover:text-white">
              <nuxt-link to="/login" >
                Login
              </nuxt-link>
            </li>
            <li v-if="!user.user" class="font-medium text-white hover:text-white">
              <nuxt-link to="/registro" >
                Registro
              </nuxt-link>
            </li>
            <li class="font-medium text-white hover:text-white">
              <nuxt-link to="/aviso-legal" >
                Aviso legal
              </nuxt-link>
            </li>
            <li class="font-medium text-white hover:text-white">
              <nuxt-link to="/condiciones" >
                Términos y condiciones
              </nuxt-link>
            </li>
            <li class="font-medium text-white hover:text-white">
              <nuxt-link to="/politica-de-cookies" >
                Política de cookies
              </nuxt-link>
            </li>
            <li class="font-medium text-white hover:text-white">
              <nuxt-link to="/politica-de-privacidad" >
                Política de privacidad
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Social links -->
        <div class="sm:col-span-3 lg:col-span-1 lg:mx-auto">
          <h6 class="text-xl font-semibold text-madfenix-naranja">
            Síguenos
          </h6>
          <p class="mt-2 text-lg text-white">
            Renacer te vuelve más fuerte.
          </p>
          <div class="w-full mt-4 lg:mt-6">
            <!-- Social links container -->
            <div class="flex justify-start space-x-4">
              <!-- Instagram -->
              <a class="flex items-center justify-center w-12 h-12 transition duration-300 ease-in-out rounded-full bg-dark-700 hover:text-dark-900 text-madfenix-naranja border-2 border-madfenix-gris hover:border-madfenix-naranja" href="https://www.instagram.com/madfenixgames" target="_blank">
                <!-- TablerIcon name: brand-instagram -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <rect x="4" y="4" width="16" height="16" rx="4"></rect>
                  <circle cx="12" cy="12" r="3"></circle>
                  <line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
                </svg>
              </a>

              <!-- Youtube -->
              <a class="flex items-center justify-center w-12 h-12 transition duration-300 ease-in-out rounded-full bg-dark-700 hover:text-dark-900 text-madfenix-naranja border-2 border-madfenix-gris hover:border-madfenix-naranja" href="https://youtube.com/@madfenixgames" target="_blank">
                <svg viewBox="0 -3 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" fill="#FC9208">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>youtube [#168]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -7442.000000)" fill="#FC9208"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M251.988432,7291.58588 L251.988432,7285.97425 C253.980638,7286.91168 255.523602,7287.8172 257.348463,7288.79353 C255.843351,7289.62824 253.980638,7290.56468 251.988432,7291.58588 M263.090998,7283.18289 C262.747343,7282.73013 262.161634,7282.37809 261.538073,7282.26141 C259.705243,7281.91336 248.270974,7281.91237 246.439141,7282.26141 C245.939097,7282.35515 245.493839,7282.58153 245.111335,7282.93357 C243.49964,7284.42947 244.004664,7292.45151 244.393145,7293.75096 C244.556505,7294.31342 244.767679,7294.71931 245.033639,7294.98558 C245.376298,7295.33761 245.845463,7295.57995 246.384355,7295.68865 C247.893451,7296.0008 255.668037,7296.17532 261.506198,7295.73552 C262.044094,7295.64178 262.520231,7295.39147 262.895762,7295.02447 C264.385932,7293.53455 264.28433,7285.06174 263.090998,7283.18289" id="youtube-[#168]"> </path> </g> </g> </g> </g>
                </svg>
              </a>

              <!-- Youtube -->
              <a class="flex items-center justify-center w-12 h-12 transition duration-300 ease-in-out rounded-full bg-dark-700 hover:text-dark-900 text-madfenix-naranja border-2 border-madfenix-gris hover:border-madfenix-naranja" href="https://twitch.tv/elfenixvalenti" target="_blank">
                <svg viewBox="-0.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" fill="#FC9208">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>twitch [#182]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-141.000000, -7399.000000)" fill="#FC9208"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M97,7249 L99,7249 L99,7244 L97,7244 L97,7249 Z M92,7249 L94,7249 L94,7244 L92,7244 L92,7249 Z M102,7250.307 L102,7241 L88,7241 L88,7253 L92,7253 L92,7255.953 L94.56,7253 L99.34,7253 L102,7250.307 Z M98.907,7256 L94.993,7256 L92.387,7259 L90,7259 L90,7256 L85,7256 L85,7242.48 L86.3,7239 L104,7239 L104,7251.173 L98.907,7256 Z" id="twitch-[#182]"> </path> </g> </g> </g> </g>
                </svg>
              </a>

              <!-- Twitter -->
              <a class="flex items-center justify-center w-12 h-12 transition duration-300 ease-in-out rounded-full bg-dark-700 hover:text-dark-900 text-madfenix-naranja border-2 border-madfenix-gris hover:border-madfenix-naranja" href="https://twitter.com/madfenixgames" target="_blank">
                <!-- TablerIcon name: brand-twitter -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <VueCookieComply
        :preferences="preferences"
        bannerTitle="Preferencias de cookies"
        bannerDescription="Utilizamos cookies y tecnologías similares para personalizar el contenido y ofrecer una mejor experiencia. Puede optar por personalizarlas haciendo clic en el botón de preferencias."
        preferencesBtnLabel="Preferencias"
        acceptAllBtnLabel="Aceptar"
        declineAllBtnLabel="Rechazar"
        savePreferencesBtnLabel="Guardar"
        modalTitle="Su configuración de cookies"
        @on-accept-all="onAccept"
        @on-decline-all="onDecline"
        @on-save-preferences="onSavePreferences"
    ></VueCookieComply>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage"
import VueCookieComply from '@ipaat/vue3-tailwind3-cookie-comply'
import { ref } from 'vue'
import Cookies from "js-cookie";
import { nextTick, watch } from 'vue';

export default {
  components: {
    VueCookieComply
  },

  data(){
    return {
      mobileNavOpen: false,
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      items: [
        { icon: ['fas', 'user'], text: 'Perfil', path: '/perfil' },
        { icon: ['fas', 'user'], text: 'Temporada', path: '/temporada' },
        { icon: ['fas', 'user'], text: 'Tienda', path: '/tienda' },
      ],
      footerItems: [
        {
          href: 'https://twitter.com/madfenixgames',
          icon: ['fab', 'twitter'],
          title: 'Pperfil de Twitter',
        },
        {
          href: 'https://www.instagram.com/madfenixgames/',
          icon: ['fab', 'instagram'],
          title: 'Perfil de Instagram',
        },
      ],
      preferences: [
        {
          title: 'Token (necesario)',
          description: 'Esta cookie contiene el token de acceso a la API del proyecto. Con este token se autoriza el acceso a los recursos protegidos y se mantiene la sesión del usuario. Su validez y renovación dependen de la configuración del backend.',
          items: [
            {
              label: 'token',
              value: 'token',
              isRequired: true,
            },
          ],
        },
        {
          title: 'User (necesario)',
          description: 'Esta cookie almacena los datos del perfil del usuario, lo que permite personalizar tu experiencia en el sitio. Se actualiza cada vez que se modifican los datos del usuario.',
          items: [
            {
              label: 'user',
              value: 'user',
              isRequired: true,
            },
          ],
        },
      ],
      result: null,
      events: [],
      loadingEvents: false,
      event: null,
      showEventsModal: false,
      showEventModal: false,
      showProductsModal: false,
      imageItemsReveal: false,
      videoNewItems: '/video/MadFenixLogoReveal.mp4',
      itemsPurchaseToShow: null,
      watchUserToken: null,
    }
  },

  computed: {
    numberEventsNotRead() {
      let numberEventsNotReadToReturn = 0;

      for (let i = 0; i < this.events.length; i++) {
        if (!this.events[i].read_at) {
          numberEventsNotReadToReturn++;
        }
      }

      return numberEventsNotReadToReturn;
    }
  },

  mounted() {
    this.setUserCookies();
    this.result = ref('Esperando la interacción del usuario...');

    const { $api } = useNuxtApp();
    this.api = $api;
    this.fetchEvents();
    this.watchUserToken = watch(this.user.token, () => {
      this.events = [];
      this.fetchEvents();
    });
  },

  methods: {
    revealImageItems() {
      this.imageItemsReveal = true;
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

    setUserCookies() {
      this.user.token = localStorage.getItem('token');
      if (localStorage.getItem('user')) {
        this.user.user = JSON.parse(localStorage.getItem('user'));
      }
    },

    viewEvent(eventToShow) {
      this.showEventsModal = false;
      this.event = eventToShow;
      this.readEvent(eventToShow);
      this.showEventModal = true;
    },

    openNewItems(itemsPurchase) {
      this.showEventModal = false;
      this.event = null;
      this.videoNewItems = itemsPurchase.video_purchase;
      this.itemsPurchaseToShow = itemsPurchase;
      if (itemsPurchase.video_purchase) {
        this.imageItemsReveal = false;
      } else {
        this.imageItemsReveal = true;
      }

      this.showProductsModal = true;

      if (itemsPurchase.video_purchase) {
        nextTick(() => {
          document.getElementById("video-storemadfenix").play();
        });
      }
    },

    validateProduct(product_order) {
      this.api('/api/store/validateProductOrder', {
        method: 'POST',
        body: {product_order_id: product_order.id}
      })
          .then((response) => this.openNewItems(response))
          .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
    },

    claimEventGift(event) {
      this.api('/api/store/addEventGiftToOrder', {
        method: 'POST',
        body: {event_id: event.id}
      })
          .then((response) => {
            this.validateProduct(response);
          })
          .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
    },

    readEvent(event) {
      this.api('/api/event/readEvent', {
        method: 'POST',
        body: {event_id: event.id}
      })
          .then(() => {
            this.fetchEvents();
          })
          .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
    },

    fetchEvents() {
      if (!this.user.token) {
        return;
      }
      this.loadingEvents = true;
      this.api('/api/event/list', {
        method: 'GET'
      })
          .then((response) => {
            this.loadingEvents = false;
            this.events = response;
          })
          .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
    },

    onDecline(accepted) {
      this.result.value = 'El usuario no aceptó cookies. 👎: ' + accepted.join(', ') + ' (requerido)'
    },

    onAccept(accepted) {
      this.result.value = 'El usuario aceptó todas las cookies. 👍: ' + accepted.join(', ')
    },

    _onSave(accepted) {
      this.result.value = 'El usuario aceptó las siguientes cookies 📋: ' + accepted.join(', ')
    },
  }
}
</script>
