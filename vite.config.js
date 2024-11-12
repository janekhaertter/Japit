import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'japit',
      fileName: 'japit',
    },
    rollupOptions: {
      external: [],
      output: {},
    },
  },
  plugins: [
    tsconfigPaths(),
    dts({
      include: ['lib'],
      insertTypesEntry: true,
    }),
    eslint(),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      lib: resolve(__dirname, 'lib'),
    },
  },
});
