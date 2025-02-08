module.exports = {
    content: [
        './node_modules/@ipaat/vue3-tailwind3-cookie-comply/dist/vue3-tailwind3-cookie-comply.umd.js',
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.{vue,js,ts}',
        './pages/**/*.{vue,js,ts}'
        // Puedes agregar más rutas según la estructura de tu proyecto
    ],
    theme: {
        extend: {
            // Tus personalizaciones de tema aquí
        },
    },
    plugins: [
        // Tus plugins de Tailwind, si los hay
    ],
};