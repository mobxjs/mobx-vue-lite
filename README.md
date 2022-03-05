# mobx-vue-lite

Lightweight Vue 3 bindings for MobX based on Composition API.

Demo: https://codesandbox.io/s/mobx-vue-lite-demo-4mctz

## Install

```sh
yarn add mobx mobx-vue-lite
```

## Example

### **`useLocalObservable<T>(initializer: () => T, annotations?: AnnotationsMap<T>): Ref<T>`**

Creates an observable object with the given properties, methods and computed values.

```html
<template>
    <div>Count: {{ state.count }}</div>
    <div>Doubled: {{ state.double }}</div>
    <button @click="state.increment">Increment</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLocalObservable } from 'mobx-vue-lite'

export default defineComponent({
    setup() {
        const state = useLocalObservable(() => ({
            count: 0,
            get double() {
                return this.count * 2
            },
            increment() {
                this.count++
            }
        }))

        return { state }
    }
})
</script>
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
<template>
    <Observer>
        <div>Name: {{ data.name }}</div>
        <button @click="changeName">Change name</button>
    </Observer>
</template>

<script setup lang="ts">
import { observable, runInAction } from 'mobx'
import { Observer } from 'mobx-vue-lite'

const data = observable({ name: 'John' })

const changeName = () => {
    runInAction(() => {
        data.name = 'Jane'
    })
}
</script>
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
      }
    }))
})
```

```html
<template>
    <div>Count: {{ state.count }}</div>
    <div>Doubled: {{ state.double }}</div>
    <button @click="state.increment">Increment</button>
</template>

<script setup lang="ts">
import { useGlobalObservable } from './store'

// Can be reused in any component and state will be in sync
const state = useGlobalObservable()
</script>
```

## Tips

You can watch the state and its changes through Vue's watch:

```ts
import { watch } from 'vue'
const state = useLocalObservable(() => ({
    count: 0,
    increment() {
        this.count++
    }
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
<template>
  <Observer>
    <h1 v-text="state.count" />
    <button @click="state.decrement">-</button>
    <button @click="state.increment">+</button>
  </Observer>
</template>

<script setup lang="ts">
import { Observer } from 'mobx-vue-lite'
import { CounterStore } from './counterStore'

const state = new CounterStore()
</script>
```

## Usage with Nuxt 3

To use the `<Observer />` component globally a Nuxt 3 app, add this to your nuxt config:

```ts
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
    buildModules: ['mobx-vue-lite/module']
})
```

## Credits

API is inspired from https://github.com/mobxjs/mobx-react-lite.

## License

MIT License © 2022 [Robert Soriano](https://github.com/wobsoriano)
