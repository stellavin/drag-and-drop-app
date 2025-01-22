<template>
  <div class="border rounded p-4 relative">
    <BlockControls
      class="absolute top-2 left-2"
      @duplicate="$emit('duplicate')"
      @remove="$emit('remove')"
    />
    <slot></slot>
  </div>
</template>

<script>
import BlockControls from './BlockControls.vue'

export default {
  name: 'BlockWrapper',
  components: {
    BlockControls,
  },
  emits: ['duplicate', 'remove'],
}
</script>
