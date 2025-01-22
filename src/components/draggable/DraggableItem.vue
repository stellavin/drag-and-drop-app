<template>
  <div>
    <h3 class="text-white mb-2 text-sm">{{ title }}</h3>
    <div
      class="bg-white p-4 rounded cursor-move text-gray-800"
      draggable="true"
      @dragstart="onDragStart"
    >
      <!-- Text Block Preview -->
      <div v-if="type === 'text'" class="space-y-2">
        <div class="h-2 bg-gray-200 rounded w-3/4"></div>
        <div class="h-2 bg-gray-200 rounded w-1/2"></div>
        <div class="h-2 bg-gray-200 rounded w-2/3"></div>
      </div>

      <!-- Image Block Preview -->
      <div v-else-if="type === 'image'" class="grid grid-cols-2 gap-2">
        <div
          v-for="index in 4"
          :key="index"
          class="bg-gray-100 rounded w-full h-12 flex items-center justify-center border border-gray-200"
        >
          <ImageIcon class="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image as ImageIcon } from 'lucide-vue-next'

export default {
  name: 'DraggableItem',
  components: {
    ImageIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    onDragStart(event) {
      event.dataTransfer.setData('blockType', this.type)
    },
  },
}
</script>
