import { observable, observe, AnnotationsMap } from 'mobx'
import { getCurrentInstance, shallowRef, Ref, triggerRef, readonly, onUnmounted } from 'vue'

export function useLocalObservable<TStore extends Record<string, any>>(
    initializer: () => TStore,
    annotations?: AnnotationsMap<TStore, never>
):  Readonly<Ref<TStore>> {
    const localObservable = shallowRef(observable(initializer(), annotations, { autoBind: true }))
    const dispose = observe(localObservable.value, () => {
        triggerRef(localObservable)
    })
    onUnmounted(() => {
      if (getCurrentInstance()) {
        dispose()
      }
    })
    return readonly(localObservable) as Readonly<Ref<TStore>>
}