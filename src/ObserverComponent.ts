import { defineComponent, h } from 'vue'
import { reaction } from 'mobx'

export default defineComponent({
  data: () => ({
    key: 0,
    dispose: () => {},
  }),
  mounted() {
    this.dispose = reaction(() => this.$slots.default?.(), () => {
      this.forceUpdate()
    }, {
      requiresObservable: true,
    })
  },
  unmounted() {
    this.dispose()
  },
  methods: {
    forceUpdate() {
      this.key++
    },
  },
  render() {
    return h(this.$slots.default!, { mobxVueKey: this.key })
  },
})
