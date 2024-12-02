import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    open: true,
    host: true,
  },
  optimizeDeps: {
    include: ['blockly'], // Incluir Blockly en la optimización de dependencias
  },
});
