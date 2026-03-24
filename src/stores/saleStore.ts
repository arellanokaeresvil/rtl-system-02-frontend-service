import { defineStore } from "pinia";
import axios from "../axios";
import router from "../router";

const baseURL = 'sales'

export const useSalesStore =  defineStore('sales',{
    
    state: () =>({
        data: [] as any[],
        recentSales: [] as any[],
        loading: false
    }),

    actions: {
        async fetchSummary(){
            this.loading = true
            try {
                const res = await axios.get(`${baseURL}/summary`)
                this.data = res.data.data
            } catch (error) {
                throw error
            } finally{
                this.loading = true
            }
        },
        async fetchRecentSales(){
            this.loading = true
            try {
                const res = await axios.get(`${baseURL}/records`)
                this.recentSales = res.data.data.data
                console.log(res)
            } catch (error) {
              throw error 
            }finally{
                this.loading =false
            }

        },
        async createSale(params: any){
            this.loading =true
            try {
                await axios.post(`${baseURL}/${params.type}`, params)
                router.push('/sales')
            } catch (error) {
                throw error
            }finally{
                this.loading = false
            }
        }
    }

})