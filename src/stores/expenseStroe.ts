import axios from "../axios";
import { defineStore } from "pinia";
import router from "../router";

const baseUrl = 'expenses'
const categoryUrl = 'expense-categories'

export const useExpenseStore = defineStore('expense', {

    state: ()=>({
        data: [] as any[],
        data_pagination: [] as any[],
        summary: [] as any[],
        categories_pagination: [] as any[],
        categories: [] as any[],
        category_options: [] as any[],
        loading: false,
        btn_loading: false
    }),

        getters: {
        totalExpense: (state) => state.summary?.reduce((total: number, item: any) => {
            return total + parseFloat(item.total_amount)
        }, 0),
    },

    actions: {

        async fetchExpenses(payload: any) {
          
             this.loading = true
            try {
                const res = await axios.get(`${baseUrl}`, { params: {...payload} })
                this.data = res.data.data.data
                this.data_pagination = res.data.data.pagination
            } catch (error) {
                throw error
            }finally{
                this.loading = false
            }
        },
        async fetchExpenseSummary() {
          
             this.loading = true
            try {
                const res = await axios.get(`${baseUrl}/summary`)
                this.summary = res.data.data
            } catch (error) {
                throw error
            }finally{
                this.loading = false
            }
        },
        
        async fetchExpenseCategories(payload: any) {
            
             this.loading = true
            try {
                const res = await axios.get(`${categoryUrl}`, { params: {...payload} })
                this.categories = res.data.data.data
                this.categories_pagination = res.data.data.pagination
            } catch (error) {
                throw error
            }finally{
                this.loading = false
            }

        },

        async showExpenseCategories(id: any) {

             this.loading = true
            try {
                const res = await axios.get(`${categoryUrl}/${id}`)
                return res
            } catch (error) {
                throw error
            }finally{
                this.loading = false
            }

        },

        async showExpense(id: any) {

             this.loading = true
            try {
                const res = await axios.get(`${baseUrl}/${id}`)
                return res
            } catch (error) {
                throw error
            }finally{
                this.loading = false
            }

        },

       async getCategoriesOptions() {
           const res = await axios.get(`${categoryUrl}/options`)
           this.category_options = res.data.data
        },

        async createExpense(params: any) {
            this.btn_loading = true
            try {
                await axios.post(`${baseUrl}`, params)
                router.push('/expenses')
            } catch (error) {
                throw error
            }finally{
                this.btn_loading = false
            }
        },
        async createCategory(params: any) {
            this.btn_loading = true
            try {
                await axios.post(`${categoryUrl}`, params)
                router.push('/expenses')
            } catch (error) {
                throw error
            }finally{
                this.btn_loading = false
            }
        },
        async updateCategory(params: any, id: any) {
            this.btn_loading = true
            try {
                await axios.put(`${categoryUrl}/${id}`, params)
                router.push('/expenses')
            } catch (error) {
                throw error
            }finally{
                this.btn_loading = false
            }
        },

        async updateExpense(params: any, id: any) {
            this.btn_loading = true
            try {
                await axios.put(`${baseUrl}/${id}`, params)
                router.push('/expenses')
            } catch (error) {
                throw error
            }finally{
                this.btn_loading = false
            }
        },

        async deleteExpense(id: string) {
            this.loading = true
            try {
                await axios.delete(`${baseUrl}/${id}`)
                router.push('/expenses')
            } catch (error) {
                throw error
            }finally{
                this.loading = false
            }
        }

    }

})