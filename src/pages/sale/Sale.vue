<template>
    <Skeleton v-show="sales.loading" />
    <div v-show="!sales.loading" class="m-5">

         <ContentHeader 
        title="Sales & Income Tracking" 
        description="Manage sales and revenue" 
        button="Record Sale"
        route="/sales/create"
        />

        <!-- Grid Summary -->

        <Summary />

 
        <!-- Charts -->

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-2 mt-5">
            <div class="border flex-1 border-gray-300 rounded-lg bg-white h-80 shadow-xl ">
                <div class="flex p-4">
                    <span class="font-bold text-m inline-flex items-center">Weekly Sales (<PhilippinePeso size="15"/>)</span>
                </div>
            </div>
            <div class="border flex-1 border-gray-300 rounded-lg bg-white h-80 shadow-xl ">
                 <div class="flex p-4">
                    <span class="font-bold text-m inline-flex items-center">Monthly Sales (<PhilippinePeso size="15"/>)</span>
                </div>
            </div>
         
        </div>

        <!-- Recent Sales Record -->

        <RecentSale />

        


    </div>
</template>

<script setup lang="ts">
import { PhilippinePeso } from 'lucide-vue-next';
import ContentHeader from '../../components/ContentHeader.vue';
import { useSalesStore } from '../../stores';
import { onMounted } from 'vue';
import RecentSale from './RecentSale.vue';
import Summary from './Summary.vue';
import Skeleton from '../../components/Skeleton.vue';


const sales = useSalesStore()

onMounted(()=>{
    sales.fetchSummary()
    sales.fetchRecentSales()
})
</script>