import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/stitch-mint-teal-kettle-card.ts',
      formats: ['es'],
      fileName: () => 'stitch-mint-teal-kettle-card.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    minify: 'esbuild',
    sourcemap: false,
  },
});
