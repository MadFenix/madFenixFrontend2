<template>
    <div v-if="user.user && perfil">
      <div class="md:grid md:grid-cols-3 md:items-center border-y-2 border-madfenix-naranja bg-madfenix-gris">
        <div class="relative col-span-1 h-full max-w-[380px]">
          <img :src="perfil.avatar" alt="Avatar perfil Mad Fénix" title="Avatar perfil Mad Fénix" class="h-full" />
          <a
              @click="categorySelected = categoryAvatars; subcategorySelected = null; showAvatarsModal = true"
              class="absolute right-3 top-3 text-center m-auto justify-center px-8 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer"
          >
            <div class="flex items-center justify-center h-full w-full text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </div>
          </a>
          <a
              @click="categorySelected = categoryEstados; subcategorySelected = null; showEstadosModal = true"
              class="absolute left-1/2 transform -translate-x-1/2 bottom-3 w-2/3 text-sm text-center m-auto justify-center px-8 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer"
              >
            <div class="flex items-center justify-center h-full w-full text-center" v-html="perfil.description" />
          </a>
        </div>

        <div class="text-right col-span-1 px-6">
          <div v-html="'@' + user.user.name" class="text-sm lg:text-xl font-black text-madfenix-naranja my-3" />
          <div v-html="user.user.email" class="text-sm lg:text-xl text-white my-3" />
          <div v-if="perfil && perfil.count_refered > 0" v-html="'Personas referidas: ' + perfil.count_refered" class="text-sm lg:text-xl text-white my-3" />
          <div class="flex space-x-3 justify-end my-3">
            <div v-if="perfil && perfil.user_twitch" class="flex items-center space-x-3 text-white text-center">
              <a @click="desconectarTwitch()" class="cursor-pointer">
                <img src="/img/perfil/twitch_account.svg" alt="Desconectar Twitch" title="Desconectar Twitch" class="w-[50px] lg:w-[70px]">
              </a>
              <span v-html="perfil.user_twitch" />
            </div>
            <div v-else>
              <a :href="'https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=2wbjjwkzyy9t68a8ex5b4fsz7kfc37&redirect_uri=https%3A%2F%2Fapi.madfenix.com%2Fapi%2Ftwitch%2FconnectAccount&scope=user%3Aread%3Aemail&state=user' + user.user.id" class="cursor-pointer">
                <img src="/img/perfil/twitch_account.svg" alt="Conectar Twitch" title="Conectar Twitch" class="w-[50px] lg:w-[70px]">
              </a>
            </div>

            <div>
              <a @click="logout()" class="cursor-pointer">
                <img src="/img/perfil/logout.svg" alt="Logout" title="Logout" class="w-[50px] lg:w-[70px]">
              </a>
            </div>
          </div>
        </div>

        <div class="col-span-1 px-6">
          <div v-if="perfil && perfil.hedera_wallet" class="my-4 w-full text-white text-center text-sm lg:text-xl">
            Tu cartera de hedera vinculada: <span v-html="perfil.hedera_wallet" />.&nbsp;
          </div>
          <div v-else-if="perfil && perfil.hedera_wallet_check" class="my-4">
            <nuxt-link to="/vincular-wallet-hedera-2"  class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Vincular hedera
            </nuxt-link>
          </div>
          <div v-else class="my-4">
            <nuxt-link to="/vincular-wallet-hedera"  class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Vincular hedera
            </nuxt-link>
          </div>

          <div v-if="perfil && perfil.referred_code_from" class="my-4 w-full text-white text-center text-sm lg:text-xl">
            Tu referido: <span v-html="perfil.referred_code_from" />.&nbsp;
          </div>
          <div v-else class="my-4">
            <nuxt-link to="/vincular-codigo-referido"  class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Vincular código de referido
            </nuxt-link>
          </div>

          <div v-if="perfil && perfil.referred_code" class="my-4 w-full text-white text-center text-sm lg:text-xl">
            Tu código de referido: <span v-html="perfil.referred_code" />.&nbsp;
          </div>
          <div v-else class="my-4">
            <nuxt-link to="/crear-codigo-referido"  class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Crear código de referido
            </nuxt-link>
          </div>

          <div v-if="perfil && perfil.user_steam" class="my-4 w-full text-white text-center hidden text-sm lg:text-xl">
            Conectad@ con <span v-html="perfil.user_steam" />.&nbsp;
            <a @click="desconectarSteam()" class="text-white underline font-semibold hover:no-underline">
              Desconectar Steam
            </a>
          </div>
          <div v-else class="my-4 hidden text-sm lg:text-xl">
            <a @click="conectarSteam()" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Conectar Steam
            </a>
          </div>

          <div class="my-4">
            <nuxt-link to="/eliminar-cuenta" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
              Eliminar cuenta
            </nuxt-link>
          </div>
        </div>
      </div>

      <section class="max-w-screen-xl px-4 py-7 pt-12 mx-auto md:py-7 md:pt-16 sm:px-6 lg:px-8">
        <div class="relative z-30 grid grid-cols-1 sm:grid-cols-12 items-center justify-center mx-auto text-center px-4 sm:px-16 lg:flex-row lg:text-left">
          <div class="sm:col-span-3 flex items-center py-6 sm:py-0 px-6 h-full text-2xl font-bold sm:text-4xl rounded-tr-3xl sm:rounded-tr-none rounded-tl-3xl sm:rounded-bl-3xl bg-madfenix-gris">
            <h5 class="font-extrabold tracking-tight text-white text-size-token-number text-center w-full">
              <span v-if="perfil" v-html="perfil.oro" /><span v-else>...</span>
              <p v-if="perfil && perfil.oro_hedera" v-html="perfil.oro_hedera + ' RED'" class="mt-4 text-xl" />
            </h5>
          </div>
          <div class="sm:col-span-2 flex items-center justify-center bg-madfenix-azul">
            <img src="/img/perfil/oro.png" alt="Oro" class="absolute z-50 h-1/2 sm:h-full" />
            <svg class="inset-y-0 z-40 h-full text-madfenix-gris" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
          </div>
          <div class="sm:col-span-7 px-3 sm:px-0 py-3 sm:py-0 flex space-x-3 items-center justify-center h-full bg-madfenix-azul sm:rounded-tr-3xl rounded-bl-3xl sm:rounded-bl-none rounded-br-3xl sm:mr-12 lg:justify-end">
            <h5 class="grow font-extrabold tracking-tight text-white text-size-token">
              Oros
            </h5>
            <div class="botones-tokens">
              <nuxt-link to="/canjear-cupon-oro" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                Canjea un cupón
              </nuxt-link>
              <br>
              <nuxt-link to="/transfiere-oro-a-hedera-previo1" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                Transfiere Oro
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-screen-xl px-4 py-7 mx-auto md:py-7 sm:px-6 lg:px-8">
        <div class="relative z-30 grid grid-cols-1 sm:grid-cols-12 items-center justify-center mx-auto text-center px-4 sm:px-16 lg:flex-row lg:text-left">
          <div class="sm:col-span-3 flex items-center py-6 sm:py-0 px-6 h-full text-2xl font-bold sm:text-4xl rounded-tr-3xl sm:rounded-tr-none rounded-tl-3xl sm:rounded-bl-3xl bg-madfenix-gris">
            <h5 class="font-extrabold tracking-tight text-white text-size-token-number text-center w-full">
              <span v-if="perfil" v-html="perfil.plumas" /><span v-else>...</span>
              <p v-if="perfil && perfil.plumas_hedera" v-html="perfil.plumas_hedera + ' RED'" class="mt-4 text-xl" />
            </h5>
          </div>
          <div class="sm:col-span-2 flex items-center justify-center bg-madfenix-azul">
            <img src="/img/perfil/pluma.png" alt="Plumas" class="absolute z-50 h-1/2 sm:h-full" />
            <svg class="inset-y-0 z-40 h-full text-madfenix-gris" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
          </div>
          <div class="sm:col-span-7 px-3 sm:px-0 py-3 sm:py-0 flex items-center space-x-3 justify-center h-full bg-madfenix-azul sm:rounded-tr-3xl rounded-bl-3xl sm:rounded-bl-none rounded-br-3xl sm:mr-12 lg:justify-end">
            <h5 class="grow font-extrabold tracking-tight text-white text-size-token">
              Plumas
            </h5>
            <div class="botones-tokens">
              <nuxt-link to="/canjear-cupon" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                Canjea un cupón
              </nuxt-link>
              <br>
              <nuxt-link to="/transfiere-plumas-a-hedera-previo1" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                Transfiere Plumas
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-screen-xl px-4 py-7 pb-12 mx-auto md:py-7 md:pb-16 sm:px-6 lg:px-8">
        <div class="relative z-30 grid grid-cols-1 sm:grid-cols-12 items-center justify-center mx-auto text-center px-4 sm:px-16 lg:flex-row lg:text-left">
          <div class="sm:col-span-3 flex items-center py-6 sm:py-0 px-6 h-full text-2xl font-bold sm:text-4xl rounded-tr-3xl sm:rounded-tr-none rounded-tl-3xl sm:rounded-bl-3xl bg-madfenix-gris">
            <h5 class="font-extrabold tracking-tight text-white text-size-token-number text-center w-full">
              <span v-html="pollsNotAnswered" />
            </h5>
          </div>
          <div class="sm:col-span-2 flex items-center justify-center bg-madfenix-azul">
            <img src="/img/perfil/adivinacion.png" alt="Influye" class="absolute z-50 h-1/2 sm:h-full" />
            <svg class="inset-y-0 z-40 h-full text-madfenix-gris" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
          </div>
          <div class="sm:col-span-7 px-3 sm:px-0 py-3 sm:py-0 flex items-center space-x-3 justify-center h-full bg-madfenix-azul sm:rounded-tr-3xl rounded-bl-3xl sm:rounded-bl-none rounded-br-3xl sm:mr-12 lg:justify-end">
            <h5 class="grow font-extrabold tracking-tight text-white text-size-token">
              Destino
            </h5>
            <div class="botones-tokens">
              <nuxt-link to="/influye" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris text-sm font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                Influye en Névoran
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <div v-if="perfil && perfil.nft_categories" class="flex flex-wrap justify-center space-x-3 max-w-screen-xl mx-auto sm:w-3/4 ">
        <div class="py-2 md:py-2" v-for="(nftCategory, indexNftCategory) in perfil.nft_categories" :key="indexNftCategory">
          <a @click="categorySelected = nftCategory; subcategorySelected = null" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
            <span v-html="nftCategory.name" />
          </a>
        </div>
      </div>

      <div v-if="perfil && categorySelected" class="flex flex-wrap justify-center space-x-3 max-w-screen-xl mx-auto sm:w-3/4 ">
        <div class="py-2 md:py-2" v-for="(nftSubcategory, indexNftSubcategory) in categorySelected.subcategories" :key="indexNftSubcategory">
          <a @click="subcategorySelected = nftSubcategory" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
            <span v-html="nftSubcategory" />
          </a>
        </div>
      </div>

      <div class="max-w-screen-xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 px-6">
        <div v-if="nftCollections" v-for="nftCollection in nftCollections" :key="nftCollection.nft_id">
          <div class="relative rounded-tl-3xl rounded-br-3xl min-h-[300px] mx-3 mt-12 sm:mx-auto bg-madfenix-gris border border-madfenix-naranja overflow-hidden">
            <img :src="nftCollection.featured_image" class="absolute" style="min-width: 300px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
            <div class="relative min-h-[300px] mb-0 p-6 z-50">
              &nbsp;
            </div>
          </div>
          <div class="relative sm:mx-auto px-4 z-50 contenedor-botones-formularios">
            <div class="flex justify-center">
              <div class="flex space-x-3">
                <a
                    v-if="nftCollection.token_number > 0"
                    :href="'https://market.kabila.app/es/collections/' + nftCollection.token_number + '/items'"
                    target="_blank"
                    class="flex justify-center items-center text-center m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </a>
                <NuxtLink
                    :to="'/coleccion/?nft_id=' + nftCollection.nft_id"
                    class="flex items-center grow m-auto justify-center px-8 py-4 btn-madfenix text-xs text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer"
                    v-html="nftCollection.name + ' (' + countNFTsByid(nftCollection.nft_id) + ')'"
                />
              </div>
            </div>
          </div>
        </div>
        <span v-else>&nbsp;</span>
      </div>

      <div v-if="showAvatarsModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden bg-madfenix-gris bg-opacity-50 fixed top-0 right-0 left-0 z-50 w-full h-modal md:h-full">
        <div class="flex items-center justify-center p-4 w-full h-screen">
          <!-- Modal content -->
          <div class="bg-madfenix-gris text-madfenix-blanco rounded-lg shadow border border-madfenix-blanco">
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b border-madfenix-blanco">
              <h3 class="text-xl font-semibold">
                Avatares
              </h3>
              <button type="button" @click="showAvatarsModal = false" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Cerrar pantalla</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="w-full p-3 overflow-y-auto" style="height: 500px">
              <div v-if="perfil && categorySelected" class="flex flex-wrap justify-center space-x-3 max-w-screen-xl mx-auto">
                <div class="py-2 md:py-2" v-for="(nftSubcategory, indexNftSubcategory) in categorySelected.subcategories" :key="indexNftSubcategory">
                  <a @click="subcategorySelected = nftSubcategory" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                    <span v-html="nftSubcategory" />
                  </a>
                </div>
              </div>

              <div class="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-7 px-3 sm:px-6">
                <template v-if="nftCollections" v-for="nftCollection in nftCollections" :key="nftCollection.nft_id">
                  <div v-if="countNFTsByid(nftCollection.nft_id) > 0 || nftCollection.subcategory == 'Gratis'">
                    <div class="relative rounded-tl-3xl rounded-br-3xl min-h-[150px] mx-3 mt-12 sm:mx-auto bg-madfenix-gris border border-madfenix-naranja overflow-hidden">
                      <img :src="nftCollection.featured_image" class="absolute" style="min-width: 150px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
                      <div class="relative min-h-[150px] mb-0 p-6 z-50">
                        &nbsp;
                      </div>
                    </div>
                    <div class="relative sm:mx-auto px-4 z-50 contenedor-botones-formularios">
                      <div class="flex justify-center">
                        <div class="flex space-x-3">
                          <a
                              v-if="nftCollection.token_number > 0"
                              :href="'https://market.kabila.app/es/collections/' + nftCollection.token_number + '/items'"
                              target="_blank"
                              class="flex justify-center items-center text-center m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                          </a>
                          <NuxtLink
                              @click="updateAvatar(nftCollection)"
                              class="flex items-center grow m-auto justify-center px-8 py-4 btn-madfenix text-xs text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer"
                              v-html="'Asignar'"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showEstadosModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden bg-madfenix-gris bg-opacity-50 fixed top-0 right-0 left-0 z-50 w-full h-modal md:h-full">
        <div class="flex items-center justify-center p-4 w-full h-screen">
          <!-- Modal content -->
          <div class="bg-madfenix-gris text-madfenix-blanco rounded-lg shadow border border-madfenix-blanco">
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b border-madfenix-blanco">
              <h3 class="text-xl font-semibold">
                Estados
              </h3>
              <button type="button" @click="showEstadosModal = false" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Cerrar pantalla</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="w-full p-3 overflow-y-auto" style="height: 500px">
              <div v-if="perfil && categorySelected" class="flex flex-wrap justify-center space-x-3 max-w-screen-xl mx-auto">
                <div class="py-2 md:py-2" v-for="(nftSubcategory, indexNftSubcategory) in categorySelected.subcategories" :key="indexNftSubcategory">
                  <a @click="subcategorySelected = nftSubcategory" class="flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer">
                    <span v-html="nftSubcategory" />
                  </a>
                </div>
              </div>

              <div class="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-7 px-3 sm:px-6">
                <template v-if="nftCollections" v-for="nftCollection in nftCollections" :key="nftCollection.nft_id">
                  <div v-if="countNFTsByid(nftCollection.nft_id) > 0 || nftCollection.subcategory == 'Gratis'">
                    <div class="relative rounded-tl-3xl rounded-br-3xl min-h-[150px] mx-3 mt-12 sm:mx-auto bg-madfenix-gris border border-madfenix-naranja overflow-hidden">
                      <img :src="nftCollection.featured_image" class="absolute" style="min-width: 150px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
                      <div class="relative min-h-[150px] mb-0 p-6 z-50">
                        &nbsp;
                      </div>
                    </div>
                    <div class="relative sm:mx-auto px-4 z-50 contenedor-botones-formularios">
                      <div class="flex justify-center">
                        <div class="flex space-x-3">
                          <a
                              v-if="nftCollection.token_number > 0"
                              :href="'https://market.kabila.app/es/collections/' + nftCollection.token_number + '/items'"
                              target="_blank"
                              class="flex justify-center items-center text-center m-auto justify-center px-8 py-4 btn-madfenix text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                          </a>
                          <NuxtLink
                              @click="updateEstado(nftCollection)"
                              class="flex items-center grow m-auto justify-center px-8 py-4 btn-madfenix text-xs text-madfenix-gris font-semibold bg-madfenix-naranja leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-madfenix-naranja hover:bg-madfenix-gris border-madfenix-naranja border-2 cursor-pointer"
                              v-html="'Asignar'"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4">
        &nbsp;
      </div>
    </div>
