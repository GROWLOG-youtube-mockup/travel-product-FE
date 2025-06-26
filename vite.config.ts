import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://3.38.61.233:8080',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
        secure: false // 백엔드가 http이면 안전하게 꺼 둠
      }
    }
  }
});
