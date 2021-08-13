import { tryOnUnmounted } from '@vueuse/core'
import { observable, observe, AnnotationsMap } from 'mobx'
import { shallowRef, Ref, triggerRef, readonly } from 'vue'

export function useLocalObservable<TStore extends Record<string, any>>(
    initializer: () => TStore,
    annotations?: AnnotationsMap<TStore, never>
):  Readonly<Ref<TStore>> {
    const localObservable = shallowRef(observable(initializer(), annotations, { autoBind: true }))
    const dispose = observe(localObservable.value, () => {
        triggerRef(localObservable)
    })
    tryOnUnmounted(() => {
      dispose()
    })
    return readonly(localObservable) as Readonly<Ref<TStore>>
}