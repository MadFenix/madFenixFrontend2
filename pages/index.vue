<template>
  <div>


    <!-- Blog section -->
    <section class="px-4 py-12 md:py-16 sm:px-6 lg:px-8">
      <!-- Section text -->
      <div class="max-w-xl mx-auto text-center md:max-w-2xl lg:text-left lg:max-w-screen-xl">
        <p class="inline-flex items-center justify-center px-6 py-2 text-sm font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r from-dark-600 to-dark-700">
          Nuestros juegos
        </p>
        <div class="grid w-full gap-6 mt-6 lg:grid-cols-5">
          <div class="lg:col-span-3">
            <h2 class="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              Nuestra esencia
            </h2>
          </div>

          <div class="lg:col-span-2">
            <p class="text-xl text-dark-300">
              La forma que tenemos de transmitir nuestro mensaje de empatía y autosuperación
            </p>
          </div>
        </div>
      </div>

      <div class="max-w-screen-xl mx-auto mt-10 md:mt-12 lg:mt-16">
        <!-- Blog container -->
        <div class="order-2 mt-12 overflow-hidden md:mt-0 md:order-1 md:col-span-9">
          <!-- Posts container -->
          <div class="grid gap-6 lg:grid-cols-2 md:gap-8">
            <!-- Juego 1 -->
            <div class="max-w-lg mx-auto shadow-xl rounded-3xl bg-dark-700">
              <div class="w-full h-64 bg-center bg-cover rounded-t-3xl" data-background-image="/img/games/habitos/habitos.jpg" style="background-image: url('/img/games/habitos/habitos.jpg')">
                <p class="inline-flex items-center justify-center px-6 py-2 mt-4 ml-6 text-xs font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r lg:ml-4 xl:ml-6 from-dark-700 to-dark-800">
                  Salud
                </p>
              </div>
              <div class="w-full p-6 lg:p-4 xl:p-6">
                <div class="flex flex-wrap w-full">
                  <div class="flex items-center justify-start w-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-dark-400" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                      <line x1="16" y1="3" x2="16" y2="7"></line>
                      <line x1="8" y1="3" x2="8" y2="7"></line>
                      <line x1="4" y1="11" x2="20" y2="11"></line>
                      <line x1="11" y1="15" x2="12" y2="15"></line>
                      <line x1="12" y1="15" x2="12" y2="18"></line>
                    </svg>
                    <div class="ml-2 text-base font-medium leading-6 text-dark-400">
                      06 de Mayo 2024
                    </div>
                  </div>
                  <div class="flex justify-end w-1/2 space-x-1">
                    <svg class="w-6 h-6 text-dark-400" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" stroke="currentColor" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path class="st1" d="M21.8,10C15,14.5,7.1,23.4,5,29.4"/><path class="st0" d="M5.7,22.4c-0.1-2.6,0.2-6,2-7.8c8.9-8.9,21-11.3,21-11.3s-2.5,9.8-8.5,17.7l0,0H15l2.4,3.3  c-1.8,1.8-5.2,2.1-7.7,2"/>
                      </svg>
                  </div>
                </div>
                <h3 class="mt-6 text-xl font-semibold leading-6 text-white md:text-2xl">
                  Hábitos diarios
                </h3>
                <p class="mt-1 text-base leading-relaxed text-dark-300">
                  Configura tus hábitos y consigue puntos de temporada por completar todo el día.
                </p>
                <div v-if="perfil">
                  <div class="mt-3 text-base leading-relaxed text-dark-300 grid grid-cols-5 space-x-3" v-for="habit in perfil.habits" :key="habit.id">
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
              <div class="w-full h-64 bg-center bg-cover rounded-t-3xl" data-background-image="img/games/2elevado/portadaStores.jpg" style="background-image: url('/img/games/2elevado/portadaStores.jpg')">
                <p class="inline-flex items-center justify-center px-6 py-2 mt-4 ml-6 text-xs font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r lg:ml-4 xl:ml-6 from-dark-700 to-dark-800">
                  Puzzles
                </p>
              </div>
              <!--</nuxt-link>-->
              <div class="w-full p-6 lg:p-4 xl:p-6">
                <div class="flex flex-wrap w-full">
                  <div class="flex items-center justify-start w-1/2">
                    <!-- TablerIcon name: calendar -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-dark-400" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                      <line x1="16" y1="3" x2="16" y2="7"></line>
                      <line x1="8" y1="3" x2="8" y2="7"></line>
                      <line x1="4" y1="11" x2="20" y2="11"></line>
                      <line x1="11" y1="15" x2="12" y2="15"></line>
                      <line x1="12" y1="15" x2="12" y2="18"></line>
                    </svg>
                    <div class="ml-2 text-base font-medium leading-6 text-dark-400">
                      06 de Mayo 2024
                    </div>
                  </div>
                  <div class="flex justify-end w-1/2 space-x-1">
                    <!-- TablerIcon name: brand-tailwind -->
                    <svg class="w-6 h-6 text-dark-400" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" stroke="currentColor" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path class="st1" d="M21.8,10C15,14.5,7.1,23.4,5,29.4"/><path class="st0" d="M5.7,22.4c-0.1-2.6,0.2-6,2-7.8c8.9-8.9,21-11.3,21-11.3s-2.5,9.8-8.5,17.7l0,0H15l2.4,3.3  c-1.8,1.8-5.2,2.1-7.7,2"/>
                      </svg>
                  </div>
                </div>
                <h3 class="mt-6 text-xl font-semibold leading-6 text-white md:text-2xl">
                  2 Elevado
                </h3>
                <p class="mt-1 text-base leading-relaxed text-dark-300">
                  Un juego de sumar números iguales
                </p>
                <div class="mt-8 grid grid-cols-2 mt-3">
                  <a href="https://apps.apple.com/es/app/2-elevado/id6499581395" target="_blank" class="relative inline-flex items-center justify-center w-auto h-12 px-8 text-base font-medium leading-snug text-white md:h-14 group">
                    <span class="absolute top-0 left-0 z-10 block w-full h-full transition-all ease-in-out rounded-full bg-gradient-to-r duration-250 from-dark-800 to-dark-900 md:w-14 md:group-hover:w-full"></span>
                    <span class="relative z-20">Descargar iOS</span>
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.madfenix.twoelevado" target="_blank" class="relative inline-flex items-center justify-center w-auto h-12 px-8 text-base font-medium leading-snug text-white md:h-14 group">
                    <span class="absolute top-0 left-0 z-10 block w-full h-full transition-all ease-in-out rounded-full bg-gradient-to-r duration-250 from-dark-800 to-dark-900 md:w-14 md:group-hover:w-full"></span>
                    <span class="relative z-20">Descargar Android</span>
                  </a>
                  <div class="col-span-2 mt-3">
                    <a href="https://iamvalentigamez.itch.io/2elevado" target="_blank" class="relative inline-flex items-center justify-center w-auto h-12 px-8 text-base font-medium leading-snug text-white md:h-14 group">
                      <span class="absolute top-0 left-0 z-10 block w-full h-full transition-all ease-in-out rounded-full bg-gradient-to-r duration-250 from-dark-800 to-dark-900 md:w-14 md:group-hover:w-full"></span>
                      <span class="relative z-20">Jugar en navegador</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Case Study Hero -->
    <section class="px-4 py-12 md:py-16 sm:px-6 lg:px-8">
      <div class="max-w-screen-xl mx-auto">
        <!-- Hero text -->
        <div class="w-full max-w-3xl mx-auto text-center lg:max-w-5xl">
          <p
            class="inline-flex items-center justify-center px-6 py-2 text-sm font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r from-dark-600 to-dark-700"
          >
            Nos aliamos contigo para crecer juntos
          </p>
          <h1
            class="mt-4 text-4xl font-extrabold text-white md:mt-5 sm:text-5xl md:text-6xl"
          >
            Creamos juegos que mueven comunidades
          </h1>
        </div>
      </div>

      <div class="grid justify-center w-full gap-12 mx-auto mt-12 lg:grid-cols-2 lg:gap-8 lg:mt-16 lg:max-w-screen-xl xl:max-w-screen-xl lg:justify-start">
        <!-- Image collage right -->
        <div class="flex items-center justify-center max-w-screen-md lg:max-w-full">
          <div class="grid h-full grid-flow-col grid-rows-2 gap-4">
            <div class="shadow-xl rounded-3xl">
              <img src="/img/games/bookersVillage/bookersVillageMonje.jpg" class="object-cover object-center w-full h-full rounded-3xl">
            </div>
            <div class="shadow-xl rounded-3xl">
              <img src="/img/games/bookersVillage/bookersVillageGranjero.jpg" class="object-cover object-center w-full h-full rounded-3xl">
            </div>
            <div class="row-span-2 shadow-xl rounded-3xl">
              <img src="/img/games/bookersVillage/bookersVillageFighter.jpg" class="object-cover object-center w-full h-full rounded-3xl">
            </div>
          </div>
        </div>

        <!-- Image collage left -->
        <div class="flex items-center justify-center max-w-screen-md lg:max-w-full">
          <div class="grid h-full grid-flow-col grid-rows-2 gap-4">
            <div class="row-span-2 shadow-xl rounded-3xl">
              <img src="/img/games/bookersVillage/bookersVillageEstudiante.jpg" class="object-cover object-center w-full h-full rounded-3xl">
            </div>
            <div class="shadow-xl rounded-3xl">
              <img src="/img/games/bookersVillage/bookersVillageDoctor.jpg" class="object-cover object-center w-full h-full rounded-3xl">
            </div>
            <div class="shadow-xl rounded-3xl">
              <img src="/img/games/bookersVillage/bookersVillageAliado.jpg" class="object-cover object-center w-full h-full rounded-3xl">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Buscamos creadores section -->
    <section class="max-w-screen-xl px-4 py-12 mx-auto md:py-16 sm:px-6 lg:px-8">
      <!-- CTA card -->
      <div class="relative py-16 rounded-3xl bg-dark-700 lg:py-20">
        <!-- Right background diagonal -->
        <svg class="absolute inset-y-0 top-0 z-20 w-1/4 h-full right-1/4 text-dark-700" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
          <polygon points="0,0 100,0 0,100"></polygon>
        </svg>
        <div class="absolute inset-y-0 z-10 w-1/2 h-full left-1/2 bg-dark-800 rounded-r-3xl"></div>

        <!-- CTA content -->
        <div class="relative z-30 flex flex-col items-center justify-center px-4 mx-auto text-center sm:px-16 lg:flex-row lg:text-left">
          <div class="max-w-lg text-2xl font-bold sm:text-4xl lg:w-1/2">
            <h5 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              #BookersVillage
            </h5>
          </div>
          <div class="flex justify-center max-w-lg mt-10 lg:w-1/2 lg:mt-0 lg:justify-end">
            <a href="https://twitter.com/search?q=%23BookersVillage&src=typed_query&f=top" target="_blank" class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900">
              Consulta el hashtag
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Diagonal separator -->
    <div class="relative w-full h-16 md:h-32 lg:h-48">
      <svg class="absolute w-full h-full text-dark-800" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
        <polygon points="0,0 0,100 100,100"></polygon>
      </svg>
    </div>

    <!-- What we do -->
    <section class="px-4 py-10 md:py-12 bg-dark-800 sm:px-6 lg:px-8">
      <!-- Section text -->
      <div class="max-w-xl mx-auto text-center md:max-w-2xl lg:text-left lg:max-w-screen-xl">
        <p class="inline-flex items-center justify-center px-6 py-2 text-sm font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r from-dark-600 to-dark-700">
          Qué hacemos
        </p>
        <div class="grid w-full gap-6 mt-6 lg:grid-cols-5">
          <div class="lg:col-span-3">
            <h2 class="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              Creamos juegos que mueven comunidades
            </h2>
          </div>

          <div class="lg:col-span-2">
            <p class="text-xl text-dark-300">
              Desde torneos a premios personalizados en nuestro pase de temporada.
            </p>
          </div>
        </div>
      </div>

      <!-- Section content -->
      <div class="grid justify-center w-full gap-12 mx-auto mt-12 lg:grid-cols-2 lg:gap-8 lg:mt-16 lg:max-w-screen-xl xl:max-w-screen-xl lg:justify-start">
        <!-- Features list -->
        <div>
          <!-- Item -->
          <div class="w-full">
            <div class="max-w-lg mx-auto lg:mr-auto xl:mx-auto">
              <div class="relative flex w-full px-8 py-6 shadow-xl rounded-3xl bg-dark-700 sm:px-10">
                <div class="text-center sm:flex sm:text-left">
                  <div class="w-full sm:w-1/5">
                    <div class="flex items-center justify-center w-12 h-12 mx-auto bg-gradient-to-r rounded-2xl text-dark-300 sm:mx-0 from-dark-800 to-dark-900">
                      <!-- TablerIcon name: artboard -->
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                      </svg>
                    </div>
                  </div>
                  <div class="w-full mt-3 sm:mt-0">
                    <h5 class="text-lg font-semibold text-white">
                      Torneos
                    </h5>
                    <p class="mt-1 text-base text-dark-300">
                      Intercomunitarios o personalizados para proyectos amigos. Nuestro objetivo es que las tribus amigas se entretengan, ganen premios y hagan ruido en redes sociales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Item -->
          <div class="w-full mt-8 lg:mt-5 xl:mt-8 2xl:mt-10 xl:pr-18 2xl:pr-28">
            <div class="max-w-lg mx-auto lg:mr-auto xl:mx-auto">
              <div class="flex w-full px-8 py-6 shadow-xl rounded-3xl bg-dark-700 sm:px-10">
                <div class="text-center sm:flex sm:text-left">
                  <div class="w-full sm:w-1/5">
                    <div class="flex items-center justify-center w-12 h-12 mx-auto bg-gradient-to-r rounded-2xl text-dark-300 sm:mx-0 from-dark-800 to-dark-900">
                      <!-- TablerIcon name: code -->
                      <svg class="w-6 h-6" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" stroke="currentColor" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path class="st1" d="M21.8,10C15,14.5,7.1,23.4,5,29.4"/><path class="st0" d="M5.7,22.4c-0.1-2.6,0.2-6,2-7.8c8.9-8.9,21-11.3,21-11.3s-2.5,9.8-8.5,17.7l0,0H15l2.4,3.3  c-1.8,1.8-5.2,2.1-7.7,2"/>
                      </svg>
                    </div>
                  </div>
                  <div class="w-full mt-3 sm:mt-0">
                    <h5 class="text-lg font-semibold text-white">
                      Plumas fénix
                    </h5>
                    <p class="mt-1 text-base text-dark-300">
                      Son un reclamo para los juegos que proponemos ya que te dan una pequeña ventaja. Solo se consiguen mediante acciones con nosotros o nuestros aliados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Item -->
          <div class="w-full mt-8 lg:mt-5 xl:mt-8 2xl:mt-10">
            <div class="max-w-lg mx-auto lg:mr-auto xl:mx-auto">
              <div class="flex w-full px-8 py-6 shadow-xl rounded-3xl bg-dark-700 sm:px-10">
                <div class="text-center sm:flex sm:text-left">
                  <div class="w-full sm:w-1/5">
                    <div class="flex items-center justify-center w-12 h-12 mx-auto bg-gradient-to-r rounded-2xl text-dark-300 sm:mx-0 from-dark-800 to-dark-900">
                      <!-- TablerIcon name: tool -->
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                      </svg>
                    </div>
                  </div>
                  <div class="w-full mt-3 sm:mt-0">
                    <h5 class="text-lg font-semibold text-white">
                      Pase de temporada
                    </h5>
                    <p class="mt-1 text-base text-dark-300">
                      Nuestros jugadores ganan premios con cada nivel superado. Podemos agregar ventajas de proyectos amigos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Image collage -->
        <div class="flex items-center justify-center max-w-screen-md lg:max-w-full">
          <div class="grid h-full grid-flow-col grid-rows-2 gap-4">
            <div class="row-span-2 shadow-xl rounded-3xl">
              <img src="/img/home/personaJugandoEnMadFenixGame.jpg" class="object-cover object-right w-full h-full rounded-3xl">
            </div>
            <div class="shadow-xl rounded-3xl">
              <img src="/img/home/persona2JugandoEnMadFenixGame.jpg" class="object-cover object-center w-full h-full rounded-3xl">
            </div>
            <div class="shadow-xl rounded-3xl">
              <img src="/img/home/persona3JugandoEnMadFenixGame.jpg" class="object-cover object-center w-full h-full rounded-3xl">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Diagonal separator -->
    <div class="relative w-full h-16 bg-dark-800 md:h-32 lg:h-48">
      <svg class="absolute w-full h-full text-dark-900" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
        <polygon points="0,100 100,100 100,0"></polygon>
      </svg>
    </div>

    <section class="px-4 pt-6 pb-12 mx-auto max-w-screen-2xl md:pb-16 sm:px-6 lg:px-8">
      <!-- Hero card -->
      <div class="relative shadow-xl rounded-3xl sm:overflow-hidden bg-dark-700">
        <!-- Right background diagonal -->
        <svg class="absolute inset-y-0 z-20 w-1/4 h-full right-1/4 text-dark-700" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
          <polygon points="0,0 100,0 0,100"></polygon>
        </svg>
        <div class="absolute inset-y-0 z-10 w-1/2 h-full left-1/2 bg-dark-800 rounded-r-3xl"></div>

        <!-- Hero card content -->
        <div class="relative max-w-screen-xl px-4 py-12 mx-auto lg:grid lg:grid-cols-2 lg:auto-rows-max lg:gap-x-8 xl:gap-x-12 sm:px-6 sm:py-12 lg:py-12 lg:px-8">
          <!-- Card content text-->
          <div class="flex flex-col items-center justify-center lg:items-start">
            <p class="z-30 inline-flex items-center justify-center px-6 py-2 text-sm font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r from-dark-800 to-dark-900">
              Dragones Custodio
            </p>
            <div class="z-30 w-full max-w-lg mx-auto mt-6 text-center lg:text-left lg:max-w-none md:max-w-2xl">
              <h1 class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                La colección matriz de Mad Fénix
              </h1>
              <p class="mt-6 text-xl text-dark-300">
                Los Dragones Custodio simbolizan los guardianes de la esencia del proyecto. Tienen las mayores utilidades y son el activo digital más preciado de Mad Fenix Games.
              </p>
            </div>
            <!-- Hero buttons -->
            <div class="z-30 mt-10 sm:flex sm:justify-center lg:justify-start">
              <a class="flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-white rounded-full h-14 duration-250 text-dark-900 hover:text-white focus:outline-none hover:bg-dark-900" href="/dragones-custodio#utilidades">
                Ver utilidades
              </a>
            </div>
          </div>

          <!-- Hero image -->
          <div class="flex items-center justify-center max-w-xl mx-auto mt-12 sm:mt-16 lg:mt-0 lg:max-w-none">
            <img src="/img/dragones-custodio/dragon_fenix.png" class="z-30 object-cover w-auto h-3/4 shadow-md rounded-3xl">
          </div>
        </div>
      </div>
    </section>

    <!-- Blog section -->
    <section class="px-4 py-12 md:py-16 sm:px-6 lg:px-8">
      <!-- Section text -->
      <div class="max-w-xl mx-auto text-center md:max-w-2xl lg:text-left lg:max-w-screen-xl">
        <p class="inline-flex items-center justify-center px-6 py-2 text-sm font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r from-dark-600 to-dark-700">
          Noticias
        </p>
        <div class="grid w-full gap-6 mt-6 lg:grid-cols-5">
          <div class="lg:col-span-3">
            <h2 class="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              La actualidad de
              <br><span class="font-ancient-god"><span class="text-white transition duration-200 ease-in-out group-hover:text-dark-300">Mad</span> <span class="transition duration-200 ease-in-out text-dark-300 group-hover:text-white">Fénix</span></span>
            </h2>
          </div>

          <div class="lg:col-span-2">
            <p class="text-xl text-dark-300">
              Lanzamientos de nuestros videojuegos, torneos, game jams, temporadas y más
            </p>
          </div>
        </div>
      </div>

      <div class="max-w-screen-xl mx-auto mt-10 md:mt-12 lg:mt-16">
        <!-- Blog container -->
        <div class="order-2 mt-12 overflow-hidden md:mt-0 md:order-1 md:col-span-9">
          <!-- Posts container -->
          <div class="grid gap-6 lg:grid-cols-2 md:gap-8">
            <!-- Post -->
            <div class="max-w-lg mx-auto shadow-xl rounded-3xl bg-dark-700">
              <nuxt-link to="/blog/2024-03-12-tokens-mad-fenix">
                <div class="w-full h-64 bg-center bg-cover rounded-t-3xl" data-background-image="images/work-image-01.jpg" style="background-image: url('/img/blog/tokensWeb3.jpg')">
                  <p class="inline-flex items-center justify-center px-6 py-2 mt-4 ml-6 text-xs font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r lg:ml-4 xl:ml-6 from-dark-700 to-dark-800">
                    Bases
                  </p>
                </div>
              </nuxt-link>
              <div class="w-full p-6 lg:p-4 xl:p-6">
                <div class="flex flex-wrap w-full">
                  <div class="flex items-center justify-start w-1/2">
                    <!-- TablerIcon name: calendar -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-dark-400" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                      <line x1="16" y1="3" x2="16" y2="7"></line>
                      <line x1="8" y1="3" x2="8" y2="7"></line>
                      <line x1="4" y1="11" x2="20" y2="11"></line>
                      <line x1="11" y1="15" x2="12" y2="15"></line>
                      <line x1="12" y1="15" x2="12" y2="18"></line>
                    </svg>
                    <div class="ml-2 text-base font-medium leading-6 text-dark-400">
                      12 de Marzo 2024
                    </div>
                  </div>
                  <div class="flex justify-end w-1/2 space-x-1">
                    <!-- TablerIcon name: brand-tailwind -->
                    <svg class="w-6 h-6 text-dark-400" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" stroke="currentColor" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path class="st1" d="M21.8,10C15,14.5,7.1,23.4,5,29.4"/><path class="st0" d="M5.7,22.4c-0.1-2.6,0.2-6,2-7.8c8.9-8.9,21-11.3,21-11.3s-2.5,9.8-8.5,17.7l0,0H15l2.4,3.3  c-1.8,1.8-5.2,2.1-7.7,2"/>
                      </svg>
                  </div>
                </div>
                <nuxt-link to="/blog/2024-03-12-tokens-mad-fenix">
                  <h3 class="mt-6 text-xl font-semibold leading-6 text-white md:text-2xl">
                    Tokens de Mad Fénix
                  </h3>
                </nuxt-link>
                <p class="mt-1 text-base leading-relaxed text-dark-300">
                  Conceptualización de los tres tokens del ecosistema: Plumas Fénix, Piezas de Oro y Dragones Custodio.
                </p>
                <div class="mt-8">
                  <nuxt-link to="/blog/2024-03-12-tokens-mad-fenix" class="relative inline-flex items-center justify-center w-auto h-12 px-8 text-base font-medium leading-snug text-white md:h-14 group">
                    <span class="absolute top-0 left-0 z-10 block w-full h-full transition-all ease-in-out rounded-full bg-gradient-to-r duration-250 from-dark-800 to-dark-900 md:w-14 md:group-hover:w-full"></span>
                    <span class="relative z-20">Ver noticia</span>
                  </nuxt-link>
                </div>
              </div>
            </div>


            <!-- Post -->
            <div class="max-w-lg mx-auto shadow-xl rounded-3xl bg-dark-700">
              <nuxt-link to="/blog/2024-01-22-plataforma-web">
                <div class="w-full h-64 bg-center bg-cover rounded-t-3xl" data-background-image="images/work-image-01.jpg" style="background-image: url('/img/blog/encuentraTuTribu.jpg')">
                  <p class="inline-flex items-center justify-center px-6 py-2 mt-4 ml-6 text-xs font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r lg:ml-4 xl:ml-6 from-dark-700 to-dark-800">
                    Plataforma web
                  </p>
                </div>
              </nuxt-link>
              <div class="w-full p-6 lg:p-4 xl:p-6">
                <div class="flex flex-wrap w-full">
                  <div class="flex items-center justify-start w-1/2">
                    <!-- TablerIcon name: calendar -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-dark-400" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                      <line x1="16" y1="3" x2="16" y2="7"></line>
                      <line x1="8" y1="3" x2="8" y2="7"></line>
                      <line x1="4" y1="11" x2="20" y2="11"></line>
                      <line x1="11" y1="15" x2="12" y2="15"></line>
                      <line x1="12" y1="15" x2="12" y2="18"></line>
                    </svg>
                    <div class="ml-2 text-base font-medium leading-6 text-dark-400">
                      22 de Enero 2024
                    </div>
                  </div>
                  <div class="flex justify-end w-1/2 space-x-1">
                    <!-- TablerIcon name: brand-tailwind -->
                    <svg class="w-6 h-6 text-dark-400" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" stroke="currentColor" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path class="st1" d="M21.8,10C15,14.5,7.1,23.4,5,29.4"/><path class="st0" d="M5.7,22.4c-0.1-2.6,0.2-6,2-7.8c8.9-8.9,21-11.3,21-11.3s-2.5,9.8-8.5,17.7l0,0H15l2.4,3.3  c-1.8,1.8-5.2,2.1-7.7,2"/>
                      </svg>
                  </div>
                </div>
                <nuxt-link to="/blog/2024-01-22-plataforma-web">
                  <h3 class="mt-6 text-xl font-semibold leading-6 text-white md:text-2xl">
                    Lanzamiento de la página web
                  </h3>
                </nuxt-link>
                <p class="mt-1 text-base leading-relaxed text-dark-300">
                  Torneos intercomunitarios y personalizados, el lanzamiento de nuestro primer juego y las exclusivas Plumas Fénix.
                </p>
                <div class="mt-8">
                  <nuxt-link to="/blog/2024-01-22-plataforma-web" class="relative inline-flex items-center justify-center w-auto h-12 px-8 text-base font-medium leading-snug text-white md:h-14 group">
                    <span class="absolute top-0 left-0 z-10 block w-full h-full transition-all ease-in-out rounded-full bg-gradient-to-r duration-250 from-dark-800 to-dark-900 md:w-14 md:group-hover:w-full"></span>
                    <span class="relative z-20">Ver noticia</span>
                  </nuxt-link>
                </div>
              </div>
            </div>

            <!-- Post -->
            <div class="max-w-lg mx-auto shadow-xl rounded-3xl bg-dark-700">
              <nuxt-link to="/blog/2024-01-22-buscamos-creadores-de-contenido">
                <div class="w-full h-64 bg-center bg-cover rounded-t-3xl" data-background-image="images/work-image-01.jpg" style="background-image: url('/img/blog/buscamosCreadores.jpg')">
                  <p class="inline-flex items-center justify-center px-6 py-2 mt-4 ml-6 text-xs font-medium tracking-wide text-white rounded-r-full rounded-tl-full bg-gradient-to-r lg:ml-4 xl:ml-6 from-dark-700 to-dark-800">
                    Colaboradores
                  </p>
                </div>
              </nuxt-link>
              <div class="w-full p-6 lg:p-4 xl:p-6">
                <div class="flex flex-wrap w-full">
                  <div class="flex items-center justify-start w-1/2">
                    <!-- TablerIcon name: calendar -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-dark-400" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                      <line x1="16" y1="3" x2="16" y2="7"></line>
                      <line x1="8" y1="3" x2="8" y2="7"></line>
                      <line x1="4" y1="11" x2="20" y2="11"></line>
                      <line x1="11" y1="15" x2="12" y2="15"></line>
                      <line x1="12" y1="15" x2="12" y2="18"></line>
                    </svg>
                    <div class="ml-2 text-base font-medium leading-6 text-dark-400">
                      22 de Enero 2024
                    </div>
                  </div>
                  <div class="flex justify-end w-1/2 space-x-1">
                    <!-- TablerIcon name: brand-tailwind -->
                    <svg class="w-6 h-6 text-dark-400" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" stroke="currentColor" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path class="st1" d="M21.8,10C15,14.5,7.1,23.4,5,29.4"/><path class="st0" d="M5.7,22.4c-0.1-2.6,0.2-6,2-7.8c8.9-8.9,21-11.3,21-11.3s-2.5,9.8-8.5,17.7l0,0H15l2.4,3.3  c-1.8,1.8-5.2,2.1-7.7,2"/>
                      </svg>
                  </div>
                </div>
                <nuxt-link to="/blog/2024-01-22-buscamos-creadores-de-contenido">
                  <h3 class="mt-6 text-xl font-semibold leading-6 text-white md:text-2xl">
                    Buscamos Creadores de Contenido
                  </h3>
                </nuxt-link>
                <p class="mt-1 text-base leading-relaxed text-dark-300">
                  Mad Fénix busca creadores de contenido apasionad@s y creativos para aliarse y crecer juntos.
                </p>
                <div class="mt-8">
                  <nuxt-link to="/blog/2024-01-22-buscamos-creadores-de-contenido" class="relative inline-flex items-center justify-center w-auto h-12 px-8 text-base font-medium leading-snug text-white md:h-14 group">
                    <span class="absolute top-0 left-0 z-10 block w-full h-full transition-all ease-in-out rounded-full bg-gradient-to-r duration-250 from-dark-800 to-dark-900 md:w-14 md:group-hover:w-full"></span>
                    <span class="relative z-20">Ver noticia</span>
                  </nuxt-link>
                </div>
              </div>
            </div>

            <!-- Post 3 -->


          </div>
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
  middleware: 'basic',

  data() {
    return {
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      api: null,
      perfil: null,
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
    this.setUserCookies();

    const { $api } = useNuxtApp();
    this.api = $api;
    this.pwaInstall();
    this.getPerfil();
  },

  methods: {
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
  }
}
</script>
