import { defineNuxtPlugin } from '#app';
import Observer from './dist/mobx-vue-lite.es.js'

const plugin = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.app.use(Observer);
});

export { plugin as default };
