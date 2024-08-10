import type { AnnotationsMap } from 'mobx'
import type { DeepReadonly, UnwrapNestedRefs } from 'vue'
import { readonly, shallowRef, triggerRef } from 'vue'
import { tryOnScopeDispose } from '@vueuse/core'
import { observable, reaction, toJS } from 'mobx'

export function useLocalObservable<TStore extends Record<string, any>>(
  initializer: () => TStore,
  annotations?: AnnotationsMap<TStore, never>,
): DeepReadonly<UnwrapNestedRefs<TStore>> {
  const localObservable = shallowRef(
    observable(initializer(), annotations, { autoBind: true, deep: true })
  )

  const dispose = reaction(
    () => toJS(localObservable.value),
    () => {
      triggerRef(localObservable)
    },
    { fireImmediately: false, delay: 0 }
  )

  tryOnScopeDispose(() => {
    dispose()
  })

  return readonly(localObservable) as DeepReadonly<UnwrapNestedRefs<TStore>>
}
