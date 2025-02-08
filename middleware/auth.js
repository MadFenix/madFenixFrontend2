import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware((to) => {
    // Recuperamos el token desde una cookie (o desde tu store de autenticación)
    const token = Cookies.get('token');

    // Si el token no existe y la ruta no es /login, redirigimos a /login
    if (!token.value && to.path !== '/login') {
        return navigateTo('/login');
    }
});