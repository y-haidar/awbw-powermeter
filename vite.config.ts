import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  // Do not use vite to start a dev server
  // server: {
  //   port: 3000,
  // },
  build: {
    target: 'ESNext',
    modulePreload: false,
    rollupOptions: {
      output: {
        // manualChunks: false,
        inlineDynamicImports: true,
        entryFileNames: 'script.js',   // currently does not work for the legacy bundle
        // assetFileNames: '[name].[ext]', // currently does not work for images
      },
    }
  },
});
