import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8800', // Full URL for backend server
        changeOrigin: true, // Adjust the origin of the host header to the target URL
        secure: false, // Disable SSL verification (if using HTTPS in dev)
        rewrite: (path) => path, // Keep "/api" prefix in the path
      },
    },
  },
});
