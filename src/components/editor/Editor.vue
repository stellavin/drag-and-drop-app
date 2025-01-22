<!-- src/components/editor/Editor.vue -->
<template>
  <div class="bg-custom-background min-h-screen font-roboto w-full flex flex-col">
    <!-- Header -->
    <header class="bg-header text-white flex items-center justify-between px-6 py-4 w-full">
      <h1 class="text-xl">Block Editor</h1>
      <button
        @click="saveLayout"
        class="bg-green-button text-white py-2 px-6 rounded hover:bg-green-600 transition"
      >
        Save
      </button>
    </header>

    <!-- Main Content -->
    <main class="flex w-full h-[calc(100vh-64px)]">
      <!-- Left Column -->
      <aside class="bg-left-column w-1/5 min-w-[250px] p-4 h-full">
        <h2 class="text-white text-lg mb-4">Drag and Drop Elements</h2>

        <!-- Block Templates -->
        <div class="space-y-4">
          <!-- Text Block Template -->
          <div>
            <h3 class="text-white mb-2 text-sm">Text Block</h3>
            <div
              class="bg-white p-4 rounded cursor-move text-gray-800"
              draggable="true"
              @dragstart="dragStart($event, 'text')"
            >
              <div class="space-y-2">
                <div class="h-2 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
                <div class="h-2 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>

          <!-- Image Block Template -->
          <div>
            <h3 class="text-white mb-2 text-sm">Image Block</h3>
            <div
              class="bg-white p-4 rounded cursor-move text-gray-800"
              draggable="true"
              @dragstart="dragStart($event, 'image')"
            >
              <div class="grid grid-cols-2 gap-2">
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
        </div>
      </aside>

      <!-- Right Column -->
      <section class="flex-1 p-4">
        <div
          class="bg-white w-full h-full rounded-lg border border-[#EAECED] p-4 relative overflow-y-auto"
          @dragover="handleDragOver"
          @drop="handleDrop"
          @dragleave="handleDragLeave"
        >
          <!-- Drop Indicator -->
          <div
            v-if="showDropIndicator"
            class="border-2 border-dashed border-green-500 pointer-events-none"
            :style="dropIndicatorStyle"
          ></div>

          <!-- Draggable Container -->
          <draggable v-model="blocks" item-key="id" class="space-y-4" handle=".handle">
            <template #item="{ element, index }">
              <div class="draggable-block border rounded p-4 relative">
                <div class="w-full">
                  <!-- Block Controls -->
                  <div class="flex justify-between w-full mb-6">
                    <button class="handle cursor-move p-1 hover:bg-gray-100 rounded" title="Move">
                      <GripVertical class="w-5 h-5 text-gray-800" />
                    </button>
                    <div class="flex space-x-2 text-gray-800 mr-2">
                      <button
                        @click="duplicateBlock(index)"
                        class="p-1 hover:bg-gray-100 rounded"
                        title="Duplicate"
                      >
                        <Copy class="w-5 h-5 text-gray-800" />
                      </button>
                      <button
                        @click="removeBlock(index)"
                        class="p-1 hover:bg-red-100 rounded group"
                        title="Delete"
                      >
                        <Trash2 class="w-5 h-5 text-red-500 group-hover:text-red-600" />
                      </button>
                    </div>
                  </div>

                  <!-- Text Block -->
                  <div v-if="element.type === 'text'" class="mt-4">
                    <textarea
                      v-model="element.content"
                      class="w-full p-2 border rounded text-gray-800"
                      rows="3"
                    ></textarea>
                  </div>

                  <!-- Image Block -->
                  <div v-else-if="element.type === 'image'" class="mt-4">
                    <div class="grid grid-cols-4 gap-2">
                      <div
                        v-for="index in 4"
                        :key="index"
                        class="relative group cursor-pointer"
                        @click="() => handleImageClick(index - 1, element)"
                      >
                        <div
                          class="border rounded-lg p-2 hover:border-blue-500 transition-colors"
                          :class="{ 'border-blue-500': element.imageIndex === index - 1 }"
                        >
                          <div
                            class="h-16 w-16 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden"
                          >
                            <input
                              type="url"
                              v-if="element.isEditing === index - 1"
                              v-model="element.images[index - 1]"
                              class="absolute inset-0 z-10 p-2 bg-white border rounded-lg text-sm"
                              placeholder="Enter image URL"
                              @blur="element.isEditing = null"
                              @keyup.enter="$event.target.blur()"
                              ref="imageInput"
                            />
                            <img
                              v-if="element.images[index - 1]"
                              :src="element.images[index - 1]"
                              class="w-full h-full object-cover"
                              @error="handleImageError($event, element, index - 1)"
                            />
                            <ImageIcon v-else class="w-6 h-6 text-gray-400" />
                          </div>
                        </div>
                        <button
                          class="absolute top-2 right-2 p-1 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                          @click.stop="element.isEditing = index - 1"
                          title="Edit image URL"
                        >
                          <Pencil class="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </draggable>

          <p v-if="blocks.length === 0" class="text-gray-800 text-center">
            Drag elements from the left panel to add blocks
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'
import draggable from 'vuedraggable'
import { GripVertical, Copy, Trash2, Image as ImageIcon, Pencil } from 'lucide-vue-next'

