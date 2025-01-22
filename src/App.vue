<template>
  <div class="bg-custom-background min-h-screen font-roboto w-full flex flex-col">
    <!-- Header -->
    <header class="bg-header text-white flex items-center justify-between px-6 py-4 w-full">
      <h1 class="text-xl">My App</h1>
      <button class="bg-green-button text-white py-2 px-6 rounded hover:bg-green-600 transition">
        Save
      </button>
    </header>

    <!-- Main Content -->
    <main class="flex w-full h-[calc(100vh-64px)]">
      <!-- Left Column -->
      <aside class="bg-left-column w-1/4 min-w-[250px] p-4 h-full">
        <h2 class="text-white text-lg">Elements</h2>
        <ul class="text-white mt-4 space-y-2">
          <li>Element 1</li>
          <li>Element 2</li>
          <li>Element 3</li>
        </ul>
      </aside>

      <!-- Right Column -->
      <section class="flex-1 p-4 w-2/3 h-full">
        <h2 class="text-gray-800 text-lg">Editing Area</h2>
        <p class="mt-2 text-gray-600">This is where the editing content will go.</p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
  --custom-background: #faf7fa;
  --header: #181819;
  --green-button: #06c269;
  --left-column: #2a2a2b; /* Fixed the color value */
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

.bg-green-button {
  background-color: var(--green-button);
  transition: background-color 0.3s;
}

.bg-green-button:hover {
  background-color: #04a759;
}

.bg-left-column {
  background-color: var(--left-column);
}
</style>
