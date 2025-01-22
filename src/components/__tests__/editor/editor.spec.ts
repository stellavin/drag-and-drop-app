import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Editor from '../../editor/Editor.vue'

// Mock vuedraggable
vi.mock('vuedraggable', () => ({
  default: {
    name: 'draggable',
    template: '<div><slot name="item" v-for="item in modelValue" :element="item"></slot></div>',
    props: ['modelValue'],
  },
}))

// Mock Lucide icons
vi.mock('lucide-vue-next', () => ({
  GripVertical: { template: '<div class="mock-grip-vertical" />' },
  Copy: { template: '<div class="mock-copy" />' },
  Trash2: { template: '<div class="mock-trash" />' },
  Image: { template: '<div class="mock-image" />' },
  Upload: { template: '<div class="mock-upload" />' },
}))

describe('Editor', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Editor)
  })

  describe('Initial Rendering', () => {
    it('renders the editor layout correctly', () => {
      expect(wrapper.find('header').exists()).toBe(true)
      expect(wrapper.find('h1').text()).toBe('Block Editor')
      expect(wrapper.find('aside').exists()).toBe(true)
      expect(wrapper.find('section').exists()).toBe(true)
    })

    it('shows empty state message when no blocks exist', () => {
      expect(wrapper.text()).toContain('Drag elements from the left panel to add blocks')
    })

    it('renders draggable templates in the sidebar', () => {
      const templates = wrapper.findAll('[draggable="true"]')
      expect(templates.length).toBe(2) // Text and Image templates
    })
  })

  describe('Drag and Drop Functionality', () => {
    it('shows drop indicator on dragover', async () => {
      const dropZone = wrapper.find('section > div')
      await dropZone.trigger('dragover')

      expect(wrapper.vm.showDropIndicator).toBe(true)
    })

    it('hides drop indicator on dragleave', async () => {
      wrapper.vm.showDropIndicator = true

      const dropZone = wrapper.find('section > div')
      await dropZone.trigger('dragleave', {
        relatedTarget: null,
      })

      expect(wrapper.vm.showDropIndicator).toBe(false)
    })

    it('sets correct data on dragstart', () => {
      const setData = vi.fn()
      const template = wrapper.find('[draggable="true"]')

      template.trigger('dragstart', {
        dataTransfer: { setData },
      })

      expect(setData).toHaveBeenCalledWith('blockType', 'text')
    })
  })

  describe('Save Functionality', () => {
    it('generates correct layout data on save', async () => {
      const consoleSpy = vi.spyOn(console, 'log')

      // Add test blocks
      await wrapper.vm.blocks.push({
        id: 1,
        type: 'text',
        content: 'Text block content',
      })
      await wrapper.vm.blocks.push({
        id: 2,
        type: 'image',
        images: ['image1.jpg', '', '', ''],
        imageIndex: 0,
      })

      const saveButton = wrapper.find('button.bg-green-button')
      await saveButton.trigger('click')

      expect(consoleSpy).toHaveBeenCalledWith('Saved Layout:', {
        blocks: [
          {
            type: 'text',
            content: 'Text block content',
            images: undefined,
            selectedImageIndex: undefined,
          },
          {
            type: 'image',
            content: undefined,
            images: ['image1.jpg'],
            selectedImageIndex: 0,
          },
        ],
      })
    })
  })
})
