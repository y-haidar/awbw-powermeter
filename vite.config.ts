import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  // Do not use vite to start a dev server
  // server: {
  //   port: 3000,
  // },
  build: {
    target: 'esnext',
    // rollupOptions: {
    //   output: {
    //     // manualChunks: false,
    //     inlineDynamicImports: true,
    //     // entryFileNames: 'script.js',   // currently does not work for the legacy bundle
    //     // assetFileNames: '[name].[ext]', // currently does not work for images
    //   },
    // }
  },
});
