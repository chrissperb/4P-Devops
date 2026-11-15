import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // CloudFront serve a SPA na raiz do domínio. O build do GitHub Pages
  // antigo usava '/4P-Devops/'; aquele site continua publicado como estava.
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        reflexao: resolve(__dirname, 'reflexao/index.html'),
      },
    },
  },
});
