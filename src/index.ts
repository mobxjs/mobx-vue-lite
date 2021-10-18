import type { App } from 'vue';
import { createGlobalState as createGlobalObservable } from '@vueuse/core'
import Observer from './ObserverComponent'
import { useLocalObservable } from './use-local-observable'

const Plugin = {
  install: (app: App) => {
    app.component('Observer', Observer)
  }
}

export default Plugin

export {
  Observer,
  useLocalObservable,
  createGlobalObservable,
  Plugin
}