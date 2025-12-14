/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                'mob-gold': '#d4af37',
                'mob-black': '#0a0a0a',
                'mob-gray': '#1a1a1a',
                'mob-red': '#8a0303',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'Georgnia', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
                typewriter: ['"Special Elite"', 'Courier', 'monospace'],
            }
        },
    },
    plugins: [],
}
