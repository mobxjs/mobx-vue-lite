# mobx-vue-lite

Lightweight Vue bindings for MobX based on Composition API

## Install

```sh
yarn add mobx-vue-lite
```

## Example

<b>useLocalObserver()</b>

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

## License

MIT License © 2021 [Robert Soriano](https://github.com/wobsoriano)