import type { Plugin as VuePlugin } from 'vue'
import { createGlobalState as createGlobalObservable } from '@vueuse/core'
import Observer from './ObserverComponent'
import { useLocalObservable } from './use-local-observable'

const Plugin: VuePlugin = {
  install: (app) => {
    app.component('Observer', Observer)
  },
}

export default Plugin

export {
  Observer,
  useLocalObservable,
  createGlobalObservable,
  Plugin,
}
