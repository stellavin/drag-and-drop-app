<template>
  <BaseLayout>
    <template #header>
      <h1 class="text-xl">Block Editor</h1>
      <button
        @click="saveLayout"
        class="bg-green-button text-white py-2 px-6 rounded hover:bg-green-600 transition"
      >
        Save
      </button>
    </template>

    <Sidebar title="Drag and Drop Elements">
      <DraggableItem
        v-for="item in blockTypes"
        :key="item.type"
        :title="item.title"
        :type="item.type"
      />
    </Sidebar>

    <section class="flex-1 p-4">
      <div
        class="bg-white w-full h-full rounded-lg border border-[#EAECED] p-4 relative"
        @dragover="handleDragOver"
        @drop="handleDrop"
        @dragleave="handleDragLeave"
      >
        <div
          v-if="showDropIndicator"
          class="absolute inset-4 border-2 border-dashed border-green-500 pointer-events-none"
        ></div>

        <draggable v-model="blocks" item-key="id" class="space-y-4" handle=".handle">
          <template #item="{ element, index }">
            <TextBlock
              v-if="element.type === 'text'"
              v-model="element.content"
              @duplicate="duplicateBlock(index)"
              @remove="removeBlock(index)"
            />
            <ImageBlock
              v-else-if="element.type === 'image'"
              v-model="element.content"
              :images="predefinedImages"
              @duplicate="duplicateBlock(index)"
              @remove="removeBlock(index)"
            />
          </template>
        </draggable>

        <p v-if="blocks.length === 0" class="text-gray-800 text-center">
          Drag elements from the left panel to add blocks
        </p>
      </div>
    </section>
  </BaseLayout>
</template>

<script>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import BaseLayout from '../layout/BaseLayout.vue'
import Sidebar from '../sidebar/Sidebar.vue'
import DraggableItem from '../draggable/DraggableItem.vue'
import TextBlock from '../blocks/TextBlock.vue'
import ImageBlock from '../blocks/ImageBlock.vue'

export default {
  name: 'Editor',
  components: {
    BaseLayout,
    Sidebar,
    DraggableItem,
    draggable,
    TextBlock,
    ImageBlock,
  },
  setup() {
    const blocks = ref([])
    const showDropIndicator = ref(false)
    const blockTypes = [
      { title: 'Text Block', type: 'text' },
      { title: 'Image Block', type: 'image' },
    ]
    const predefinedImages = [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3',
      'https://picsum.photos/400/300?random=4',
    ]

    const handleDragOver = (event) => {
      event.preventDefault()
      showDropIndicator.value = true
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
        })
      }
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
          content: block.content,
        })),
      }
      console.log('Saved Layout:', layout)
    }

    return {
      blocks,
      blockTypes,
      predefinedImages,
      showDropIndicator,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      removeBlock,
      duplicateBlock,
      saveLayout,
    }
  },
}
</script>

<style scoped>
.bg-green-button {
  background-color: var(--green-button);
  transition: background-color 0.3s;
}

.bg-green-button:hover {
  background-color: #04a759;
}
</style>
