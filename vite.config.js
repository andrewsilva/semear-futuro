import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  root: 'html',
  base: '/semear-futuro/',
  plugins: [createHtmlPlugin({ minify: true })],
  server: { fs: { allow: ['..'] } },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'es2020',
    sourcemap: 'hidden',
  },
  test: {
    root: '.',
    include: ['tests/**/*.test.js'],
  },
});
