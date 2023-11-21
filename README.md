# mobx-vue-lite

Lightweight Vue 3 bindings for MobX based on Composition API.

Demo: https://codesandbox.io/s/mobx-vue-lite-demo-4mctz

## Install

```sh
npm install mobx mobx-vue-lite
```

## Example

### **`useLocalObservable<T>(initializer: () => T, annotations?: AnnotationsMap<T>): Ref<T>`**

Creates an observable object with the given properties, methods and computed values.

```html
<script setup>
import { useLocalObservable } from 'mobx-vue-lite'

const state = useLocalObservable(() => ({
    count: 0,
    get double() {
        return this.count * 2
    },
    increment() {
        this.count++
    }
}))
</script>

<template>
    <div>Count: {{ state.count }}</div>
    <div>Doubled: {{ state.double }}</div>
    <button @click="state.increment">Increment</button>
</template>
```

### **`<Observer />`**

Is a renderless Vue component, which applies observer to its children.

#### Install as a global plugin (Optional)

```ts
// main.js
import { createApp } from 'vue'
import Observer from 'mobx-vue-lite'

const app = createApp(App)
app.use(Observer)
```

#### Or: Import and register it locally

```html
<script setup>
import { observable, runInAction } from 'mobx'
import { Observer } from 'mobx-vue-lite'

const data = observable({ name: 'John' })

const changeName = () => {
    runInAction(() => {
        data.name = 'Jane'
    })
}
</script>

<template>
    <Observer>
        <div>Name: {{ data.name }}</div>
        <button @click="changeName">Change name</button>
    </Observer>
</template>
```

### **`createGlobalObservable<T>(stateFactory: () => T): () => T`**

Create a global observer from a local observer.

```ts
// store.ts
import { createGlobalObservable, useLocalObservable } from 'mobx-vue-lite'

export const useGlobalObservable = createGlobalObservable(() => {
  return useLocalObservable(() => ({
    count: 0,
    get double() {
      return this.count * 2
    },
    increment() {
      this.count++
    },
  }))
})
```

```html
<script setup>
import { useGlobalObservable } from './store'

// Can be reused in any component and state will be in sync
const state = useGlobalObservable()
</script>

<template>
    <div>Count: {{ state.count }}</div>
    <div>Doubled: {{ state.double }}</div>
    <button @click="state.increment">Increment</button>
</template>
```

## Tips

You can watch the state and its changes through Vue's watch:

```ts
import { watch } from 'vue'

const state = useLocalObservable(() => ({
  count: 0,
  increment() {
    this.count++
  },
}))

// watch the whole state
watch(state, (value) => {
  console.log(value)
})

// watch part of a state
watch(() => state.value.count, (count) => {
  console.log(count)
})
```

Class observables should work out-of-the-box. Just wrap the component with the `<Observer />` component.

```html
<script setup>
import { Observer } from 'mobx-vue-lite'
import { CounterStore } from './counterStore'

const state = new CounterStore()
</script>

<template>
  <Observer>
    <h1 v-text="state.count" />
    <button @click="state.decrement">-</button>
    <button @click="state.increment">+</button>
  </Observer>
</template>
```

## Usage with Nuxt 3

To use the `<Observer />` component globally a Nuxt 3 app, add this to your nuxt config:

```ts
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  buildModules: ['mobx-vue-lite/nuxt'],
})
```

## Credits

API was inspired from https://github.com/mobxjs/mobx-react-lite.

## License

MIT
