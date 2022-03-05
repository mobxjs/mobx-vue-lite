import Observer from '../../dist/index.mjs'
import { defineNuxtPlugin } from '#app'

const plugin = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Observer)
})

export { plugin as default }
