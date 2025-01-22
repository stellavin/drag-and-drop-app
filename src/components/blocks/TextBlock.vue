<template>
  <BlockWrapper @duplicate="$emit('duplicate')" @remove="$emit('remove')">
    <textarea
      :value="modelValue"
      class="w-full p-2 border rounded text-gray-800 mt-4"
      rows="3"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </BlockWrapper>
</template>

<script>
import BlockWrapper from './BlockWrapper.vue'

export default {
  name: 'TextBlock',
  components: {
    BlockWrapper,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue', 'duplicate', 'remove'],
}
</script>
