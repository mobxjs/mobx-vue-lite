import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import { createGlobalObservable, useLocalObservable } from '../src'

describe('createGlobalObservable', () => {
  const useGlobalObservable = createGlobalObservable(() => {
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

  it('should make local observable global', async () => {
    const Component = defineComponent({
      setup() {
        const state = useGlobalObservable()
        return { state }
      },
      template: `
                <div data-testid="count">Count: {{ state.count }}</div>
                <div data-testid="doubled">Doubled: {{ state.double }}</div>
                <button @click="state.increment">Increment</button>
            `,
    })

    const OtherComponent = defineComponent({
      setup() {
        const state = useGlobalObservable()
        return { state }
      },
      template: `
                <div data-testid="count">Count: {{ state.count }}</div>
                <div data-testid="doubled">Doubled: {{ state.double }}</div>
            `,
    })

    const mainWrapper = mount(Component)
    const otherWrapper = mount(OtherComponent)

    expect(mainWrapper.find('[data-testid="count"]').text()).toBe('Count: 0')
    expect(mainWrapper.find('[data-testid="doubled"]').text()).toBe(
      'Doubled: 0',
    )
    expect(otherWrapper.find('[data-testid="count"]').text()).toBe('Count: 0')
    expect(otherWrapper.find('[data-testid="doubled"]').text()).toBe(
      'Doubled: 0',
    )

    await mainWrapper.find('button').trigger('click')
    await mainWrapper.find('button').trigger('click')

    await nextTick()

    expect(mainWrapper.find('[data-testid="count"]').text()).toBe('Count: 2')
    expect(mainWrapper.find('[data-testid="doubled"]').text()).toBe(
      'Doubled: 4',
    )
    expect(otherWrapper.find('[data-testid="count"]').text()).toBe('Count: 2')
    expect(otherWrapper.find('[data-testid="doubled"]').text()).toBe(
      'Doubled: 4',
    )
  })
})
