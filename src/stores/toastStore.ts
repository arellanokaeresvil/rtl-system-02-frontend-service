import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    message: '',
    type: 'success' as 'success' | 'error' | 'info',
    visible: false,
    _timeout: null as null | ReturnType<typeof setTimeout>
  }),

  actions: {
    show(message: string, type: 'success' | 'error' | 'info' = 'error') {
      // Clear previous timeout to avoid overlapping
      if (this._timeout) clearTimeout(this._timeout)

      this.message = message
      this.type = type
      this.visible = true

      this._timeout = setTimeout(() => {
        this.visible = false
        this._timeout = null
      }, 4000)
    }
  }
})
