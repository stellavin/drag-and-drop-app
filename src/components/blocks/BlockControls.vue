<template>
  <div class="flex justify-between w-full">
    <button class="handle cursor-move p-1 hover:bg-gray-100 rounded" title="Move">
      <GripVertical class="w-5 h-5 text-gray-800" />
    </button>
    <div class="flex space-x-2 text-gray-800">
      <button @click="$emit('duplicate')" class="p-1 hover:bg-gray-100 rounded" title="Duplicate">
        +
      </button>
      <button @click="$emit('remove')" class="p-1 hover:bg-gray-100 rounded" title="Delete">
        ×
      </button>
    </div>
  </div>
</template>

<script>
import { GripVertical } from 'lucide-vue-next'

export default {
  name: 'BlockControls',
  components: {
    GripVertical,
  },
  emits: ['duplicate', 'remove'],
}
</script>
