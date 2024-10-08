import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import { useLocalObservable } from '../src'

describe('useLocalObservable', () => {
  it('should work properly in a Vue component', async () => {
    const Component = defineComponent({
      setup() {
        const state = useLocalObservable(() => ({
          count: 0,
          get double() {
            return this.count * 2
          },
          increment() {
            this.count++
          },
        }))

        return {
          state,
        }
      },
      template: `
                <div data-testid="count">Count: {{ state.count }}</div>
                <div data-testid="doubled">Doubled: {{ state.double }}</div>
                <button @click="state.increment">Increment</button>
            `,
    })

    const wrapper = mount(Component)
    expect(wrapper.find('[data-testid="count"]').text()).toBe('Count: 0')
    expect(wrapper.find('[data-testid="doubled"]').text()).toBe('Doubled: 0')
    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')
    await nextTick()
    expect(wrapper.find('[data-testid="count"]').text()).toBe('Count: 3')
    expect(wrapper.find('[data-testid="doubled"]').text()).toBe('Doubled: 6')
  })

  it('should observe changes to arrays and objects', async () => {
    const Component = defineComponent({
      setup() {
        const state = useLocalObservable(() => ({
          list: [],
          obj: { count: 0 },
          increment() {
            this.list.push(1)
            this.obj.count++
          },
        }))

        return {
          state,
        }
      },
      template: `
          <div data-testid="length">{{ state.list.length }}</div>
          <div data-testid="count">{{ state.obj.count }}</div>
          <button @click="state.increment">+</button>
      `,
    })

    const wrapper = mount(Component)
    await wrapper.find('button').trigger('click')
    await nextTick()
    expect(wrapper.find('[data-testid="count"]').text()).toBe('1')
    expect(wrapper.find('[data-testid="length"]').text()).toBe('1')
  })
})
