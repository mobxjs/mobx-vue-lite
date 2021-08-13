import { tryOnUnmounted } from '@vueuse/core'
import { observable, observe, AnnotationsMap } from 'mobx'
import { shallowRef, Ref, triggerRef } from 'vue-demi'

export function useLocalObservable<TStore extends Record<string, any>>(
    initializer: () => TStore,
    annotations?: AnnotationsMap<TStore, never>
):  Ref<TStore> {
    const localObservable = shallowRef(observable(initializer(), annotations, { autoBind: true }))
    const dispose = observe(localObservable.value, () => {
        triggerRef(localObservable)
    })
    tryOnUnmounted(() => {
      dispose()
    })
    return localObservable
}