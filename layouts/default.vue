<template>
  <div :style="`--naranja: ${user.colors.naranja}; --gris: ${user.colors.gris}; --backgroundGeneral: ${user.colors.backgroundGeneral}; --azul: ${user.colors.azul}; --verde: ${user.colors.verde}; --rojo: ${user.colors.rojo}; --blanco: ${user.colors.blanco}`" :class="`bg-[color:var(--backgroundGeneral)]`">
    <div v-if="accountParameterToUrlLoaded == false">
      Cargando...
    </div>
    <div id="container-global" v-else-if="accountParameterToUrl">
      <template v-if="!user.config">
        Cargando...
      </template>
      <template v-else>
        <div>
          <header>
            <nav
                :class="`flex items-center px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8`">
              <div :class="`flex items-center justify-between w-full`">
                <!-- Logo -->
                <div :class="`flex items-center`">
                  <!-- Large logo -->
                  <nuxt-link :to="'/' + accountParameterToUrl"
                     :class="`block flex space-x-2 items-center text-2xl font-black md:hidden lg:flex group font-ancient-god`"
                  >
                    <img :src="user.config?.theme?.logo ?? ''" :title="user.config?.config?.name_ecosystem ?? ''" :alt="user.config?.config?.name_ecosystem ?? ''" :class="`w-12`" />

                    <span
                        :class="`transition duration-200 ease-in-out text-white group-hover:text-[color:var(--naranja)]`"
                        v-html="user.config?.config?.name_ecosystem ?? ''"
                    />
                  </nuxt-link>

                  <!-- Small logo for mobile screens -->
                  <a
                      :href="'/' + accountParameterToUrl"
                      :class="`hidden text-3xl font-black md:block lg:hidden group`"
                  >
                      <span
                          :class="`text-white transition duration-200 ease-in-out`"
                      >M</span
                      ><span
                      :class="`transition duration-200 ease-in-out text-white group-hover:text-[color:var(--naranja)]`"
                  >F</span
                  >
                  </a>
                </div>

                <!-- Main menu for large screens -->
                <div
                    :class="`hidden md:flex justify-between items-center md:space-x-0.5 lg:space-x-2 text-xl md:text-base font-medium text-white`"
                >
                  <nuxt-link :to="'/' + accountParameterToUrl"
                             :class="`block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700`"
                  >
                    Home
                  </nuxt-link>

                  <nuxt-link v-if="user.user" v-for="(item, key) in items" :key="key" :to="'/' + this.accountParameterToUrl + item.path"
                             :class="`block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700`"
                             v-html="item.text"
                  />

                  <a href="https://universo.madfenix.com/shelves/nevoran" target="_blank"
                     :class="`block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700`">
                    Universo
                  </a>
                  <a href="https://universo.madfenix.com/books/plataforma-web" target="_blank"
                     :class="`block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700`">
                    Academia
                  </a>

                  <a v-if="user.user" @click="logout()"
                     :class="`block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700 cursor-pointer`"
                  >
                    Logout
                  </a>
                  <nuxt-link v-if="!user.user" :to="'/' + accountParameterToUrl + 'login'"
                             :class="`block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700`"
                  >
                    Login
                  </nuxt-link>
                  <nuxt-link v-if="!user.user" :to="'/' + accountParameterToUrl + 'registro'"
                             :class="`block px-4 py-1 transition duration-200 ease-in-out rounded-full sm:inline-block hover:text-white hover:bg-dark-700`"
                  >
                    Registro
                  </nuxt-link>
                </div>
                <div
                    :class="`flex justify-between items-center md:space-x-0.5 lg:space-x-2 text-xl md:text-base font-medium text-white cursor-pointer`"
                    @click="fetchEvents(); showEventsModal = true;"
                >
                  <div v-html="numberEventsNotRead" />
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-6`">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                    </svg>
                  </span>
                </div>

                <!-- Mobile menu container -->
                <div :class="`block md:hidden`">
                  <!-- Hamburger menu button -->

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
                      :class="`fixed bottom-0 left-0 w-full flex items-center justify-center bg-gradient-to-tr`" style="z-index: 100;"
                  >
                    <div
                        :class="`flex grid grid-cols-6 items-center w-full bg-[color:var(--gris)] mx-auto text-xl`"
                    >
                      <nuxt-link :to="'/' + accountParameterToUrl"
                                 :class="`block p-4 font-medium rounded-full text-white hover:text-white hover:bg-dark-700 sm:inline-block`"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-6 m-auto`">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                      </nuxt-link>

                      <nuxt-link :to="'/' + this.accountParameterToUrl + item.path" v-for="(item, key) in items" :key="key"
                                 :class="`block border-l-2 border-dark-600 p-4 font-medium text-white hover:text-white hover:bg-dark-700 sm:inline-block`"
                      >
                        <svg v-if="item.text == this.user.config?.theme?.title_profile" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-6 m-auto`">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <svg v-else-if="item.text == this.user.config?.theme?.title_season" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-6 m-auto`">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                        </svg>
                        <svg v-else-if="item.text == this.user.config?.theme?.title_store" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-6 m-auto`">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                        </svg>

                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-6 m-auto`">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                      </nuxt-link>

                      <a href="https://universo.madfenix.com/shelves/nevoran" target="_blank"
                         :class="`block border-l-2 border-dark-600 p-4 font-medium text-white hover:text-white hover:bg-dark-700 sm:inline-block`"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-6 m-auto`">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                      </a>

                      <a href="https://universo.madfenix.com/books/plataforma-web" target="_blank"
                         :class="`block border-l-2 border-dark-600 p-4 font-medium text-white hover:text-white hover:bg-dark-700 sm:inline-block`"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-6 m-auto`">
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
          <div v-if="showEventsModal" tabindex="-1" aria-hidden="true" :class="`overflow-y-auto overflow-x-hidden bg-[color:var(--gris)] bg-opacity-50 fixed top-0 right-0 left-0 z-50 w-full h-modal md:h-full`">
            <div :class="`flex items-center justify-center p-4 w-full h-screen`">
              <!-- Modal content -->
              <div :class="`bg-[color:var(--gris)] text-[color:var(--blanco)] rounded-lg shadow border border-[color:var(--blanco)] min-w-[300px]`">
                <!-- Modal header -->
                <div :class="`flex justify-between items-start p-4 rounded-t border-b border-[color:var(--blanco)]`">
                  <h3 :class="`text-xl font-semibold`" v-html="'Eventos'" />
                  <button type="button" @click="showEventsModal = false;" :class="`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white`">
                    <svg aria-hidden="true" :class="`w-5 h-5`" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span :class="`sr-only`">Cerrar pantalla</span>
                  </button>
                </div>
                <!-- Modal body -->
                <div :class="`w-full p-3 overflow-y-auto`" style="height: 500px; max-width: 700px;">
                  <div v-if="loadingEvents">Cargando eventos...</div>
                  <div v-else-if="!events || events.length <= 0">No tienes eventos.</div>
                  <div v-else v-for="eventToList in events" :key="eventToList.id" :class="`mt-3`">
                    <div :class="`relative rounded-tr-3xl rounded-bl-3xl border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden min-h-[100px] p-3`" v-html="eventToList.description" />
                    <div :class="`relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios`">
                      <div :class="`flex justify-center`">
                        <!-- Botón: Siguiente paso -->
                        <div>
                          <span @click="viewEvent(eventToList)" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
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
          <div v-if="showEventModal && event" tabindex="-1" aria-hidden="true" :class="`overflow-y-auto overflow-x-hidden bg-[color:var(--gris)] bg-opacity-50 fixed top-0 right-0 left-0 z-50 w-full h-modal md:h-full`">
            <div :class="`flex items-center justify-center p-4 w-full h-screen`">
              <!-- Modal content -->
              <div :class="`bg-[color:var(--gris)] text-[color:var(--blanco)] rounded-lg shadow border border-[color:var(--blanco)]`">
                <!-- Modal header -->
                <div :class="`flex justify-between items-start p-4 rounded-t border-b border-[color:var(--blanco)]`">
                  <h3 :class="`text-xl font-semibold`" v-html="event.description" />
                  <button type="button" @click="showEventModal = false;" :class="`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white`">
                    <svg aria-hidden="true" :class="`w-5 h-5`" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span :class="`sr-only`">Cerrar pantalla</span>
                  </button>
                </div>
                <!-- Modal body -->
                <div :class="`w-full p-3 overflow-y-auto`" style="height: 500px; max-width: 700px;">
                  <div>
                    <div :class="`relative rounded-tr-3xl rounded-bl-3xl border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden min-h-[100px] p-3`" v-html="event.details" />
                    <div :class="`relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios`">
                      <div :class="`flex justify-center`" v-if="event.product_gift_id">
                        <!-- Botón: Siguiente paso -->
                        <div>
                          <span v-if="event.product_gift_delivered" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2`">
                            Recompensa obtenida
                          </span>
                          <span v-else @click="claimEventGift(event)" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
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
          <div v-if="showProductsModal" tabindex="-1" aria-hidden="true" :class="`overflow-y-auto overflow-x-hidden bg-[color:var(--gris)] bg-opacity-50 fixed top-0 right-0 left-0 z-50 w-full h-modal md:h-full`">
            <div :class="`flex items-center justify-center p-4 w-full h-screen`">
              <!-- Modal content -->
              <div :class="`bg-[color:var(--gris)] text-[color:var(--blanco)] rounded-lg shadow border border-[color:var(--blanco)]`">
                <!-- Modal header -->
                <div :class="`flex justify-between items-start p-4 rounded-t border-b border-[color:var(--blanco)]`">
                  <h3 :class="`text-xl font-semibold`">
                    ¡Tus nuevos ítems!
                  </h3>
                  <button type="button" @click="showProductsModal = false; imageItemsReveal = false" :class="`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white`">
                    <svg aria-hidden="true" :class="`w-5 h-5`" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span :class="`sr-only`">Cerrar pantalla</span>
                  </button>
                </div>
                <!-- Modal body -->
                <div :class="`w-full p-3 overflow-y-auto`" style="height: 500px; max-width: 700px;">
                  <video id="video-storemadfenix" :class="`rounded rounded-3xl border border-2 border-[color:var(--gris)]`" playsinline @ended="revealImageItems()" v-if="!imageItemsReveal">
                    <source :src="videoNewItems" type="video/mp4">
                    Tu navegador no soporta el video.
                  </video>
                  <div :class="`grid grid-cols-2 md:grid-cols-3 gap-2`" v-if="imageItemsReveal && itemsPurchaseToShow">
                    <div v-for="nft in itemsPurchaseToShow.nfts" :key="nft.id">
                      <div :class="`relative rounded-tr-3xl rounded-bl-3xl border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
                        <img :src="nft.image" style="width: 100%;" :alt="nft.name" :title="nft.name" />

                        <div :class="`px-6 mt-3 mb-10 relative z-50 w-full text-center text-[color:var(--blanco)]`" v-html="nft.name" />
                      </div>
                    </div>
                    <div v-if="itemsPurchaseToShow.plumas">
                      <div :class="`relative rounded-tr-3xl rounded-bl-3xl border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
                        <img :src="'/img/perfil/pluma.png'" style="width: 100%;" :alt="itemsPurchaseToShow.plumas" :title="itemsPurchaseToShow.plumas" />

                        <div :class="`px-6 mt-3 mb-10 relative z-50 w-full text-center text-[color:var(--blanco)]`" v-html="itemsPurchaseToShow.plumas" />
                      </div>
                    </div>
                    <div v-if="itemsPurchaseToShow.oro">
                      <div :class="`relative rounded-tr-3xl rounded-bl-3xl border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
                        <img :src="'/img/perfil/oro.png'" style="width: 100%;" :alt="itemsPurchaseToShow.oro" :title="itemsPurchaseToShow.oro" />

                        <div :class="`px-6 mt-3 mb-10 relative z-50 w-full text-center text-[color:var(--blanco)]`" v-html="itemsPurchaseToShow.oro" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer :class="`px-4 py-12 md:py-16 bg-[color:var(--gris)] sm:px-6 lg:px-8`">
            <div :class="`grid gap-8 mx-auto lg:max-w-screen-xl sm:max-w-3xl md:grid-cols-3 md:gap-y-12 lg:grid-cols-4`">
              <!-- Logo and copyright text -->
              <div :class="`flex flex-col lg:mx-auto`">
                <div :class="`flex items-center`">
                  <a :href="'/' + accountParameterToUrl" :class="`text-2xl font-black lg:block group font-ancient-god`">
                    <span :class="`transition duration-200 ease-in-out text-white group-hover:text-[color:var(--naranja)]`" v-html="user.config?.config?.name_ecosystem ?? ''" />
                  </a>
                </div>
                <div :class="`mt-6 text-lg md:mt-8 text-white`">
                  © <span v-html="new Date().getFullYear()" /> <span v-html="user.config?.config?.name_ecosystem ?? ''" />.
                  <br>
                  Todos los derechos reservados.
                </div>
              </div>

              <!-- Contact information -->
              <div :class="`lg:mx-auto`">
                <h6 :class="`text-xl font-semibold text-[color:var(--naranja)]`">Ponte en contacto</h6>
                <p :class="`mt-2 text-lg text-white`">
                  <span v-html="user.config?.config?.direction ?? ''" />,
                  <br><span v-html="user.config?.config?.city ?? ''" />, <span v-html="user.config?.config?.state ?? ''" /> <span v-html="user.config?.config?.postal_code ?? ''" />
                </p>
                <p :class="`text-lg text-white`"><span v-html="user.config?.config?.email ?? ''" /></p>
              </div>

              <!-- Site links -->
              <div :class="`lg:mx-auto`">
                <h6 :class="`text-xl font-semibold text-[color:var(--naranja)]`">Ecosistema</h6>
                <ul :class="`mt-2 space-y-1 text-lg`">
                  <li :class="`font-medium text-white hover:text-white`">
                    <nuxt-link :to="'/' + accountParameterToUrl">
                      Home
                    </nuxt-link>
                  </li>
                  <li v-if="user.user" v-for="(item, key) in items" :key="key" :class="`font-medium text-white hover:text-white`">
                    <nuxt-link :to="'/' + this.accountParameterToUrl + item.path" v-html="item.text" />
                  </li>
                  <li :class="`font-medium text-white hover:text-white`">
                    <a href="https://universo.madfenix.com/shelves/nevoran" target="_blank" :class="`cursor-pointer`" >
                      Universo
                    </a>
                  </li>
                  <li :class="`font-medium text-white hover:text-white`">
                    <a href="https://universo.madfenix.com/books/plataforma-web" target="_blank" :class="`cursor-pointer`" >
                      Academia
                    </a>
                  </li>
                  <li v-if="user.user" :class="`font-medium text-white hover:text-white`">
                    <a @click="logout()" :class="`cursor-pointer`" >
                      Logout
                    </a>
                  </li>
                  <li v-if="!user.user" :class="`font-medium text-white hover:text-white`">
                    <nuxt-link :to="'/' + accountParameterToUrl + 'login'" >
                      Login
                    </nuxt-link>
                  </li>
                  <li v-if="!user.user" :class="`font-medium text-white hover:text-white`">
                    <nuxt-link :to="'/' + accountParameterToUrl + 'registro'" >
                      Registro
                    </nuxt-link>
                  </li>
                  <li :class="`font-medium text-white hover:text-white`">
                    <nuxt-link :to="'/' + accountParameterToUrl + 'aviso-legal'" >
                      Aviso legal
                    </nuxt-link>
                  </li>
                  <li :class="`font-medium text-white hover:text-white`">
                    <nuxt-link :to="'/' + accountParameterToUrl + 'condiciones'" >
                      Términos y condiciones
                    </nuxt-link>
                  </li>
                  <li :class="`font-medium text-white hover:text-white`">
                    <nuxt-link :to="'/' + accountParameterToUrl + 'politica-de-cookies'" >
                      Política de cookies
                    </nuxt-link>
                  </li>
                  <li :class="`font-medium text-white hover:text-white`">
                    <nuxt-link :to="'/' + accountParameterToUrl + 'politica-de-privacidad'" >
                      Política de privacidad
                    </nuxt-link>
                  </li>
                </ul>
              </div>

              <!-- Social links -->
              <div :class="`sm:col-span-3 lg:col-span-1 lg:mx-auto`">
                <h6 :class="`text-xl font-semibold text-[color:var(--naranja)]`">
                  Síguenos
                </h6>
                <p :class="`mt-2 text-lg text-white`" v-html="user.config?.config?.slogan_ecosystem?? ''" />
                <div :class="`w-full mt-4 lg:mt-6`">
                  <!-- Social links container -->
                  <div :class="`flex justify-start space-x-4`">
                    <!-- Instagram -->
                    <a v-if="user.config?.config?.url_instagram" :class="`flex items-center justify-center w-12 h-12 transition duration-300 ease-in-out rounded-full bg-dark-700 hover:text-dark-900 text-[color:var(--naranja)] border-2 border-[color:var(--gris)] hover:border-[color:var(--naranja)]`" :href="user.config?.config?.url_instagram?? ''" target="_blank">
                      <!-- TablerIcon name: brand-instagram -->
                      <svg xmlns="http://www.w3.org/2000/svg" :class="`w-6 h-6`" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <rect x="4" y="4" width="16" height="16" rx="4"></rect>
                        <circle cx="12" cy="12" r="3"></circle>
                        <line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
                      </svg>
                    </a>

                    <!-- Youtube -->
                    <a v-if="user.config?.config?.url_youtube" :class="`flex items-center justify-center w-12 h-12 transition duration-300 ease-in-out rounded-full bg-dark-700 hover:text-dark-900 text-[color:var(--naranja)] border-2 border-[color:var(--gris)] hover:border-[color:var(--naranja)]`" :href="user.config?.config?.url_youtube?? ''" target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M12 20.5c1.81 0 3.545-.179 5.153-.507c2.01-.41 3.014-.614 3.93-1.792c.917-1.179.917-2.532.917-5.238v-1.926c0-2.706 0-4.06-.917-5.238c-.916-1.178-1.92-1.383-3.93-1.792A26 26 0 0 0 12 3.5c-1.81 0-3.545.179-5.153.507c-2.01.41-3.014.614-3.93 1.792C2 6.978 2 8.331 2 11.037v1.926c0 2.706 0 4.06.917 5.238c.916 1.178 1.92 1.383 3.93 1.792c1.608.328 3.343.507 5.153.507"/><path d="M15.962 12.313c-.148.606-.938 1.04-2.517 1.911c-1.718.947-2.577 1.42-3.272 1.237a1.7 1.7 0 0 1-.635-.317C9 14.709 9 13.806 9 12s0-2.709.538-3.144c.182-.147.4-.256.635-.317c.695-.183 1.554.29 3.272 1.237c1.58.87 2.369 1.305 2.517 1.911c.05.206.05.42 0 .626"/></g></svg>
                    </a>

                    <!-- Twitch -->
                    <a v-if="user.config?.config?.url_twitch" :class="`flex items-center justify-center w-12 h-12 transition duration-300 ease-in-out rounded-full bg-dark-700 hover:text-dark-900 text-[color:var(--naranja)] border-2 border-[color:var(--gris)] hover:border-[color:var(--naranja)]`" :href="user.config?.config?.url_twitch?? ''" target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7v4m-4-4v4m4-8H8c-1.886 0-2.828 0-3.414.584C4 4.167 4 5.106 4 6.984v6.576c0 .37 0 .555.025.71a2 2 0 0 0 1.662 1.657c.156.024.341.024.713.024c.093 0 .14 0 .178.006a.5.5 0 0 1 .416.414c.006.039.006.085.006.178v1.543c0 1.182 0 1.773.335 1.89c.334.117.705-.344 1.446-1.268l1.919-2.39c.147-.183.221-.275.324-.324c.102-.049.22-.049.457-.049h3.862c.818 0 1.226 0 1.594-.152c.367-.151.656-.44 1.235-1.015l.656-.655c.579-.575.867-.863 1.02-1.23c.152-.366.152-.773.152-1.587V6.985c0-1.879 0-2.818-.586-3.401C18.828 3 17.886 3 16 3" color="currentColor"/></svg>
                    </a>

                    <!-- Twitter -->
                    <a v-if="user.config?.config?.url_x" :class="`flex items-center justify-center w-12 h-12 transition duration-300 ease-in-out rounded-full bg-dark-700 hover:text-dark-900 text-[color:var(--naranja)] border-2 border-[color:var(--gris)] hover:border-[color:var(--naranja)]`" :href="user.config?.config?.url_x?? ''" target="_blank">
                      <!-- TablerIcon name: brand-twitter -->
                      <svg xmlns="http://www.w3.org/2000/svg" :class="`w-6 h-6`" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </template>
    </div>
    <div v-else>
      <!-- Título de la tarjeta -->
      <h2 :class="`leading-10 text-xl font-bold text-center mb-4 bg-[color:var(--naranja)] py-6 h-[100px] flex items-center justify-center`">Selecciona una cuenta</h2>

      <div :class="`p-5 sm:p-20`">
        <div :class="`relative rounded-tr-3xl rounded-bl-3xl sm:m-auto sm:w-1/2 border-2 border-[color:var(--naranja)] bg-[color:var(--gris)] overflow-hidden`">
          <img src="/img/formularios/madfenix7.png" :class="`absolute`" style="min-width: 1100px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

          <div :class="`p-6 py-[120px] relative z-50`">
            <!-- Campo de texto para el código de referido -->
            <div :class="`mt-5`">
              <div :class="`relative`">
                <input
                    id="referred_code"
                    type="text"
                    v-model="signUpData.account"
                    :class="`w-full text-[color:var(--blanco)] text-center text-3xl rounded-tl-3xl rounded-br-3xl bg-[color:var(--gris)] py-4 pl-10 pr-3 border-2 border-[color:var(--gris)] focus:border-[color:var(--naranja)]`"
                    placeholder="Cuenta"
                />
              </div>
            </div>
            <!-- Mensaje del servidor (visible condicionalmente) -->
            <div v-if="serverMessage.serverMessage" v-html="serverMessage.serverMessage" :class="`text-[color:var(--rojo)] w-full text-center`"></div>
          </div>
        </div>
        <div :class="`relative sm:mx-auto sm:w-1/2 z-50 contenedor-botones-formularios`">
          <div :class="`flex justify-center`">
            <!-- Botón: Siguiente paso -->
            <div :class="`contenedor-boton-right-formularios`">
              <button
                  @click="goToAccount"
                  :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
              >
                Ir a la cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { nextTick } from 'vue';

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
      route: useRoute(),
      api: null,
      items: [],
      itemsToCheck: [
        { icon: ['fas', 'user'], text: 'Perfil', path: 'perfil' },
        { icon: ['fas', 'user'], text: 'Temporada', path: 'temporada' },
        { icon: ['fas', 'user'], text: 'Tienda', path: 'tienda' },
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
      accountParameterToUrl: '',
      accountParameterToUrlLoaded: false,
      signUpData: {
        account: '',
      },
      isSubmitting: false,
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

  watch: {
    'user.token'() {
      this.events = [];
      this.fetchEvents();
    }
  },

  mounted() {
    this.setUserCookies();
    this.result = ref('Esperando la interacción del usuario...');

    if (window.location.hostname == 'our.welore.io') {
      this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';
    } else {
      this.accountParameterToUrl = window.location.hostname.split('.')[0] + '/';
    }
    this.accountParameterToUrlLoaded = true;

    this.setConfigCookies();

    this.itemsToCheck[0].text = this.user.config?.theme?.title_profile ?? 'Perfil';
    this.items.push(this.itemsToCheck[0]);
    if (this.user.config?.config?.active_seasons) {
      this.itemsToCheck[1].text = this.user.config?.theme?.title_season ?? 'Temporada';
      this.items.push(this.itemsToCheck[1]);
    }
    if (this.user.config?.config?.active_store) {
      this.itemsToCheck[2].text = this.user.config?.theme?.title_store ?? 'Tienda';
      this.items.push(this.itemsToCheck[2]);
    }


    const { $api } = useNuxtApp();
    this.api = $api;
    this.fetchEvents();
  },

  methods: {
    clearName(name) {
      // Remplazar espacios por guiones bajos
      name = name.replace(' ', '_');

      // Reemplazar comillas simples por un acento sin letra
      name = name.replace(/'/g, '´');

      // Reemplazar comillas dobles por dos acentos sin letra
      name = name.replace(/"/g, '´´');

      // Normalizar la cadena para separar las letras de sus marcas (acentos, cedillas, etc.)
      name = name.normalize('NFD');

      // Eliminar las marcas diacríticas (los acentos) dejando solo la letra base
      name = name.replace(/[\u0300-\u036f]/g, '');

      // Eliminar caracteres raros, permitiendo letras, números, guiones, guiones bajos, espacios y el carácter ´
      name = name.replace(/[^a-zA-Z0-9\-_´\s]/gu, '');

      return name;
    },

    goToAccount() {
      this.isSubmitting = true;
      if (this.signUpData.account == "") {
        this.isSubmitting = false;
        this.serverMessage.setServerMessage("Debes poner un nombre de cuenta.");
        return;
      }

      window.location.href = '/' + this.clearName(this.signUpData.account) + '/'
    },

    revealImageItems() {
      this.imageItemsReveal = true;
    },

    afterLogout(){
      Cookies.remove('token')
      Cookies.remove('user')
      this.user.setToken('')
      this.user.setUserToNull()
      this.user.removeUser()
      setTimeout(() => this.$router.push({ path: '/' + this.accountParameterToUrl + 'login' }), 2000)
    },

    logout () {
      this.api('/api/host/logout', {
        method: 'POST'
      })
          .then(() => this.afterLogout())
          .catch(() => this.afterLogout())
    },

    setConfigCookies() {
      let config = Cookies.get(this.accountParameterToUrl.replace(/^\/+|\/+$/g, '') + '_config')
      if (config) {
        config = JSON.parse(config)
      }
      if (config) {
        this.user.setConfig(this.accountParameterToUrl, config);

      } else {
        try {
          this.user.fetchConfig(this.accountParameterToUrl);
        } catch (error) {
        }
      }
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
      this.api('/api/host/store/validateProductOrder', {
        method: 'POST',
        body: {product_order_id: product_order.id}
      })
          .then((response) => this.openNewItems(response))
          .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
    },

    claimEventGift(event) {
      this.api('/api/host/store/addEventGiftToOrder', {
        method: 'POST',
        body: {event_id: event.id}
      })
          .then((response) => {
            this.validateProduct(response);
          })
          .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
    },

    readEvent(event) {
      this.api('/api/host/event/readEvent', {
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
      this.api('/api/host/event/list', {
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
