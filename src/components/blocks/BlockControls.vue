<template>
  <div class="flex justify-between w-full">
    <button class="handle cursor-move p-1 hover:bg-gray-100 rounded" title="Move">
      <GripVertical class="w-5 h-5 text-gray-800" />
    </button>
    <div class="flex space-x-2 text-gray-800 mr-2">
      <button @click="$emit('duplicate')" class="p-1 hover:bg-gray-100 rounded" title="Duplicate">
        <Copy class="w-5 h-5 text-gray-800" />
      </button>
      <button @click="$emit('remove')" class="p-1 hover:bg-red-100 rounded group" title="Delete">
        <Trash2 class="w-5 h-5 text-red-500 group-hover:text-red-600" />
      </button>
    </div>
  </div>
</template>

<script>
import { GripVertical, Copy, Trash2 } from 'lucide-vue-next'

export default {
  name: 'BlockControls',
  components: {
    GripVertical,
    Copy,
    Trash2,
  },
  emits: ['duplicate', 'remove'],
}
</script>
