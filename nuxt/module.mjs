import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { addPlugin, defineNuxtModule } from '@nuxt/kit'

const module = defineNuxtModule({
  meta: {
    name: 'mobx-vue-lite',
    configKey: 'mobx',
  },
  defaults: {
    addPlugin: true,
  },
  setup(options, nuxt) {
    if (options.addPlugin) {
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
      nuxt.options.build.transpile.push(runtimeDir)
      addPlugin(resolve(runtimeDir, 'plugin'))
    }
  },
})

export { module as default }
