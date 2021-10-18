import { defineNuxtModule, addPlugin } from '@nuxt/kit';
import { resolve } from 'path';

const module = defineNuxtModule({
  name: "mobx-vue-lite",
  configKey: "mobx",
  setup() {
    addPlugin({
      src: resolve(__dirname, "./plugin.mjs")
    });
  }
});

export { module as default };
