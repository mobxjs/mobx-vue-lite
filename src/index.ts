import { App } from 'vue';
import Observer from './ObserverComponent'

export default {
    install: (app: App) => {
        app.component('Observer', Observer)
    }
}

export {
  useLocalObservable
} from './use-local-observable'

export {
  Observer
}

export {
  createGlobalState as createGlobalObservable
} from '@vueuse/core'