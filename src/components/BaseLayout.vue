<template>
  <div class="bg-custom-background min-h-screen font-roboto w-full flex flex-col">
    <header class="bg-header text-white flex items-center justify-between px-6 py-4 w-full">
      <slot name="header"></slot>
    </header>
    <main class="flex w-full h-[calc(100vh-64px)]">
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  name: 'BaseLayout',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
  --custom-background: #faf7fa;
  --header: #181819;
  --green-button: #06c269;
  --left-column: #2a2a2b;
}

.font-roboto {
  font-family: 'Roboto', sans-serif;
}

.bg-custom-background {
  background-color: var(--custom-background);
}

.bg-header {
  background-color: var(--header);
}
</style>
