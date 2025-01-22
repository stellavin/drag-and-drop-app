import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { Image as ImageIcon } from 'lucide-vue-next'
import DraggableItem from '../../draggable/DraggableItem.vue'

interface Props {
  title: string
  type: 'text' | 'image'
}

describe('DraggableItem', () => {
  // Helper function to create wrapper with default props
  const createWrapper = (customProps: Partial<Props> = {}) => {
    const defaultProps: Props = {
      title: 'Test Block',
      type: 'text',
    }

    return mount(DraggableItem, {
      props: {
        ...defaultProps,
        ...customProps,
      },
      global: {
        components: {
          ImageIcon,
        },
      },
    })
  }

  it('renders properly with required props', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('h3').text()).toBe('Test Block')
    expect(wrapper.find('.bg-white').exists()).toBe(true)
  })

  it('validates required props', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    // Mount without any props
    mount(DraggableItem, {
      props: {} as Props,
    })
    expect(warn).toHaveBeenCalled()

    // Mount with missing title
    mount(DraggableItem, {
      props: { type: 'text' } as Props,
    })
    expect(warn).toHaveBeenCalled()

    // Mount with missing type
    mount(DraggableItem, {
      props: { title: 'Test' } as Props,
    })
    expect(warn).toHaveBeenCalled()

    warn.mockRestore()
  })

  describe('Text block rendering', () => {
    it('renders text block preview when type is text', () => {
      const wrapper = createWrapper() // using default 'text' type
      expect(wrapper.findAll('.h-2').length).toBe(3)
    })
  })

  describe('Image block rendering', () => {
    it('renders image block preview when type is image', () => {
      const wrapper = createWrapper({ type: 'image' })
      expect(wrapper.findAll('.bg-gray-100').length).toBe(4)
      expect(wrapper.findComponent(ImageIcon).exists()).toBe(true)
    })
  })

  describe('Drag functionality', () => {
    it('has correct draggable attributes', () => {
      const wrapper = createWrapper()
      const draggableDiv = wrapper.find('[draggable="true"]')
      expect(draggableDiv.exists()).toBe(true)
      expect(draggableDiv.attributes('draggable')).toBe('true')
    })

    it('sets correct data transfer on drag start', () => {
      const wrapper = createWrapper()
      const draggableDiv = wrapper.find('[draggable="true"]')

      const dataTransfer = {
        setData: vi.fn(),
      }

      draggableDiv.trigger('dragstart', {
        dataTransfer,
      })

      expect(dataTransfer.setData).toHaveBeenCalledWith('blockType', 'text')
    })
  })

  describe('Styling classes', () => {
    it('applies correct Tailwind classes', () => {
      const wrapper = createWrapper()

      const title = wrapper.find('h3')
      expect(title.classes()).toContain('text-white')
      expect(title.classes()).toContain('mb-2')
      expect(title.classes()).toContain('text-sm')

      const container = wrapper.find('.bg-white')
      expect(container.classes()).toContain('p-4')
      expect(container.classes()).toContain('rounded')
      expect(container.classes()).toContain('cursor-move')
      expect(container.classes()).toContain('text-gray-800')
    })
  })
})
