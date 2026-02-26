import axios from '../axios';
import { defineStore } from 'pinia';
import router from '../router';

const baseURL = '/eggs'

export const useEggStore = defineStore('egg',{
    state: () =>({
        datas: null as any,
        eggSummary: null as any,
        eggAvailable: null as any,
        eggBatchSummary: null as any,
        totalEggSum: 0,
        loading: false as boolean,
        currentPage: 1,
        total: 0,
        perPiece: [] as any[],
        perTray: [] as any[],
        customize:  [] as any[],
        unit: 'piece' as string,
        custom_id: 1 as number,
        piece_id: 1 as number,
        tray_id: 1 as number,
    }),

    getters: {
        totalEggSummary: (state) => state.eggSummary?.reduce((total: number, item: any) => {
            return total + item.count
        }, 0),
        totalEggAvailable: (state) => state.eggAvailable?.reduce((total: number, item: any) => {
            return total + item.count
        }, 0),
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
        async fetchEggAvailable() {
            this.loading = true;
            try {
                const res = await axios.get(`${baseURL}?getAvailableEgg`);
                this.eggAvailable = res.data.data;
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

        },

        async handleSubmission() {
            const chunkedCustomize = this.chunkArray(this.customize, 2);
            const chunkedPerPiece = this.chunkArray(this.perPiece, 2);
            const chunkedPerTray = this.chunkArray(this.perTray, 2);

            this.loading = true;

            try {
                const requests = []
               if (chunkedPerPiece.length) {
                   requests.push(
                       ...chunkedPerPiece.map(chunk => axios.post(`${baseURL}`,{items:chunk}))
                   )
               }

               if (chunkedPerTray.length) {
                   requests.push(
                       ...chunkedPerTray.map(chunk => axios.post(`${baseURL}/per-tray`,{items:chunk}))
                   )
               }

               if (chunkedCustomize.length) {
                   requests.push(
                       ...chunkedCustomize.map(chunk => axios.post(`${baseURL}/customize`,{items:chunk}))
                   )
               }

               if (requests.length === 0) {
                   throw new Error('No data to submit')
               }

               await Promise.all(requests)
               this.clearData();

               router.push('/egg-production')

            } catch (e) {
                this.error = 'Failed submission'
            } finally {
                this.loading = false
            }

        },

        chunkArray(array: any[], chunkSize: number) {
            const result: any[] = [];
            for (let i = 0; i < array.length; i += chunkSize) {
                result.push(array.slice(i, i + chunkSize));
            }
            return result;
        },

        addCustomize(item: any) {
            this.customize.push(...item);
            this.custom_id++;
        },

        addPerPiece(item: any) {
            this.perPiece.push(...item);
            this.piece_id++;
        },

        addPerTray(item: any) {
            this.perTray.push(...item);
            this.tray_id++;
        },

        removePerPiece(id: number) {
            this.perPiece = this.perPiece.filter(item => item.egg_id !== id);
        },

        removePerTray(id: number) {
            this.perTray = this.perTray.filter(item => item.egg_id !== id);
        },

        removeCustomize(id: number) {
            this.customize = this.customize.filter(item => item.egg_id !== id);
        },

        clearData() {
            this.perPiece = [];
            this.perTray = [];
            this.customize = [];
        }

    },
    persist: true
})