</template>

<script>
import { usePollsStore } from '../stores/polls'
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useServerMessageStore } from "../stores/serverMessage";
import Cookies from "js-cookie";

export default {
  middleware: 'auth',

  data() {
    return {
      polls: usePollsStore(),
      user: useUserStore(),
      settings: useSettingsStore(),
      serverMessage: useServerMessageStore(),
      categorySelected: null,
      subcategorySelected: null,
      api: null,
      perfil: null,
      showAvatarsModal: false,
      showEstadosModal: false,
    }
  },

  mounted() {
    useHead({
      title: 'Perfil - Mad Fénix Games',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Perfil en Mad Fénix Games.'
        }
      ]
    });

    this.setUserCookies();
    if (this.user.token) {
      this.polls.fetchPolls();
    }
    this.setBackground();

    const { $api } = useNuxtApp();
    this.api = $api;
    this.getPerfil()
  },

  computed: {
    categoryAvatars() {
      let categoryAvatars = null;
      if (this.perfil && this.perfil.nft_categories) {
        for (let z = 0; z < this.perfil.nft_categories.length; z++) {
          if (this.perfil.nft_categories[z].name == 'Avatar') {
            categoryAvatars = this.perfil.nft_categories[z];
            z = this.perfil.nft_categories.length;
          }
        }
      }
      return categoryAvatars;
    },
    categoryEstados() {
      let categoryEstados = null;
      if (this.perfil && this.perfil.nft_categories) {
        for (let z = 0; z < this.perfil.nft_categories.length; z++) {
          if (this.perfil.nft_categories[z].name == 'Estado') {
            categoryEstados = this.perfil.nft_categories[z];
            z = this.perfil.nft_categories.length;
          }
        }
      }
      return categoryEstados;
    },

    nftCollections() {
      let collections = [];
      let isNFTFromCategory = false;
      let isNFTFromSubcategory = true;
      let currentNFT = null;
      if (this.perfil && this.perfil.nft_categories) {
        for (let z = 0; z < this.perfil.nft_categories.length; z++) {
          for (let i = 0; i < this.perfil.nft_categories[z].nfts.length; i++) {
            currentNFT = this.perfil.nft_categories[z].nfts[i];
            isNFTFromCategory = false;
            if (this.categorySelected && currentNFT.category == this.categorySelected.name) {
              isNFTFromCategory = true;
            }
            isNFTFromSubcategory = true;
            if (this.subcategorySelected) {
              isNFTFromSubcategory = false;
              if (currentNFT.subcategory == this.subcategorySelected) {
                isNFTFromSubcategory = true;
              }
            }
            if (!collections.some(obj => obj.nft_id === currentNFT.id) && isNFTFromCategory && isNFTFromSubcategory) {
              collections.push({
                nft_id: currentNFT.id,
                category: currentNFT.category,
                subcategory: currentNFT.subcategory,
                name: currentNFT.name,
                short_description: currentNFT.short_description,
                portrait_image: currentNFT.portrait_image,
                featured_image: currentNFT.featured_image,
                token_number: currentNFT.token_number,
              });
            }
          }
        }
      }

      return collections;
    },
    nftCollectionsAvatars() {
      let collections = [];
      let isNFTFromCategory = false;
      let isNFTFromSubcategory = true;
      let currentNFT = null;
      if (this.perfil && this.perfil.nft_categories) {
        for (let z = 0; z < this.perfil.nft_categories.length; z++) {
          for (let i = 0; i < this.perfil.nft_categories[z].nfts.length; i++) {
            currentNFT = this.perfil.nft_categories[z].nfts[i];
            isNFTFromCategory = false;
            if (this.categorySelected && currentNFT.category == this.categorySelected.name) {
              isNFTFromCategory = true;
            }
            isNFTFromSubcategory = true;
            if (this.subcategorySelected) {
              isNFTFromSubcategory = false;
              if (currentNFT.subcategory == this.subcategorySelected) {
                isNFTFromSubcategory = true;
              }
            }
            if (!collections.some(obj => obj.nft_id === currentNFT.id) && isNFTFromCategory && isNFTFromSubcategory && currentNFT.category == 'Avatar') {
              collections.push({
                nft_id: currentNFT.id,
                name: currentNFT.name,
                short_description: currentNFT.short_description,
                portrait_image: currentNFT.portrait_image,
                featured_image: currentNFT.featured_image,
                token_number: currentNFT.token_number,
              });
            }
          }
        }
      }

      return collections;
    },

    pollsNotAnswered () {
      let pollsNotAnswered = 0;
      if (this.polls.polls) {
        for (let i = 0; i < this.polls.polls.length; i++) {
          if (!this.polls.polls[i].userAnswer) {
            pollsNotAnswered++;
          }
        }
      }

      return pollsNotAnswered;
    },
  },

  methods: {
    setBackground () {
      document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
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
      this.api('/api/profile/getUserProfile', {
        method: 'POST'
      })
        .then((response) => this.afterPerfil(response))
        .catch(() => this.logout())
    },

    updateAvatar(nftCollection) {
      this.api('/api/profile/setAvatar', {
        method: 'POST',
        body: {nft_id: nftCollection.nft_id}
      })
        .then(() => {
          this.getPerfil();
          this.showAvatarsModal = false;
        })
        .catch(() => this.logout())
    },

    updateEstado(nftCollection) {
      this.api('/api/profile/setEstado', {
        method: 'POST',
        body: {nft_id: nftCollection.nft_id}
      })
        .then(() => {
          this.getPerfil();
          this.showEstadosModal = false;
        })
        .catch(() => this.logout())
    },

    desconectarTwitch() {
      let confirmDisconnect = confirm('¿Estás seguro que quieres desconectar tu cuenta de Twitch?');

      if (confirmDisconnect) {
        this.api('/api/twitch/disconnectTwitch', {
          method: 'POST'
        })
            .then((response) => this.getPerfil())
            .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
      }
    },

    desconectarSteam() {
      this.api('/api/steam/disconnectSteam', {
        method: 'POST'
      })
        .then((response) => this.getPerfil())
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : this.serverMessage.setServerMessage(error.message) : this.serverMessage.setServerMessage('Error.'))
    },

    conectarSteam() {
    },

    countNFTsByid(nft_id) {
      let counted = 0;
      if (this.perfil && this.perfil.nfts) {
        for (let i = 0; i < this.perfil.nfts.length; i++) {
          if (this.perfil.nfts[i].nft_id == nft_id) {
            counted += 1;
          }
        }
      }
      if (this.perfil && this.perfil.nfts_hedera) {
        for (let i = 0; i < this.perfil.nfts_hedera.length; i++) {
          if (this.perfil.nfts_hedera[i].nft_id == nft_id) {
            counted += 1;
          }
        }
      }
      return counted;
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
  },
}
</script>
