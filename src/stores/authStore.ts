import axios from '../axios'
import { defineStore } from 'pinia'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: localStorage.getItem('rtl-token') as string | null,
    loading: false as boolean,
    error: "" as string,
    is_error: false as boolean
  }),

 getters: {
    isAuthenticated: (state) => !!state.token,
    logged: (state) => state.user
  },

  actions: {

    async login(credentials: any) {
      this.loading = true

      try {
        const res = await axios.post('/login', credentials)

        this.user = res.data.data.user
        this.token = res.data.data.token

        if (this.token) {
          localStorage.setItem('rtl-token', this.token)
          router.push('/dashboard')

        }
      } catch (error) {
        if (error.response) {
            this.error = error.response.data.message
            this.is_error = true

            setTimeout(() => {
                this.error = null
                this.is_error = false
            }, 4000)
        //   console.error('Login error response:', error.response.data.message)
        } 
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
        try {
            const res = await axios.get('/auth-user')
            this.user = res.data.data
        } catch (error) {
           throw error
        }
    },

    async logout() {

        try {
            await axios.post('/logout');
            this.user = null
            this.token = null
            localStorage.removeItem('rtl-token')
            router.push('/login')
        } catch (error) {
            throw error
        }
      
    }
  }
})