export default {
  name: 'Editor',
  components: {
    draggable,
    GripVertical,
    Copy,
    Trash2,
    ImageIcon,
    Pencil,
  },
  setup() {
    const blocks = ref([])
    const showDropIndicator = ref(false)
    const dropIndicatorStyle = ref({
      position: 'absolute',
      left: '1rem',
      right: '1rem',
      height: '120px',
      transition: 'all 0.2s ease',
    })
    const imageInput = ref(null)

    const dragStart = (event, type) => {
      event.dataTransfer.setData('blockType', type)
      dropIndicatorStyle.value.height = type === 'text' ? '120px' : '200px'
    }

    const handleDragOver = (event) => {
      event.preventDefault()
      showDropIndicator.value = true

      const rect = event.currentTarget.getBoundingClientRect()
      const y = event.clientY - rect.top

      const blocks = event.currentTarget.querySelectorAll('.draggable-block')
      let insertY = 16

      for (const block of blocks) {
        const blockRect = block.getBoundingClientRect()
        const blockMiddle = blockRect.top + blockRect.height / 2 - rect.top

        if (y < blockMiddle) {
          break
        }
        insertY = blockRect.bottom - rect.top + 16
      }

      dropIndicatorStyle.value.top = `${insertY}px`
    }

    const handleDragLeave = (event) => {
      if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) {
        return
      }
      showDropIndicator.value = false
    }

    const handleDrop = (event) => {
      event.preventDefault()
      showDropIndicator.value = false

      const blockType = event.dataTransfer.getData('blockType')
      if (blockType) {
        blocks.value.push({
          id: Date.now(),
          type: blockType,
          content: blockType === 'text' ? 'Edit this text...' : '',
          images: blockType === 'image' ? ['', '', '', ''] : undefined,
          imageIndex: null,
          isEditing: null,
        })
      }
    }

    const handleImageClick = (index, element) => {
      element.imageIndex = index
    }

    const handleImageError = (event, element, index) => {
      // Reset the image URL if it's invalid
      element.images[index] = ''
    }

    const removeBlock = (index) => {
      blocks.value.splice(index, 1)
    }

    const duplicateBlock = (index) => {
      const block = JSON.parse(JSON.stringify(blocks.value[index]))
      block.id = Date.now()
      blocks.value.splice(index + 1, 0, block)
    }

    const saveLayout = () => {
      const layout = {
        blocks: blocks.value.map((block) => ({
          type: block.type,
          content: block.type === 'text' ? block.content : undefined,
          images: block.type === 'image' ? block.images.filter((img) => img !== '') : undefined,
          selectedImageIndex: block.type === 'image' ? block.imageIndex : undefined,
        })),
      }
      console.log('Saved Layout:', layout)
    }

    return {
      blocks,
      showDropIndicator,
      dropIndicatorStyle,
      imageInput,
      dragStart,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleImageClick,
      handleImageError,
      removeBlock,
      duplicateBlock,
      saveLayout,
    }
  },
}
</script>

<style>
:root {
  --custom-background: #faf7fa;
  --header: #181819;
  --green-button: #06c269;
  --left-column: #2a2a2b;
}

.bg-custom-background {
  background-color: var(--custom-background);
}

.bg-header {
  background-color: var(--header);
}

.bg-left-column {
  background-color: var(--left-column);
}

.bg-green-button {
  background-color: var(--green-button);
  transition: background-color 0.3s;
}

.bg-green-button:hover {
  background-color: #04a759;
}

.draggable-block {
  transition: transform 0.2s ease;
}

.draggable-block.is-dragging {
  opacity: 0.5;
}
</style>
