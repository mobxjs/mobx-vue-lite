import { defineConfig } from 'vite';
import { resolve } from 'path';
import pkg from './package.json'

module.exports = defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'mobx-vue-lite',
      fileName: format => `${pkg.name}.${format}.js`  
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
          mobx: 'mobx'
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['vue-demi', 'mobx']
  }
});