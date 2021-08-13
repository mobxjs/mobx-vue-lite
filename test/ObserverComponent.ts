// @ts-ignore
import { mount  } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { observable, runInAction } from 'mobx'
import { Observer } from '../src'

describe('Observer', () => {
    it('should rerender component', async () => {
        const Component = defineComponent({
            components: { Observer },
            template: `
                <Observer>
                    <div data-testid="count">Count: {{ state.count }}</div>
                    <div data-testid="doubled">Doubled: {{ state.double }}</div>
                    <button @click="increment">Increment</button>
                </Observer>
            `,
            setup() {
                const state = observable({
                    count: 0,
                    get double() {
                        return this.count * 2
                    }
                })

                const increment = () => {
                    runInAction(() => {
                        state.count++
                    })
                }

                return {
                    state,
                    increment
                }
            }
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
    });

    it('should not rerender without Observer component', async () => {
        const Component = {
            template: `
                <div data-testid="count">Count: {{ state.count }}</div>
                <div data-testid="doubled">Doubled: {{ state.double }}</div>
                <button @click="increment">Increment</button>
            `,
            setup() {
                const state = observable({
                    count: 0,
                    get double() {
                        return this.count * 2
                    }
                })

                const increment = () => {
                    runInAction(() => {
                        state.count++
                    })
                }

                return {
                    state,
                    increment
                }
            }
        }

        const wrapper = mount(Component)
        expect(wrapper.find('[data-testid="count"]').text()).toBe('Count: 0')
        expect(wrapper.find('[data-testid="doubled"]').text()).toBe('Doubled: 0')
        await wrapper.find('button').trigger('click')
        await nextTick()
        expect(wrapper.find('[data-testid="count"]').text()).toBe('Count: 0')
        expect(wrapper.find('[data-testid="doubled"]').text()).toBe('Doubled: 0')
    });
})