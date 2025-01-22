<!-- src/App.vue -->
<template>
  <Editor />
</template>

<script>
import Editor from './components/editor/Editor.vue'

export default {
  name: 'App',
  components: {
    Editor,
  },
}
</script>

<style>
/* Base styles that need to be globally available */
:root {
  --custom-background: #faf7fa;
  --header: #181819;
  --green-button: #06c269;
  --left-column: #2a2a2b;
}

body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
