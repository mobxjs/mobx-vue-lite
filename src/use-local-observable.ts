import type { AnnotationsMap } from 'mobx'
import type { Ref } from 'vue'
import { shallowRef, triggerRef } from 'vue'
import { tryOnScopeDispose } from '@vueuse/core'
import { observable, observe } from 'mobx'

export function useLocalObservable<TStore extends Record<string, any>>(
  initializer: () => TStore,
  annotations?: AnnotationsMap<TStore, never>,
): Ref<TStore> {
  const localObservable = shallowRef(
    observable(initializer(), annotations, { autoBind: true }),
  )
  const dispose = observe(localObservable.value, () => {
    triggerRef(localObservable)
  })
  tryOnScopeDispose(() => {
    dispose()
  })
  return localObservable as Ref<TStore>
}
