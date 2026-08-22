// vite.config.js -- agregar el plugin de Tailwind
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // <- import nuevo

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),   // <- agregado a la lista de plugins
  ],
})