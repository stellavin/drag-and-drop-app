<template>
  <aside class="bg-left-column w-1/5 min-w-[250px] p-4 h-full">
    <h2 class="text-white text-s mb-4">{{ title }}</h2>
    <div class="space-y-4">
      <slot></slot>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    title: {
      type: String,
      default: 'Drag and Drop Elements',
    },
  },
}
</script>

<style scoped>
.bg-left-column {
  background-color: var(--left-column);
}
</style>
