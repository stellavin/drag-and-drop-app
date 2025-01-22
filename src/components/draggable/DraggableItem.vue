<template>
  <div>
    <h3>{{ title }}</h3>
    <div
      class="bg-white p-2 rounded cursor-move text-gray-800 text-sm"
      draggable="true"
      @dragstart="onDragStart"
    >
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DraggableItem',
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
