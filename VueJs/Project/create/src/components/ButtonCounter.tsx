import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `t
        <button @click="count++">
            you clicked me {{count}} times.
        </button>
    `
}
