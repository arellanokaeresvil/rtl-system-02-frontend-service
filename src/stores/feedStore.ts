import axios from '../axios'
import { defineStore } from 'pinia'

const baseURL = '/feeds'

export const useFeedStore = defineStore('feed', {
    state: () => ({
        datas: [] as any[],
        byTypeDatas: [] as any[],
        loading: false,
        error: null as string | null,
    }),
    getters: {
        lowStockFeeds: (state) => {
            return state.byTypeDatas.filter(feed => feed.total_quantity_kg <= 200)
        }
    },

    actions: {
        async fetchFeedsByType() {
            this.loading = true
            try {
                  const response = await axios.get(`${baseURL}?getByType=true`)
            this.byTypeDatas = response.data.data
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async createFeeds(data: any) {
                this.loading = true
                try {
                    const res = await axios.post(`${baseURL}`, data)
                    // this.datas.push(res.data.data)
                    return true
                } catch (error: any) {
                    this.error = error.response?.data?.message || 'Something went wrong'
                    return false
                } finally {
                    this.loading = false
                }
            },
    }
})
