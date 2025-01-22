<template>
  <BlockWrapper @duplicate="$emit('duplicate')" @remove="$emit('remove')">
    <div class="mt-4">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div
          v-for="(img, imgIndex) in images"
          :key="imgIndex"
          @click="$emit('update:modelValue', img)"
          class="cursor-pointer border rounded p-2"
          :class="{ 'border-blue-500': modelValue === img }"
        >
          <img :src="img" class="w-full h-16 object-cover" />
        </div>
      </div>
      <img v-if="modelValue" :src="modelValue" class="max-w-full h-48 object-cover rounded" />
    </div>
  </BlockWrapper>
</template>

<script>
import BlockWrapper from './BlockWrapper.vue'

export default {
  name: 'ImageBlock',
  components: {
    BlockWrapper,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    images: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue', 'duplicate', 'remove'],
}
</script>
