<template>
  <div>

    <!-- Case Study Hero -->
    <section :class="`px-4 py-12 md:py-16 sm:px-6 lg:px-8`">
      <div :class="`max-w-screen-xl mx-auto`">
        <!-- Hero text -->
        <div :class="`w-full max-w-3xl mx-auto text-center lg:max-w-5xl`">
          <h1
              :class="`mt-4 text-4xl font-extrabold text-[color:var(--naranja)] md:mt-5 sm:text-5xl md:text-6xl`"
              v-html="'Dragones Custodio'"
          />
        </div>
      </div>
    </section>

    <section :class="`my-4 sm:my-12`" id="container-dragones-custodio">
      <div :class="`sm:absolute sm:right-0 sm:w-1/3`">
        <img src="/img/dragones-custodio/dragon_fenix.png" :class="`z-30 object-cover w-full`">
      </div>

      <!-- Hero card -->
      <div :class="`bg-[color:var(--naranja)]`">

        <!-- Hero card content -->
        <div :class="`p-5 sm:p-20 sm:w-2/3`">
          <!-- Card content text-->
          <div :class="`flex flex-col items-center justify-center lg:items-start`">
            <p :class="`z-30 inline-flex items-center justify-center pb-2 text-lg font-medium tracking-wide text-[color:var(--gris)] rounded-r-full rounded-tl-full bg-gradient-to-r from-dark-800 to-dark-900`">
              Dragones Custodio
            </p>
            <div :class="`z-30 w-full max-w-lg mx-auto mt-6 text-center lg:text-left lg:max-w-none md:max-w-2xl`">
              <h2 :class="`text-4xl font-extrabold text-[color:var(--gris)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl`">
                Colección matriz de <br>Mad Fénix
              </h2>
              <p :class="`mt-6 text-xl text-[color:var(--gris)]`">
                Los Dragones Custodio simbolizan los guardianes de la esencia del proyecto. Tienen las mayores utilidades y son el activo digital más preciado de Mad Fenix Games.
              </p>
            </div>
            <!-- Hero buttons -->
            <div :class="`z-30 mt-10 sm:flex sm:justify-center lg:justify-start`">
              <a :class="`flex items-center justify-center w-auto px-8 py-4 text-base font-semibold leading-snug transition ease-in-out bg-[color:var(--gris)] rounded-full h-14 duration-250 text-[color:var(--naranja)] hover:text-[color:var(--blanco)] focus:outline-none hover:bg-dark-900`" :href="'/' + accountParameterToUrl + 'dragones-custodio#utilidades'">
                Ver utilidades
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Case Study Hero -->
    <section :class="`px-4 py-12 md:py-16 sm:px-6 lg:px-8`">
      <div :class="`max-w-screen-xl mx-auto`">
        <!-- Hero text -->
        <div :class="`w-full mx-auto text-center`">
          <div
              :class="`mt-4 text-3xl font-extrabold text-[color:var(--naranja)] md:mt-5 sm:text-4xl md:text-5xl orbitron-medium`"
              v-html="'¿Por qué son tan exclusivos?'"
          />
        </div>
        <img src="/img/dragones-custodio/nft_evolucionable.png" :class="`w-full`" alt="Dragones Custodio" title="Dragones Custodio" />
      </div>
    </section>


    <section :class="`max-w-screen-xl px-4 pt-8 pb-8 mx-auto md:pb-12 md:pt-16 sm:px-6 lg:px-8`">
      <div :class="`w-full mx-auto text-right`">
        <div
            :class="`mt-4 text-4xl font-extrabold text-[color:var(--naranja)] md:mt-5 sm:text-5xl md:text-6xl orbitron-medium`"
            v-html="'NFT Evolucionable'"
        />
        <div :class="`text-[color:var(--blanco)] text-2xl mt-4`">
          Los Dragon Custodio empiezan siendo <span :class="`text-[color:var(--naranja)]`">un huevo con traits exclusivos.</span><br>
          Pero no se van a quedar así, <span :class="`text-[color:var(--naranja)]`">van a evolucionar</span><br>
          <span :class="`text-[color:var(--naranja)]`">hasta ser imponentes dragones únicos.</span>
        </div>
      </div>
      <!-- Logos -->
      <div :class="`max-w-screen-xl mx-auto mt-12 lg:mt-14`">
        <div :class="`grid grid-cols-2 gap-4 md:gap-6 sm:grid-cols-3`">
          <!-- Item -->
          <span :class="`overflow-hidden`">
            <div :class="`h-[140px] text-center text-xl w-full m-auto px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out duration-250 border-[color:var(--naranja)] border-2`">
              <span :class="`text-4xl sm:text-7xl`">506</span><br>
              Dragones en total
            </div>
          </span>

          <!-- Item -->
          <span :class="`overflow-hidden`">
            <div :class="`h-[140px] text-center text-xl w-full m-auto px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out duration-250 border-[color:var(--naranja)] border-2`">
              <span :class="`text-4xl sm:text-7xl`">80</span> U$D<br>
              (Nunca más barato)
            </div>
          </span>

          <!-- Item -->
          <span :class="`overflow-hidden group`">
            <div :class="`h-[140px] text-center text-xl w-full m-auto px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out duration-250 border-[color:var(--naranja)] border-2`">
              <img src="/img/dragones-custodio/full-hedera-logo.webp" title="Dragones Custodio en Hedera" alt="Dragones Custodio en Hedera" :class="`mt-1`" />
            </div>
          </span>

          <!-- Item -->
          <span :class="`overflow-hidden group block sm:hidden`">
            <div :class="`h-[140px] text-center text-xl  w-full m-auto px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out duration-250 border-[color:var(--naranja)] border-2`">
              Launchpad<br>
              <img src="/img/dragones-custodio/full-kabila-logo.webp" title="Dragones Custodio en Hedera" alt="Dragones Custodio en Hedera" :class="`mt-1`" />
            </div>
          </span>

          <!-- Item -->
          <span :class="`overflow-hidden col-span-2 sm:col-span-3`">
            <div
                :class="`mt-4 text-2xl font-extrabold text-[color:var(--naranja)] md:mt-5 sm:text-3xl md:text-4xl`"
                v-html="'Segundo Batch'"
            />
          </span>

          <!-- Item -->
          <span :class="`overflow-hidden col-span-2`">
            <div :class="`h-[140px] text-center text-3xl sm:text-5xl  w-full m-auto px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out duration-250 border-[color:var(--naranja)] border-2`">
              <div :class="`mt-4`">
                27 de Marzo <span :class="`text-4xl sm:text-7xl`">60</span> NFTs
              </div>
            </div>
          </span>

          <!-- Item -->
          <span :class="`overflow-hidden group hidden sm:block`">
            <div :class="`h-[140px] text-center text-xl w-full m-auto px-8 py-4 btn-madfenix text-[color:var(--gris)] font-semibold bg-[color:var(--naranja)] leading-snug transition ease-in-out duration-250 border-[color:var(--naranja)] border-2`">
              Launchpad<br>
              <img src="/img/dragones-custodio/full-kabila-logo.webp" title="Dragones Custodio en Hedera" alt="Dragones Custodio en Hedera" :class="`mt-1`" />
            </div>
          </span>
        </div>
      </div>
    </section>

    <section :class="`px-4 py-12 md:py-16 sm:px-6 lg:px-8`">
      <div :class="`max-w-screen-xl mx-auto`">
        <!-- Hero text -->
        <div :class="`w-full max-w-3xl mx-auto text-center lg:max-w-5xl`">
          <div
              :class="`mt-4 text-3xl font-extrabold text-[color:var(--naranja)] md:mt-5 sm:text-4xl md:text-5xl orbitron-medium`"
              id="utilidades"
              v-html="'¿Qué beneficios tiene poseer uno?'"
          />
        </div>
      </div>
    </section>

    <div :class="`pt-10 pb-12 bg-[color:var(--naranja)] md:pt-12 md:pb-16`">
      <!-- Process section -->
      <section :class="`w-full max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8`">

        <!-- Process steps -->
        <div :class="`grid max-w-xl gap-10 mx-auto mt-12 lg:mt-16 lg:grid-cols-3 lg:grid-x-16 lg:max-w-none`">
          <!-- Step -->
          <div :class="`h-[340px] text-center text-[color:var(--blanco)] text-xl w-full m-auto px-8 py-4 btn-madfenix font-semibold bg-[color:var(--gris)] leading-snug transition ease-in-out duration-250 border-[color:var(--naranja)] border-2`">
            <div :class="`mt-5 text-3xl font-semibold text-center text-[color:var(--naranja)]`">
              Videojuegos gratis
            </div>
            <p :class="`mt-2 text-lg leading-relaxed text-center`">
              Todos los videojuegos del estudio tendrán un coste para desbloquear el juego entero. <span :class="`text-[color:var(--naranja)]`">Con un Dragón Custodio serán gratis para ti, para siempre.</span><br>
              <span :class="`text-sm`">* Excepto funciones que requieran tokens</span>
            </p>
          </div>

          <!-- Step -->
          <div :class="`h-[340px] text-center text-[color:var(--blanco)] text-xl w-full m-auto px-8 py-4 btn-madfenix font-semibold bg-[color:var(--gris)] leading-snug transition ease-in-out duration-250 border-[color:var(--naranja)] border-2`">
            <div :class="`mt-5 text-3xl font-semibold text-center text-[color:var(--naranja)]`">
              Pase de Temporada Premium Gratuito
            </div>
            <p :class="`mt-2 text-lg leading-relaxed text-center`">
              Actualmente los pases de temporada premium tienen un coste de 20 <span v-html="user.config?.theme?.title_coin_premium ?? 'Oro'" />. <span :class="`text-[color:var(--naranja)]`">Para los holders de un Dragon Custodio será gratis</span>.
            </p>
          </div>

          <!-- Step -->
          <div :class="`h-[340px] text-center text-[color:var(--blanco)] text-xl w-full m-auto px-8 py-4 btn-madfenix font-semibold bg-[color:var(--gris)] leading-snug transition ease-in-out duration-250 border-[color:var(--naranja)] border-2`">
            <div :class="`mt-5 text-3xl font-semibold text-center text-[color:var(--naranja)]`">
              Multiplicador en tokens
            </div>
            <p :class="`mt-2 text-lg leading-relaxed text-center`">
              Aplicable a códigos de cupón y pase de temporada. Tener un <span :class="`text-[color:var(--naranja)]`">Dragón Custodio te dará un multiplicador x1.5 y más de uno te puede dar hasta x3</span>.
            </p>
          </div>

        </div>
        <div :class="`grid max-w-xl gap-10 mx-auto mt-12 lg:mt-16 lg:grid-cols-3 lg:grid-x-16 lg:max-w-none`">

          <!-- Step -->
          <div :class="`h-[340px] text-center text-[color:var(--blanco)] text-xl w-full m-auto px-8 py-4 btn-madfenix font-semibold bg-[color:var(--gris)] leading-snug transition ease-in-out duration-250 border-[color:var(--naranja)] border-2`">
            <div :class="`mt-5 text-3xl font-semibold text-center text-[color:var(--naranja)]`">
              Funciones en los juegos
            </div>
            <p :class="`mt-2 text-lg leading-relaxed text-center text-dark-300`">
              En la mayoría de juegos <span :class="`text-[color:var(--naranja)]`">tendrán funciones especiales</span>. En un futuro queremos que lleguen a ser personajes jugables tanto en 2D como en 3D.
            </p>
          </div>

          <!-- Step -->
          <div :class="`h-[340px] text-center text-[color:var(--blanco)] text-xl w-full m-auto px-8 py-4 btn-madfenix font-semibold bg-[color:var(--gris)] leading-snug transition ease-in-out duration-250 border-[color:var(--naranja)] border-2`">
            <div :class="`mt-5 text-3xl font-semibold text-center text-[color:var(--naranja)]`">
              Free Mints o whitelists
            </div>
            <p :class="`mt-2 text-lg leading-relaxed text-center`">
              Los Dragones Custodio cuentan con <span :class="`text-[color:var(--naranja)]`">prioridad en algunos freemints y con acceso a Whitelists exclusivas</span>.
            </p>
          </div>

          <!-- Step -->
          <div :class="`h-[340px] text-center text-[color:var(--blanco)] text-xl w-full m-auto px-8 py-4 btn-madfenix font-semibold bg-[color:var(--gris)] leading-snug transition ease-in-out duration-250 border-[color:var(--naranja)] border-2`">
            <div :class="`mt-5 text-3xl font-semibold text-center text-[color:var(--naranja)]`">
              Airdrops HBAR
            </div>
            <p :class="`mt-2 text-lg leading-relaxed text-center`">
              Cada Dragón Custodio <span :class="`text-[color:var(--naranja)]`">obtendrá un 0.01% de los airdrops de HBAR trimestrales de Mad Fénix.</span><br>
              <span :class="`text-sm`">* La cuantía de los mismos la determinará el CEO del proyecto</span><br>
              <span :class="`text-sm`">** Hay cinco Dragones Custodio especiales con un 1% y uno con el 5%</span>
            </p>
          </div>
        </div>
      </section>
    </div>

    <section :class="`px-4 py-12 md:py-16 sm:px-6 lg:px-8`">
      <div :class="`max-w-screen-xl mx-auto`">
        <!-- Hero text -->
        <div :class="`w-full max-w-3xl mx-auto text-center lg:max-w-5xl`">
          <h1
              :class="`mt-4 text-4xl font-extrabold text-[color:var(--naranja)] md:mt-5 sm:text-5xl md:text-6xl`"
              v-html="'Tipos de dragón'"
          />
        </div>
      </div>
    </section>

    <section :class="`hidden my-4 lg:ml-12 sm:my-12 md:flex sm:space-x-0`" id="container-dragones-custodio">
      <div :class="`grow`">
        <div :class="`relative text-right sm:pt-[30px] lg:pt-[90px] mx-3 sm:ml-auto sm:w-3/4 sm:pr-24`">
          <h2 :class="`text-4xl font-extrabold text-[color:var(--naranja)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl`">
            Dragón Mestizo
          </h2>
          <div :class="`text-xl mt-2 font-extrabold text-[color:var(--blanco)] md:text-2xl lg:text-3xl`">
            Poderosos, variados, con habilidades únicas
          </div>
        </div>
        <!-- Hero card -->
        <div :class="`bg-[color:var(--naranja)] sm:rounded-tr-3xl rounded-tl-3xl mt-3 p-5 mx-3 sm:ml-auto lg:pr-24 sm:w-3/4`">
          <div :class="`flex flex-col items-center justify-center lg:items-start`">
            <div :class="`z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl`">
              <p :class="`text-2xl font-bold text-[color:var(--gris)]`">
                Aelor, un dragón mestizo con habilidades únicas, protegió Erathia de una invasión de criaturas sombrías. Su valentía y mezcla de poderes lo convirtieron en un héroe. Finalmente, fue reconocido y celebrado por todos los dragones puros.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <img src="/img/dragones-custodio/dragon_mestizo_8.png" :class="`z-30`" style="margin-left: -100px; margin-top: 120px;">
      </div>
    </section>

    <section :class="`block md:hidden my-4`" id="container-dragones-custodio">
      <div class="">
        <img src="/img/dragones-custodio/dragon_mestizo_8.png" :class="`z-30 mx-auto w-1/2`">
      </div>
      <div :class="`grow`">
        <div :class="`relative text-right mx-3`">
          <h2 :class="`text-4xl font-extrabold text-[color:var(--naranja)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl`">
            Dragón Mestizo
          </h2>
          <div :class="`text-xl mt-2 font-extrabold text-[color:var(--blanco)] md:text-2xl lg:text-3xl`">
            Poderosos, variados, con habilidades únicas
          </div>
        </div>
        <!-- Hero card -->
        <div :class="`bg-[color:var(--naranja)] sm:rounded-tr-3xl rounded-tl-3xl mt-3 p-5 mx-3 sm:ml-auto lg:pr-24 sm:w-3/4`">
          <div :class="`flex flex-col items-center justify-center lg:items-start`">
            <div :class="`z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl`">
              <p :class="`text-2xl font-bold text-[color:var(--gris)]`">
                Aelor, un dragón mestizo con habilidades únicas, protegió Erathia de una invasión de criaturas sombrías. Su valentía y mezcla de poderes lo convirtieron en un héroe. Finalmente, fue reconocido y celebrado por todos los dragones puros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section :class="`hidden my-4 lg:ml-12 sm:my-12 md:flex sm:space-x-0`" id="container-dragones-custodio">
      <div :class="`z-30`">
        <img src="/img/dragones-custodio/dragon_noble_5.png" :class="`z-30`" style="margin-top: 60px;">
      </div>

      <div :class="`grow z-20`" style="margin-left: -100px;">
        <div :class="`relative text-left sm:pt-[30px] lg:pt-[90px] mx-3 sm:mr-auto sm:w-3/4 sm:pl-24`">
          <h2 :class="`text-4xl font-extrabold text-[color:var(--naranja)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl`">
            Dragón Noble
          </h2>
          <div :class="`text-xl mt-2 font-extrabold text-[color:var(--blanco)] md:text-2xl lg:text-3xl`">
            Justos, bondadosos, son protectores naturales
          </div>
        </div>
        <!-- Hero card -->
        <div :class="`bg-[color:var(--naranja)] sm:rounded-tr-3xl rounded-tl-3xl mt-3 p-5 mx-3 sm:mr-auto lg:pl-24 sm:w-3/4`">
          <div :class="`flex flex-col items-center justify-center lg:items-start`">
            <div :class="`z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl`">
              <p :class="`text-2xl font-bold text-[color:var(--gris)]`">
                Eryndor, el dragón noble de escamas azules, protegió el Bosque de los Ancestros de un gran incendio. Su justicia y bondad unieron a todas las criaturas del bosque. Fue nombrado Guardián Eterno en agradecimiento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section :class="`block md:hidden my-4`" id="container-dragones-custodio">
      <div :class="`z-30`">
        <img src="/img/dragones-custodio/dragon_noble_5.png" :class="`z-30 mx-auto w-1/2`">
      </div>

      <div :class="`grow z-20`">
        <div :class="`relative text-left sm:pt-[30px] lg:pt-[90px] mx-3 sm:mr-auto sm:w-3/4 sm:pl-24`">
          <h2 :class="`text-4xl font-extrabold text-[color:var(--naranja)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl`">
            Dragón Noble
          </h2>
          <div :class="`text-xl mt-2 font-extrabold text-[color:var(--blanco)] md:text-2xl lg:text-3xl`">
            Justos, bondadosos, son protectores naturales
          </div>
        </div>
        <!-- Hero card -->
        <div :class="`bg-[color:var(--naranja)] sm:rounded-tr-3xl rounded-tl-3xl mt-3 p-5 mx-3 sm:mr-auto lg:pl-24 sm:w-3/4`">
          <div :class="`flex flex-col items-center justify-center lg:items-start`">
            <div :class="`z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl`">
              <p :class="`text-2xl font-bold text-[color:var(--gris)]`">
                Eryndor, el dragón noble de escamas azules, protegió el Bosque de los Ancestros de un gran incendio. Su justicia y bondad unieron a todas las criaturas del bosque. Fue nombrado Guardián Eterno en agradecimiento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section :class="`hidden my-4 lg:ml-12 sm:my-12 md:flex sm:space-x-0`" id="container-dragones-custodio">
      <div :class="`grow`">
        <div :class="`relative text-right sm:pt-[30px] lg:pt-[90px] mx-3 sm:ml-auto sm:w-3/4 sm:pr-24`">
          <h2 :class="`text-4xl font-extrabold text-[color:var(--naranja)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl`">
            Dragón de la Realeza
          </h2>
          <div :class="`text-xl mt-2 font-extrabold text-[color:var(--blanco)] md:text-2xl lg:text-3xl`">
            Majestuosos, diplomáticos, son valientes aventureros
          </div>
        </div>
        <!-- Hero card -->
        <div :class="`bg-[color:var(--naranja)] sm:rounded-tr-3xl rounded-tl-3xl mt-3 p-5 mx-3 sm:ml-auto lg:pr-24 sm:w-3/4`">
          <div :class="`flex flex-col items-center justify-center lg:items-start`">
            <div :class="`z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl`">
              <p :class="`text-2xl font-bold text-[color:var(--gris)]`">
                Altheon, príncipe heredero de Draconia, forjó alianzas al ayudar a los elfos contra un demonio. Su espíritu aventurero y habilidades de combate lo hicieron un héroe. Eventualmente, se convirtió en un rey justo y próspero.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <img src="/img/dragones-custodio/dragon_realeza_2.png" :class="`z-30`" style="margin-left: -100px; margin-top: 120px;">
      </div>
    </section>

    <section :class="`block md:hidden my-4`" id="container-dragones-custodio">
      <div class="">
        <img src="/img/dragones-custodio/dragon_realeza_2.png" :class="`z-30 mx-auto w-1/2`">
      </div>

      <div :class="`grow`">
        <div :class="`relative text-right sm:pt-[30px] lg:pt-[90px] mx-3 sm:ml-auto sm:w-3/4 sm:pr-24`">
          <h2 :class="`text-4xl font-extrabold text-[color:var(--naranja)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl`">
            Dragón de la Realeza
          </h2>
          <div :class="`text-xl mt-2 font-extrabold text-[color:var(--blanco)] md:text-2xl lg:text-3xl`">
            Majestuosos, diplomáticos, son valientes aventureros
          </div>
        </div>
        <!-- Hero card -->
        <div :class="`bg-[color:var(--naranja)] sm:rounded-tr-3xl rounded-tl-3xl mt-3 p-5 mx-3 sm:ml-auto lg:pr-24 sm:w-3/4`">
          <div :class="`flex flex-col items-center justify-center lg:items-start`">
            <div :class="`z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl`">
              <p :class="`text-2xl font-bold text-[color:var(--gris)]`">
                Altheon, príncipe heredero de Draconia, forjó alianzas al ayudar a los elfos contra un demonio. Su espíritu aventurero y habilidades de combate lo hicieron un héroe. Eventualmente, se convirtió en un rey justo y próspero.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section :class="`hidden my-4 lg:ml-12 sm:my-12 md:flex sm:space-x-0`" id="container-dragones-custodio">
      <div :class="`z-30`">
        <img src="/img/dragones-custodio/dragon_rey_1.png" :class="`z-30`" style="margin-top: 60px;">
      </div>

      <div :class="`grow z-20`" style="margin-left: -100px;">
        <div :class="`grow`">
          <div :class="`relative text-left sm:pt-[30px] lg:pt-[90px] mx-3 sm:mr-auto sm:w-3/4 sm:pl-24`">
            <h2 :class="`text-4xl font-extrabold text-[color:var(--naranja)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl`">
              Dragón Rey
            </h2>
            <div :class="`text-xl mt-2 font-extrabold text-[color:var(--blanco)] md:text-2xl lg:text-3xl`">
              Sabios, poderosos, son líderes supremos
            </div>
          </div>
        </div>
        <!-- Hero card -->
        <div :class="`bg-[color:var(--naranja)] sm:rounded-tr-3xl rounded-tl-3xl mt-3 p-5 mx-3 sm:mr-auto lg:pl-24 sm:w-3/4`">
          <div :class="`flex flex-col items-center justify-center lg:items-start`">
            <div :class="`z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl`">
              <p :class="`text-2xl font-bold text-[color:var(--gris)]`">
                Thaldrin, el Dragón Rey de escamas doradas, lideró la Gran Alianza contra una profecía oscura. Su sabiduría y poder salvaron al mundo del cataclismo. Continuó reinando como el protector supremo de todos los reinos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section :class="`block md:hidden my-4`" id="container-dragones-custodio">
      <div :class="`z-30`">
        <img src="/img/dragones-custodio/dragon_rey_1.png" :class="`z-30 mx-auto w-1/2`">
      </div>

      <div :class="`grow z-20`">
        <div :class="`grow`">
          <div :class="`relative text-left sm:pt-[30px] lg:pt-[90px] mx-3 sm:mr-auto sm:w-3/4 sm:pl-24`">
            <h2 :class="`text-4xl font-extrabold text-[color:var(--naranja)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl`">
              Dragón Rey
            </h2>
            <div :class="`text-xl mt-2 font-extrabold text-[color:var(--blanco)] md:text-2xl lg:text-3xl`">
              Sabios, poderosos, son líderes supremos
            </div>
          </div>
        </div>
        <!-- Hero card -->
        <div :class="`bg-[color:var(--naranja)] sm:rounded-tr-3xl rounded-tl-3xl mt-3 p-5 mx-3 sm:mr-auto lg:pl-24 sm:w-3/4`">
          <div :class="`flex flex-col items-center justify-center lg:items-start`">
            <div :class="`z-30 w-full max-w-lg mx-auto text-center lg:text-left lg:max-w-none md:max-w-2xl`">
              <p :class="`text-2xl font-bold text-[color:var(--gris)]`">
                Thaldrin, el Dragón Rey de escamas doradas, lideró la Gran Alianza contra una profecía oscura. Su sabiduría y poder salvaron al mundo del cataclismo. Continuó reinando como el protector supremo de todos los reinos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section :class="`hidden my-4 lg:ml-12 sm:my-12 sm:h-[500px] lg:h-[400px] md:flex sm:space-x-0`" id="container-dragones-custodio">
      <div :class="`sm:grow relative text-right sm:pt-[30px] lg:pt-[190px] mx-3 sm:ml-auto sm:w-3/4 lg:pr-24`">
        <h2 :class="`text-4xl font-extrabold text-[color:var(--naranja)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl`">
          Dragón Fénix
        </h2>
        <div :class="`text-xl mt-2 font-extrabold text-[color:var(--blanco)] md:text-2xl lg:text-3xl`">
          ???
        </div>
      </div>
      <div>
        <img src="/img/dragones-custodio/dragon_fenix.png" :class="`z-30 lg:w-1/2`" style="margin-left: -100px; margin-top: 120px;">
      </div>
    </section>

    <section :class="`block md:hidden my-4`" id="container-dragones-custodio">
      <div>
        <img src="/img/dragones-custodio/dragon_fenix.png" :class="`z-30 mx-auto w-1/2`">
      </div>
      <div :class="`sm:grow relative text-right sm:pt-[30px] lg:pt-[190px] mx-3 sm:ml-auto sm:w-3/4 lg:pr-24`">
        <h2 :class="`text-4xl font-extrabold text-[color:var(--naranja)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl`">
          Dragón Fénix
        </h2>
        <div :class="`text-xl mt-2 font-extrabold text-[color:var(--blanco)] md:text-2xl lg:text-3xl`">
          ???
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

    this.setUserCookies();
    this.setBackground();

    if (window.location.hostname == 'our.welore.io' || window.location.hostname == 'localhost') {
        this.accountParameterToUrl = (this.route.params.account) ? this.route.params.account + '/' : '';
      } else {
        this.accountParameterToUrl = '';
      }

    this.setConfigCookies();

    useHead({
      title: 'Dragones Custodio - Mad Fénix',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Los Dragones Custodio son la colección matriz de Mad Fénix. Tienes las mayores utilidades dentro del ecosistema.'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://madfenix.com/dragones-custodio'
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Dragones Custodio - Mad Fénix'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://madfenix.com/img/dragones-custodio/dragon_rey_1_cascada.jpg'
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
          content: 'image/jpg'
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@MadFenixGames'
        },
      ]
    });

    const { $api } = useNuxtApp();
    this.api = $api;
  },

  methods: {
    setBackground () {
      if (window.location.hostname == 'madfenix.com') {
        document.getElementById("container-global").style.background = "transparent url('/img/perfil/back_temp.jpg') no-repeat top center";

      }
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
  }
}
</script>
