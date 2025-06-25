<template>
    <div v-if="user.user && perfil">
      <div :class="`md:grid md:grid-cols-3 md:items-center border-y-2 border-[color:var(--naranja)] bg-[color:var(--gris)]`">
        <div :class="`relative col-span-1 h-full sm:max-w-[380px] sm:max-h-[380px] sm:min-w-[300px] sm:min-h-[300px]`">
          <img :src="perfil.avatar" alt="Avatar perfil Mad Fénix" title="Avatar perfil Mad Fénix" :class="`h-full`" />
          <a
              @click="categorySelected = categoryAvatars; subcategorySelected = null; showAvatarsModal = true"
              :class="`absolute right-3 bottom-3 sm:right-[-15px] sm:bottom-[-15px] text-center m-auto justify-center px-4 btn-madfenix text-[color:var(--gris)] font-extrabold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
          >
            <div :class="`flex items-center justify-center h-full w-full text-center`">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-8 h-8`">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </div>
          </a>
        </div>

        <div :class="`relative text-left col-span-2 px-9 h-full min-w-[300px] min-h-[300px]`">
          <div v-html="'@' + user.user.name" :class="`mt-9 text-3xl orbitron-medium sm:text-5xl font-black text-[color:var(--naranja)] my-3 w-full text-left`" />
          <a
              @click="categorySelected = categoryEstados; subcategorySelected = null; showEstadosModal = true"
              :class="`flex space-x-3 items-center justify-start text-xl sm:text-2xl orbitron-normal text-white my-3 cursor-pointer`"
          >
            <div :class="`flex items-center justify-center h-full text-center`" v-html="perfil.description" />
            <div
                :class="`text-center m-auto justify-center px-1 btn-madfenix-icon text-[color:var(--gris)] font-extrabold leading-snug transition ease-in-out h-7 lg:h-9 duration-250 text-[color:var(--naranja)] bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
            >
              <div :class="`flex items-center justify-center h-full w-full text-center`">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-6`">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </div>
            </div>
          </a>
          <div :class="`absolute right-3 bottom-3`">
            <div :class="`flex items-center space-x-3 justify-center my-3 text-xs lg:text-sm`">
              <div v-if="perfil && perfil.user_twitch" :class="`flex items-center space-x-3 text-white text-center`">
                <span v-html="perfil.user_twitch" />
                <a @click="desconectarTwitch()" :class="`cursor-pointer`">
                  <img src="/img/perfil/twitch_account.svg" alt="Desconectar Twitch" title="Desconectar Twitch" :class="`w-[50px] lg:w-[50px]`">
                </a>
              </div>
              <div v-else :class="`flex items-center space-x-3 text-white text-center`">
                <span v-html="'Vincular Twitch'" />
                <a :href="'https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=2wbjjwkzyy9t68a8ex5b4fsz7kfc37&redirect_uri=https%3A%2F%2Fapi.madfenix.com%2Fapi%2Ftwitch%2FconnectAccount&scope=user%3Aread%3Aemail&state=user' + user.user.id" :class="`cursor-pointer`">
                  <img src="/img/perfil/twitch_account.svg" alt="Conectar Twitch" title="Conectar Twitch" :class="`w-[50px] lg:w-[50px]`">
                </a>
              </div>
              <div v-html="user.user.email" :class="`text-xs lg:text-sm text-white my-3`" />
              <div>
                <a @click="logout()" :class="`cursor-pointer`">
                  <img src="/img/perfil/logout.svg" alt="Logout" title="Logout" :class="`w-[50px] lg:w-[50px]`">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div :class="`sm:flex space-x-5 justify-center items-center px-5 border-b-2 border-[color:var(--naranja)] bg-[color:var(--gris)]`">
        <template v-if="user.config?.config?.active_hedera">
          <div v-if="perfil && perfil.hedera_wallet" :class="`py-4 text-white text-center text-sm`">
            Tu cartera de hedera vinculada: <span v-html="perfil.hedera_wallet" />.&nbsp;
          </div>
          <div v-else-if="perfil && perfil.hedera_wallet_check" :class="`py-4`">
            <nuxt-link :to="'/' + accountParameterToUrl + 'vincular-wallet-hedera-2'"  :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
              Vincular hedera
            </nuxt-link>
          </div>
          <div v-else :class="`py-4`">
            <nuxt-link :to="'/' + accountParameterToUrl + 'vincular-wallet-hedera'"  :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
              Vincular hedera
            </nuxt-link>
          </div>
        </template>

        <template v-if="user.config?.config?.active_referrals">
          <div v-if="perfil && perfil.referred_code_from" :class="`py-4 text-white text-center text-sm`">
            Tu referido: <span v-html="perfil.referred_code_from" />.&nbsp;
          </div>
          <div v-else :class="`py-4`">
            <nuxt-link :to="'/' + accountParameterToUrl + 'vincular-codigo-referido'"  :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
              Vincular código de referido
            </nuxt-link>
          </div>
        </template>

        <template v-if="user.config?.config?.active_referrals">
          <div v-if="perfil && perfil.referred_code" :class="`py-4 text-white text-center text-sm`">
            Tu código de referido: <span v-html="perfil.referred_code" /> (<span v-html="perfil.count_refered" />)&nbsp;
          </div>
          <div v-else :class="`py-4`">
            <nuxt-link :to="'/' + accountParameterToUrl + 'crear-codigo-referido'"  :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
              Crear código de referido
            </nuxt-link>
          </div>
        </template>

        <div v-if="perfil && perfil.user_steam" :class="`py-4 w-full text-white text-center hidden text-sm`">
          Conectad@ con <span v-html="perfil.user_steam" />.&nbsp;
          <a @click="desconectarSteam()" :class="`text-white underline font-semibold hover:no-underline`">
            Desconectar Steam
          </a>
        </div>
        <div v-else :class="`py-4 hidden text-sm lg:text-xl`">
          <a @click="conectarSteam()" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
            Conectar Steam
          </a>
        </div>

        <div :class="`py-4 flex items-center`">
          <nuxt-link :to="'/' + accountParameterToUrl + 'eliminar-cuenta'" :class="`text-center m-auto justify-center px-1 btn-madfenix-icon text-[color:var(--gris)] font-extrabold leading-snug transition ease-in-out h-7 lg:h-9 duration-250 text-[color:var(--naranja)] bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
            <div :class="`flex items-center justify-center h-full w-full text-center`">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-8 text-[color:var(--rojo)]`">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div v-if="user.config?.config?.active_coupons" :class="`flex items-center justify-center px-4 pt-12 mx-auto md:pt-16 sm:px-6 lg:px-8`">
        <div>
          <nuxt-link :to="'/' + accountParameterToUrl + 'canjear-cupon'" :class="`flex items-center uppercase orbitron-medium w-full m-auto justify-center px-8 py-4 btn-madfenix text-2xl text-[color:var(--gris)] font-extrabold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-12 sm:h-16 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
            Canjea un cupón
          </nuxt-link>
        </div>
      </div>

      <div v-if="user.config?.config?.active_coin_free || user.config?.config?.active_coin_premium" :class="`max-w-screen-xl px-4 pt-12 mx-auto md:pt-16 sm:px-6 lg:px-8`">
        <h2 :class="`px-4 sm:px-16 text-[color:var(--blanco)] text-center lowercase`">
          <span :class="`uppercase`">M</span>onedas
        </h2>
      </div>

      <section v-if="user.config?.config?.active_coin_premium" :class="`max-w-screen-xl px-4 py-7 pt-12 mx-auto md:py-7 md:pt-16 sm:px-6 lg:px-8`">
        <div :class="`relative z-30 grid grid-cols-1 sm:grid-cols-12 items-center justify-center mx-auto text-center px-4 sm:px-16 lg:flex-row lg:text-left`">
          <div :class="`sm:col-span-3 flex items-center py-6 sm:py-0 px-6 h-full text-2xl font-bold sm:text-4xl rounded-tr-3xl sm:rounded-tr-none rounded-tl-3xl sm:rounded-bl-3xl bg-[color:var(--gris)]`">
            <h5 :class="`font-extrabold tracking-tight text-white text-size-token-number text-center w-full`">
              <span v-if="perfil" v-html="perfil.oro" /><span v-else>...</span>
              <p v-if="perfil && perfil.oro_hedera" v-html="perfil.oro_hedera + ' RED'" :class="`mt-4 text-xl`" />
            </h5>
          </div>
          <div :class="`sm:col-span-2 flex items-center justify-center bg-[color:var(--azul)]`">
            <img src="/img/perfil/oro.png" :alt="user.config?.theme?.title_coin_premium ?? 'Oro'" :class="`absolute z-50 h-1/2 sm:h-full`" />
            <svg :class="`inset-y-0 z-40 h-full text-[color:var(--gris)]`" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
          </div>
          <div :class="`sm:col-span-7 px-3 sm:px-0 py-3 sm:py-0 flex space-x-3 items-center justify-center h-full bg-[color:var(--azul)] sm:rounded-tr-3xl rounded-bl-3xl sm:rounded-bl-none rounded-br-3xl sm:mr-12 lg:justify-end`">
            <h5 :class="`grow font-extrabold tracking-tight text-white text-size-token`">
              <span v-html="user.config?.theme?.title_coin_premium ?? 'Oro'" />
            </h5>
            <div v-if="user.config?.config?.active_hedera" :class="`botones-tokens`">
              <nuxt-link :to="'/' + accountParameterToUrl + 'transfiere-oro-a-hedera-previo1'" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
                Transfiere&nbsp;<span v-html="user.config?.theme?.title_coin_premium ?? 'Oro'" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <section v-if="user.config?.config?.active_coin_free" :class="`max-w-screen-xl px-4 py-7 mx-auto md:py-7 sm:px-6 lg:px-8`">
        <div :class="`relative z-30 grid grid-cols-1 sm:grid-cols-12 items-center justify-center mx-auto text-center px-4 sm:px-16 lg:flex-row lg:text-left`">
          <div :class="`sm:col-span-3 flex items-center py-6 sm:py-0 px-6 h-full text-2xl font-bold sm:text-4xl rounded-tr-3xl sm:rounded-tr-none rounded-tl-3xl sm:rounded-bl-3xl bg-[color:var(--gris)]`">
            <h5 :class="`font-extrabold tracking-tight text-white text-size-token-number text-center w-full`">
              <span v-if="perfil" v-html="perfil.plumas" /><span v-else>...</span>
              <p v-if="perfil && perfil.plumas_hedera" v-html="perfil.plumas_hedera + ' RED'" :class="`mt-4 text-xl`" />
            </h5>
          </div>
          <div :class="`sm:col-span-2 flex items-center justify-center bg-[color:var(--azul)]`">
            <img src="/img/perfil/pluma.png" :alt="(user.config?.theme?.title_coin_free ?? 'Plata')" :class="`absolute z-50 h-1/2 sm:h-full`" />
            <svg :class="`inset-y-0 z-40 h-full text-[color:var(--gris)]`" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
          </div>
          <div :class="`sm:col-span-7 px-3 sm:px-0 py-3 sm:py-0 flex items-center space-x-3 justify-center h-full bg-[color:var(--azul)] sm:rounded-tr-3xl rounded-bl-3xl sm:rounded-bl-none rounded-br-3xl sm:mr-12 lg:justify-end`">
            <h5 :class="`grow font-extrabold tracking-tight text-white text-size-token`">
              <span v-html="user.config?.theme?.title_coin_free ?? 'Plata'" />
            </h5>
            <div v-if="user.config?.config?.active_hedera" :class="`botones-tokens`">
              <nuxt-link :to="'/' + accountParameterToUrl + 'transfiere-plumas-a-hedera-previo1'" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
                Transfiere&nbsp;<span v-html="user.config?.theme?.title_coin_free ?? 'Plata'" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <div v-if="user.config?.config?.active_polls" :class="`max-w-screen-xl px-4 py-6 mx-auto md:py-8 sm:px-6 lg:px-8 w-full flex justify-center`">
        <img :class="`px-4 sm:px-16 h-[55px]`" src="/img/perfil/separador_plumas.png" />
      </div>

      <section v-if="user.config?.config?.active_polls" :class="`max-w-screen-xl px-4 py-7 mx-auto md:py-7 sm:px-6 lg:px-8`">
        <div :class="`relative z-30 grid grid-cols-1 sm:grid-cols-12 items-center justify-center mx-auto text-center px-4 sm:px-16 lg:flex-row lg:text-left`">
          <div :class="`sm:col-span-3 flex items-center py-6 sm:py-0 px-6 h-full text-2xl font-bold sm:text-4xl rounded-tr-3xl sm:rounded-tr-none rounded-tl-3xl sm:rounded-bl-3xl bg-[color:var(--gris)]`">
            <h5 :class="`font-extrabold tracking-tight text-white text-size-token-number text-center w-full`">
              <span v-html="pollsNotAnswered" />
            </h5>
          </div>
          <div :class="`sm:col-span-2 flex items-center justify-center bg-[color:var(--azul)]`">
            <img src="/img/perfil/adivinacion.png" alt="Influye" :class="`absolute z-50 h-1/2 sm:h-full`" />
            <svg :class="`inset-y-0 z-40 h-full text-[color:var(--gris)]`" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
          </div>
          <div :class="`sm:col-span-7 px-3 sm:px-0 py-3 sm:py-0 flex items-center space-x-3 justify-center h-full bg-[color:var(--azul)] sm:rounded-tr-3xl rounded-bl-3xl sm:rounded-bl-none rounded-br-3xl sm:mr-12 lg:justify-end`">
            <h5 :class="`grow font-extrabold tracking-tight text-white text-size-token`">
              <span v-html="user.config?.theme?.title_polls ?? 'Polls'" />
            </h5>
            <div :class="`botones-tokens`">
              <nuxt-link :to="'/' + accountParameterToUrl + 'influye'" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] text-sm font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
                Influye en&nbsp;<span v-html="user.config?.config?.name_ecosystem ?? 'Tribe'" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <div v-if="user.config?.config?.active_items" :class="`max-w-screen-xl px-4 py-6 mx-auto md:py-8 sm:px-6 lg:px-8 w-full flex justify-center`">
        <img :class="`px-4 sm:px-16 h-[55px]`" src="/img/perfil/separador_plumas.png" />
      </div>

      <section v-if="user.config?.config?.active_items" :class="`max-w-screen-xl px-4 py-7 pb-12 mx-auto md:py-7 md:pb-16 sm:px-6 lg:px-8`">
        <div :class="`relative z-30 grid grid-cols-1 sm:grid-cols-12 items-center justify-center mx-auto text-center px-4 sm:px-16 lg:flex-row lg:text-left`">
          <div :class="`sm:col-span-3 flex items-center py-6 sm:py-0 px-6 h-full text-2xl font-bold sm:text-4xl rounded-tr-3xl sm:rounded-tr-none rounded-tl-3xl sm:rounded-bl-3xl bg-[color:var(--gris)]`">
            <h5 :class="`font-extrabold tracking-tight text-white text-size-token-number text-center w-full`">
              <span v-html="itemsStored" />
            </h5>
          </div>
          <div :class="`sm:col-span-2 flex items-center justify-center bg-[color:var(--azul)]`">
            <img src="/img/perfil/mochila.png" alt="Ítems" :class="`absolute z-50 h-1/2 sm:h-full`" />
            <svg :class="`inset-y-0 z-40 h-full text-[color:var(--gris)]`" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentcolor">
              <polygon points="0,0 100,0 0,100"></polygon>
            </svg>
          </div>
          <div :class="`sm:col-span-7 px-3 sm:px-0 py-3 sm:py-0 flex items-center space-x-3 justify-center h-full bg-[color:var(--azul)] sm:rounded-tr-3xl rounded-bl-3xl sm:rounded-bl-none rounded-br-3xl sm:mr-12 lg:justify-end`">
            <h5 :class="`grow font-extrabold tracking-tight text-white text-size-token`">
              <span v-html="user.config?.theme?.title_items ?? 'Items'" />
            </h5>
            <div :class="`botones-tokens`">
              &nbsp;
            </div>
          </div>
        </div>
      </section>

      <div v-if="user.config?.config?.active_items" :class="`max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8`">
        <h2 :class="`px-4 sm:px-16 text-[color:var(--blanco)] text-center capitalize lowercase`">
          <span v-html="user.config?.theme?.title_collections ?? 'Collection'" />
        </h2>
      </div>

      <div v-if="perfil && perfil.nft_categories && user.config?.config?.active_items" :class="`flex flex-wrap justify-center space-x-3 bg-[color:var(--naranja)] py-2`">
        <div :class="`py-2 md:py-2`" v-for="(nftCategory, indexNftCategory) in perfil.nft_categories" :key="indexNftCategory">
          <a
              @click="categorySelected = nftCategory; subcategorySelected = null"
              :class="[
                {
                  'flex items-center hover:orbiton-medium w-full m-auto justify-center px-8 py-4 btn-madfenix font-semibold leading-snug transition ease-in-out h-10 lg:h-14 duration-250 border-2 cursor-pointer': true,
                  'orbitron-normal text-[color:var(--gris)]': categorySelected != nftCategory,
                  'orbitron-medium': categorySelected == nftCategory
                },
                {
                  [`hover:text-[color:var(--naranja)]`]: true,
                  [`hover:bg-[color:var(--gris)]`]: true,
                  [`border-[color:var(--naranja)]`]: true,
                  [`bg-[color:var(--naranja)]`]: categorySelected != nftCategory,
                  [`text-[color:var(--naranja)]`]: categorySelected == nftCategory,
                  'bg-[color:var(--gris)]': categorySelected == nftCategory
                }
              ]"
          >
            <span v-html="nftCategory.name" />
          </a>
        </div>
      </div>

      <div v-if="perfil && categorySelected && user.config?.config?.active_items" :class="`flex flex-wrap justify-center space-x-3 mt-3 max-w-screen-xl mx-auto sm:w-3/4 background-subcategories`">
        <div :class="`py-2 md:py-2`" v-for="(nftSubcategory, indexNftSubcategory) in categorySelected.subcategories" :key="indexNftSubcategory">
          <a @click="subcategorySelected = nftSubcategory"
             :class="{
                'flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix font-semibold leading-snug transition ease-in-out h-10 lg:h-14 duration-250 cursor-pointer': true,
                'text-[color:var(--blanco)]': subcategorySelected != nftSubcategory,
                'text-[color:var(--naranja)] underline': subcategorySelected == nftSubcategory
              }"
          >
            <span v-html="nftSubcategory" />
          </a>
        </div>
      </div>

      <div v-if="user.config?.config?.active_items" :class="`max-w-screen-xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 px-6`">
        <div v-if="nftCollections" v-for="nftCollection in nftCollections" :key="nftCollection.nft_id">
          <div :class="`relative rounded-tl-3xl rounded-br-3xl min-h-[300px] mx-3 mt-12 sm:mx-auto bg-[color:var(--gris)] border border-[color:var(--naranja)] overflow-hidden`">
            <img :src="nftCollection.featured_image" :class="`absolute`" style="min-width: 300px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
            <div :class="`relative min-h-[300px] mb-0 p-6 z-50`">
              &nbsp;
            </div>
          </div>
          <div :class="`relative sm:mx-auto px-4 z-50 contenedor-botones-formularios`">
            <div :class="`flex justify-center`">
              <div :class="`grid grid-cols-10 gap-3`">
                <NuxtLink
                    :to="'/coleccion/?nft_id=' + nftCollection.nft_id"
                    :class="`flex items-center col-span-6 m-auto justify-center px-3 py-4 btn-madfenix text-xs text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
                    v-html="nftCollection.name + ' (' + countNFTsByid(nftCollection.nft_id) + ')'"
                />
                <a
                    v-if="nftCollection.token_number > 0 && user.config?.config?.active_hedera"
                    :href="'https://market.kabila.app/es/collections/' + nftCollection.token_number + '/items'"
                    target="_blank"
                    :class="`flex justify-center col-span-4 space-x-3 items-center text-center m-auto justify-center px-2 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer group`"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-6`">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <img src="/img/perfil/kabila.png" title="Mercado Secundario" :class="`w-6 h-6 group-hover:hidden`" />
                  <img src="/img/perfil/kabila-hover.png" title="Mercado Secundario" :class="`w-6 h-6 hidden group-hover:block`" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <span v-else>&nbsp;</span>
      </div>

      <div v-if="showAvatarsModal" tabindex="-1" aria-hidden="true" :class="`overflow-y-auto overflow-x-hidden bg-[color:var(--gris)] bg-opacity-50 fixed top-0 right-0 left-0 z-50 w-full h-modal md:h-full`">
        <div :class="`flex items-center justify-center p-4 w-full h-screen`">
          <!-- Modal content -->
          <div :class="`bg-[color:var(--gris)] text-[color:var(--blanco)] rounded-lg shadow border border-[color:var(--blanco)]`">
            <!-- Modal header -->
            <div :class="`flex justify-between items-start p-4 rounded-t border-b border-[color:var(--blanco)]`">
              <h3 :class="`text-xl font-semibold`">
                <span v-html="user.config?.theme?.title_avatar ?? 'Avatar'" />
              </h3>
              <button type="button" @click="showAvatarsModal = false" :class="`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white`">
                <svg aria-hidden="true" :class="`w-5 h-5`" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span :class="`sr-only`">Cerrar pantalla</span>
              </button>
            </div>
            <!-- Modal body -->
            <div :class="`w-full p-3 overflow-y-auto`" style="height: 500px; max-width: 700px;">
              <div v-if="perfil && categorySelected" :class="`flex flex-wrap justify-center space-x-3 max-w-screen-xl mx-auto`">
                <div :class="`py-2 md:py-2`" v-for="(nftSubcategory, indexNftSubcategory) in categorySelected.subcategories" :key="indexNftSubcategory">
                  <a @click="subcategorySelected = nftSubcategory" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
                    <span v-html="nftSubcategory" />
                  </a>
                </div>
              </div>

              <div :class="`w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-7 px-3 sm:px-6`">
                <template v-if="nftCollections" v-for="nftCollection in nftCollections" :key="nftCollection.nft_id">
                  <div v-if="countNFTsByid(nftCollection.nft_id) > 0 || nftCollection.subcategory == 'Gratis'">
                    <div :class="`relative rounded-tl-3xl rounded-br-3xl min-h-[150px] mx-3 mt-12 sm:mx-auto bg-[color:var(--gris)] border border-[color:var(--naranja)] overflow-hidden`">
                      <img :src="nftCollection.featured_image" :class="`absolute`" style="min-width: 150px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
                      <div :class="`relative min-h-[150px] mb-0 p-6 z-50`">
                        &nbsp;
                      </div>
                    </div>
                    <div :class="`relative sm:mx-auto px-4 z-50 contenedor-botones-formularios`">
                      <div :class="`flex justify-center`">
                        <div :class="`flex space-x-3`">
                          <a
                              v-if="nftCollection.token_number > 0"
                              :href="'https://market.kabila.app/es/collections/' + nftCollection.token_number + '/items'"
                              target="_blank"
                              :class="`flex justify-center items-center text-center m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-6`">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                          </a>
                          <NuxtLink
                              @click="updateAvatar(nftCollection)"
                              :class="`flex items-center grow m-auto justify-center px-8 py-4 btn-madfenix text-xs text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
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

      <div v-if="showEstadosModal" tabindex="-1" aria-hidden="true" :class="`overflow-y-auto overflow-x-hidden bg-[color:var(--gris)] bg-opacity-50 fixed top-0 right-0 left-0 z-50 w-full h-modal md:h-full`">
        <div :class="`flex items-center justify-center p-4 w-full h-screen`">
          <!-- Modal content -->
          <div :class="`bg-[color:var(--gris)] text-[color:var(--blanco)] rounded-lg shadow border border-[color:var(--blanco)]`">
            <!-- Modal header -->
            <div :class="`flex justify-between items-start p-4 rounded-t border-b border-[color:var(--blanco)]`">
              <h3 :class="`text-xl font-semibold`">
                <span v-html="user.config?.theme?.title_state ?? 'State'" />
              </h3>
              <button type="button" @click="showEstadosModal = false" :class="`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white`">
                <svg aria-hidden="true" :class="`w-5 h-5`" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span :class="`sr-only`">Cerrar pantalla</span>
              </button>
            </div>
            <!-- Modal body -->
            <div :class="`w-full p-3 overflow-y-auto`" style="height: 500px; max-width: 700px;">
              <div v-if="perfil && categorySelected" :class="`flex flex-wrap justify-center space-x-3 max-w-screen-xl mx-auto`">
                <div :class="`py-2 md:py-2`" v-for="(nftSubcategory, indexNftSubcategory) in categorySelected.subcategories" :key="indexNftSubcategory">
                  <a @click="subcategorySelected = nftSubcategory" :class="`flex items-center w-full m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`">
                    <span v-html="nftSubcategory" />
                  </a>
                </div>
              </div>

              <div :class="`w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-7 px-3 sm:px-6`">
                <template v-if="nftCollections" v-for="nftCollection in nftCollections" :key="nftCollection.nft_id">
                  <div v-if="countNFTsByid(nftCollection.nft_id) > 0 || nftCollection.subcategory == 'Gratis'">
                    <div :class="`relative rounded-tl-3xl rounded-br-3xl min-h-[150px] mx-3 mt-12 sm:mx-auto bg-[color:var(--gris)] border border-[color:var(--naranja)] overflow-hidden`">
                      <img :src="nftCollection.featured_image" :class="`absolute`" style="min-width: 150px; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
                      <div :class="`relative min-h-[150px] mb-0 p-6 z-50`">
                        &nbsp;
                      </div>
                    </div>
                    <div :class="`relative sm:mx-auto px-4 z-50 contenedor-botones-formularios`">
                      <div :class="`flex justify-center`">
                        <div :class="`flex space-x-3`">
                          <a
                              v-if="nftCollection.token_number > 0"
                              :href="'https://market.kabila.app/es/collections/' + nftCollection.token_number + '/items'"
                              target="_blank"
                              :class="`flex justify-center items-center text-center m-auto justify-center px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="`w-6 h-6`">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                          </a>
                          <NuxtLink
                              @click="updateEstado(nftCollection)"
                              :class="`flex items-center grow m-auto justify-center px-8 py-4 btn-madfenix text-xs text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out h-10 lg:h-14 duration-250 hover:text-[color:var(--naranja)] hover:bg-[color:var(--gris)] border-[color:var(--naranja)] border-2 cursor-pointer`"
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

      <div :class="`p-4`">
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
      route: useRoute(),
      accountParameterToUrl: '',
    }
  },

  mounted() {


    this.setUserCookies();
    if (this.user.token) {
      this.polls.fetchPolls();
    }
    this.setBackground();

    if (window.location.hostname == 'our.welore.io') {
        this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';
      } else {
        this.accountParameterToUrl = window.location.hostname.split('.')[0] + '/';
      }

    this.setConfigCookies();

    useHead({
      title: 'Perfil - ' + this.user.config?.config?.name_ecosystem ?? '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Perfil en ' + this.user.config?.config?.name_ecosystem ?? ''
        }
      ]
    });

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
      return this.polls.polls.length;
    },

    itemsStored () {
      let itemsNumber = 0;
      if (this.perfil) {
        for (let i = 0; i < this.perfil.nfts.length; i++) {
          itemsNumber++;
        }
        for (let i = 0; i < this.perfil.nfts_hedera.length; i++) {
          itemsNumber++;
        }
      }

      return itemsNumber;
    },
  },

  methods: {
    setBackground () {
      if (window.location.hostname == 'madfenix.com') {
        document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";
      }
    },

    afterLogout(){
      Cookies.remove('token')
      Cookies.remove('user')
      this.user.setToken('')
      this.user.setUserToNull()
      this.user.removeUser()
      setTimeout(() => this.$router.push({ path: '/'+ this.accountParameterToUrl + 'login' }), 2000)
    },

    logout () {
      this.api('/api/host/logout', {
        method: 'POST'
      })
        .then(() => this.afterLogout())
        .catch(() => this.afterLogout())
    },

    afterPerfil(response) {
      this.perfil = response;

      if (!this.categorySelected && this.perfil.nft_categories[2] !== undefined) {
        this.categorySelected = this.perfil.nft_categories[2]
      }
    },

    getPerfil() {
      this.api('/api/host/profile/getUserProfile', {
        method: 'POST'
      })
        .then((response) => this.afterPerfil(response))
        .catch(() => this.logout())
    },

    updateAvatar(nftCollection) {
      this.api('/api/host/profile/setAvatar', {
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
      this.api('/api/host/profile/setEstado', {
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
        this.api('/api/host/twitch/disconnectTwitch', {
          method: 'POST'
        })
            .then((response) => this.getPerfil())
            .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error.message) : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error))
      }
    },

    desconectarSteam() {
      this.api('/api/host/steam/disconnectSteam', {
        method: 'POST'
      })
        .then((response) => this.getPerfil())
        .catch((error) => (error.message) ? (error.message === 'The given data was invalid.') ? this.serverMessage.setServerMessage('Datos inválidos.') : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error.message) : (error.response && error.response._data && error.response._data.message)? this.serverMessage.setServerMessage(error.response._data.message) : (error.response && error.response._data)? this.serverMessage.setServerMessage(error.response._data) : this.serverMessage.setServerMessage(error))
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

     setConfigCookies() {
      let config = localStorage.getItem(this.accountParameterToUrl.replace(/^\/+|\/+$/g, '') + '_config')
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
      let token = localStorage.getItem('token')
      if (token) {
        this.user.setToken(token);

        //let user = document.cookie.match(new RegExp('(^| )user=([^;]+)'))
        let user = localStorage.getItem('user')

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
