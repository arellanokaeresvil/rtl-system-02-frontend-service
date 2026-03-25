import axios from "../axios";
import { defineStore } from "pinia";
import router from "../router";

const baseUrl = 'expenses'
const categoryUrl = 'expense-categories'

export const useExpenseStore = defineStore('expense', {

    state: ()=>({
        data: [] as any[],
        categories: [] as any[],
        category_options: [] as any[],
        loading: false,
        btn_loading: false
    }),

    actions: {

        async fetchExpenses() {
          
             this.loading = true
            try {
                const res = await axios.get(`${baseUrl}`)
                this.data = res.data.data.data
            } catch (error) {
                throw error
            }finally{
                this.loading = false
            }
        },
        
        async fetchExpenseCategories() {
            
             this.loading = true
            try {
                const res = await axios.get(`${categoryUrl}`)
                this.categories = res.data.data.data
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
        }

    }

})