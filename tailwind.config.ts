import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class', '[data-theme="dark"]'],
    content: ['./app/**/*.{js,ts,jsx,tsx}'],
    plugins: [],
    theme: {
        extend: {
            colors: {
                brand: {
                    navy: '#1A2A3A',
                    cream: '#F5F2EA',
                    gold: '#C3A343',
                    gray: '#8C8C8C',
                }
            },
            fontFamily: {
                playfair: ['Playfair Display', 'serif'],
                source: ['Source Sans Pro', 'sans-serif'],
            }
        }
    }
}

export default config;