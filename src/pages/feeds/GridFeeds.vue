<template>

            <!-- Alert Low Stock Section -->

        <div  class="border p-6 rounded-xl border-red-700 bg-red-100 text-red-900" v-if="feedStore.lowStockFeeds.length > 0">
             <span class="font-bold text-[14px] flex gap-2 items-center mb-1"> <TriangleAlert size="20" class="text-red-700" /> Alert: Low Stock</span>
            <div v-for="item in feedStore.lowStockFeeds" :key="item.id">
                <p class="text-[12px] ml-6 flex">* {{ item.type ?  (item.type as string).charAt(0).toUpperCase() + (item.type as string).slice(1) : '' }}: {{ (item as any).total_quantity_kg }} kg (Min: 200 kg)</p>
             </div>
            
        </div>
        

        <!-- Type of Feed Inventory Section -->

       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5">
        <div class="cursor-pointer" v-for="value in feedStore.byTypeDatas" :key="value.type">
            <div class="border rounded-lg bg-white border-gray-300 p-6 " v-if="value.total_quantity_kg > 200">
                <Layers size="24" />

                <h1 class="font-bold text-lg pt-2">{{ value.type ?  value.type.charAt(0).toUpperCase() + value.type.slice(1) : '' }} Feeds</h1>
                <h1 class="font-bold text-2xl mt-3">{{ value.total_quantity_kg }} kg</h1>
                <p class="text-sm text-gray-600 text-[12px]">Min. 200 kg</p>

                <progress class="progress progress-success " :value="value.total_quantity_kg" :max="1000"></progress>

                <div class="divider mt-[-6px] mb-[-2px]"></div>
                    <p class="text-sm text-gray-600 text-[12px]">Recent Supplier: {{ value.supplier }}</p>
                    <p class="text-sm text-gray-600 text-[12px]">Last Restock: {{ value.last_restock }}</p>
            </div>
            <div class="border rounded-lg bg-white border-red-500 p-6" v-else>
                <div class="flex justify-between items-center">
                    <Layers size="24" /> <TriangleAlert size="20" class="text-red-700" />
                </div>

                <h1 class="font-bold text-lg pt-2">{{ value.type ?  value.type.charAt(0).toUpperCase() + value.type.slice(1) : '' }} Feeds</h1>
                <h1 class="font-bold text-2xl mt-3">{{ value.total_quantity_kg }} kg</h1>
                <p class="text-sm text-gray-600 text-[12px]">Min. 200 kg</p>

                <progress class="progress progress-error " :value="value.total_quantity_kg" :max="1000"></progress>

                <div class="divider mt-[-6px] mb-[-2px]"></div>
                    <p class="text-sm text-gray-600 text-[12px]">Recent Supplier: {{ value.supplier }}</p>
                    <p class="text-sm text-gray-600 text-[12px]">Last Restock: {{ value.last_restock }}</p>
            </div>

        </div>
            

            <!-- <div class="border rounded-lg bg-white border-gray-300 p-6">
                <Layers size="24" />

                <h1 class="font-bold text-lg pt-2">Layer Feed</h1>
                <h1 class="font-bold text-2xl mt-3">2,500 kg</h1>
                <p class="text-sm text-gray-600 text-[12px]">Min. 1,000 kg</p>

                <progress class="progress progress-success " value="70" max="100"></progress>

                <div class="divider mt-[-6px] mb-[-2px]"></div>
                    <p class="text-sm text-gray-600 text-[12px]">Supplier: Uncle Taks Farm Supply</p>   
                    <p class="text-sm text-gray-600 text-[12px]">Last restock: 2024-06-01</p>   
            </div> -->

            <!-- <div class="border rounded-lg bg-white border-gray-300 p-6">
                <Layers size="24" />

                <h1 class="font-bold text-lg pt-2">Starter Feed</h1>
                <h1 class="font-bold text-2xl mt-3">2,500 kg</h1>
                <p class="text-sm text-gray-600 text-[12px]">Min. 1,000 kg</p>

                <progress class="progress progress-success " value="70" max="100"></progress>

                <div class="divider mt-[-6px] mb-[-2px]"></div>
                    <p class="text-sm text-gray-600 text-[12px]">Supplier: Uncle Taks Farm Supply</p>   
                    <p class="text-sm text-gray-600 text-[12px]">Last restock: 2024-06-01</p>   
            </div> -->

        </div>



</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useFeedStore } from '../../stores';

const feedStore = useFeedStore() as any;


onMounted(async () => {
    await feedStore.fetchFeedsByType();
})
</script>