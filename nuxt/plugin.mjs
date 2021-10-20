import { defineNuxtPlugin } from '#app';
import Observer from '../dist/mobx-vue-lite.es.js'

const plugin = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Observer);
});

export { plugin as default };
