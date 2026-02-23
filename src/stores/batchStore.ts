import axios from '../axios'
import { defineStore } from 'pinia'
import router from '../router'

const baseURL = '/batches'

export const useBatchStore = defineStore('batch', {
    state: () =>({
        datas: null as any,
        loading: false as boolean,
        currentPage: 1,
        total: 0,
        batchOptions: [] as any[]
    }),

    getters:{

    },

    actions:{

        async fetchBatches(payload = {limit: 12}) {
            this.loading = true
            try {
                const res = await axios.get(`${baseURL}`, { params: {...payload} })
                this.datas = res.data.data.data
                this.total = res.data.data.pagination.total
                this.currentPage = 1
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Something went wrong'
            } finally {
                this.loading = false
            }
        },

        async show(id: any) {
            this.loading = true
            try {
                const res = await axios.get(`${baseURL}/${id}`)
                this.datas = [res.data.data]
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Something went wrong'
            } finally {
                this.loading = false
            }
        },

        async createBatch(batchData: any) {
            this.loading = true
            try {
                const res = await axios.post(`${baseURL}`, batchData)
                this.datas.push(res.data.data)
                return true
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Something went wrong'
                return false
            } finally {
                this.loading = false

            }

        },

        async updateBatch(batchData: any) {
            this.loading = true
            try {
                 await axios.put(`${baseURL}/${batchData.id}`, batchData)
                return true
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Something went wrong'
                return false
            } finally {
                this.loading = false

            }

        },
        async deleteBatch(id: any) {
            this.loading = true
            try {
               const res = await axios.delete(`${baseURL}/${id}`)
                return res.data
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Something went wrong'
                return false
            } finally {
                this.loading = false

            }
        },

        async loadMoreBatches() {
            this.loading = true
            try {
                const res = await axios.get(`${baseURL}?page=${this.currentPage + 1}&limit=12`)
                if (res.data.data.data.length) {
                    this.datas.push(...res.data.data.data)
                    this.currentPage++
                }
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Something went wrong'
            } finally {
                this.loading = false
            }
        },

        async getOptions() {
            this.loading = true
            try {
                const res = await axios.get(`${baseURL}/options`)
                this.batchOptions = res.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Something went wrong'
                this.batchOptions = []
            } finally {
                this.loading = false
            }
        }

    }

})