<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/perfil">Perfil</NuxtLink></li>
          <li><NuxtLink to="/equipo">Equipo</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <slot />
    <footer>
      <p>
        Footer de Mad Fénix.
      </p>
    </footer>
  </div>
</template>