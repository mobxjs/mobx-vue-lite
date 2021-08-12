# mobx-vue-lite

Lightweight Vue bindings for MobX based on Composition API

## Install

```sh
yarn add mobx-vue-lite
```

## Example

### **`useLocalObservable<T>(initializer: () => T, annotations?: AnnotationsMap<T>): T`**

Creates an observable object with the given properties, methods and computed values.

```html
<template>
    <div>Count: {{ state.count }}</div>
    <div>Doubled: {{ state.double }}</div>
    <button @click="state.increment">Increment</button>
</template>

<script setup lang="ts">
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
```

### **`<Observer></Observer>`**

Is a renderless Vue component, which applies observer to an anonymous region in your component. `<Observer>` can be used both inside Options and Composition API components.

```html
<template>
    <Observer>
        <div>Name: {{ data.name }}</div>
        <div>Doubled: {{ state.double }}</div>
        <button @click="increment">Increment</button>
    </Observer>
</template>

<script setup lang="ts">
import { observer, runInAction } from 'mobx'
import { Observer } from 'mobx-vue-lite'

const data = observable({ name: 'John' })

const increment = () => {
    runInAction(() => {
        data.name = 'Jane'
    })
}
</script>
```

## License

MIT License © 2021 [Robert Soriano](https://github.com/wobsoriano)