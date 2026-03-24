import axios from '../axios'
import { defineStore } from 'pinia'
import router from '../router'

const baseURL = '/feeds'

export const useFeedStore = defineStore('feed', {
    state: () => ({
        datas: [] as any[],
        options: [] as any[],
        consumedFeedDatas: [] as any[],
        byTypeDatas: [] as any[],
        loading: false,
        btn_loading: false,
        error: null as string | null,
    }),
    getters: {
        lowStockFeeds: (state) => {
            return state.byTypeDatas.filter(feed => feed.total_quantity_kg <= 200)
        }
    },

    actions: {
        async fetchFeeds(payload: any) {
            this.loading = true
            try {
                 const res = await axios.get(`${baseURL}`, { params: {...payload} })
                this.datas = res.data.data.data
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async fetchConsumedFeeds(payload: any) {
            this.loading = true
            try {
                 const res = await axios.get(`feed-usages`, { params: {...payload} })
                this.consumedFeedDatas = res.data.data.data
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }
        },

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

        async getOptions() {
            // this.loading = true
            try {
                const res = await axios.get(`${baseURL}/options`)
                this.options = res.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Something went wrong'
                this.options = []
            } finally {
                this.loading = false
            }
        },

        async createFeeds(data: any) {
                this.loading = true
                try {
                    await axios.post(`${baseURL}`, data)
                    router.push('/feeds')
                    return true
                } catch (error: any) {
                    this.error = error.response?.data?.message || 'Something went wrong'
                    return false
                } finally {
                    this.loading = false
                }
            },

        async createFeedsConsumption(data: any) {
                this.btn_loading = true
                
                try {
                     await axios.post(`feed-usages`, data)
                    return true
                } catch (error: any) {
                    this.error = error.response?.data?.message || 'Something went wrong'
                    return false
                } finally {
                    this.btn_loading = false
                }
            },
    }
})
