import { defineComponent, h } from 'vue'
import { reaction } from 'mobx'

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
        }, {
            requiresObservable: true
        })
    },
    unmounted() {
        this.dispose()
    },
    render() {
        const slots = this.$slots.default ? this.$slots.default() : ''
        return h(slots, { key: this.key })
    }
})