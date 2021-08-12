import { defineComponent, h } from 'vue-demi'
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
        })
    },
    unmounted() {
        this.dispose()
    },
    render() {
        return h(this.$slots.default!, { key: this.key })
    }
})