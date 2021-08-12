import { defineConfig } from 'vite'
import { resolve } from 'path'
import pkg from './package.json'
import dts from 'vite-plugin-dts'

module.exports = defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'mobx-vue-lite',
      fileName: format => `${pkg.name}.${format}.js`  
    },
    rollupOptions: {
      external: ['vue', 'mobx'],
      output: {
        globals: {
          vue: 'Vue',
          mobx: 'mobx'
        }
      }
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      compilerOptions: {
        noEmit: false
      }
    })
  ],
  optimizeDeps: {
    exclude: ['vue-demi']
  }
});