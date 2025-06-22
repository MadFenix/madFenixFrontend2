import Cookies from "js-cookie";

export default defineNuxtPlugin(() => {
    const route = useRoute()

    const api = $fetch.create({
        baseURL: 'https://api-weafinity.madfenix.com',
        credentials: 'include', // importante si usas cookies httpOnly
        async onRequest({ options }) {
            const token = Cookies.get('token'); // o desde tu store de autenticación
            // Obtener el path actual
            const currentPath = route.path;

            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token}`
                };
            }
            options.headers = {
                ...options.headers,
                // Añadir el path como header personalizado
                'X-Current-Path': currentPath
            }
        }
    });
    return {
        provide: {
            api
        }
    };
});