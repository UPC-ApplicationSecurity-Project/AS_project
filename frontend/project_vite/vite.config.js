import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./certs/app-sec.key'),  // cargar certificado
      cert: fs.readFileSync('./certs/app-sec.crt'), // cargar llave
    },
    host: '0.0.0.0', // Opcional: para permitir conexiones desde otras máquinas
    port: 443,      // Ajusta el puerto según prefieras
  },
})

