import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ site: 'https://alejocardozo.vercel.app', vite: { plugins: [tailwindcss()] } });
