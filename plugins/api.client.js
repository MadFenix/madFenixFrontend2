import Cookies from "js-cookie";

export default defineNuxtPlugin(() => {
    const api = $fetch.create({
        baseURL: 'https://api.madfenix.com',
        credentials: 'include', // importante si usas cookies httpOnly
        async onRequest({ options }) {
            const token = Cookies.get('token'); // o desde tu store de autenticación
            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token}`
                };
            }
        }
    });
    return {
        provide: {
            api
        }
    };
});