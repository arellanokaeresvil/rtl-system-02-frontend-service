import axios from '../axios';
import { defineStore } from 'pinia';

const baseURL = '/eggs'

export const useEggStore = defineStore('egg',{
    state: () =>({
        datas: null as any,
        eggSummary: null as any,
        eggBatchSummary: null as any,
        totalEggSum: 0,
        loading: false as boolean,
        currentPage: 1,
        total: 0
    }),

    getters: {
        totalEggSummary: (state) => state.eggSummary?.reduce((total: number, item: any) => {
            return total + item.count
        }, 0)
    },

    actions: {

        async fetchEggSummary() {
            this.loading = true;
            try {
                const res = await axios.get(`${baseURL}?getByGrade`);
                this.eggSummary = res.data.data;
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }

        },
        async fetchEggPerBatch() {
            this.loading = true;
            try {
                const res = await axios.get(`${baseURL}?getByBatch`);
                this.eggBatchSummary = res.data.data.data;
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }

        }

    }
})