import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ site: 'https://resolvemos-it.vercel.app', vite: { plugins: [tailwindcss()] } });
