import { defineComponent } from 'vue-demi'
import { reaction } from 'mobx'
import h, { slot as slotDemi } from './utils'

export default defineComponent({
    data: () => ({
        key: 0,
        dispose: () => {}
    }),
    methods: {
        forceUpdate() {
            this.key++
        }
    },
    mounted() {
        this.dispose = reaction(() => this.$slots.default!(), () => {
            this.forceUpdate()
        })
    },
    unmounted() {
        this.dispose()
    },
    render() {
        const slot = this.$slots.default ? slotDemi(this.$slots.default) : []

        return h(slot, {
            key: this.key
        })
    }
})