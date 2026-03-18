<template>
    <Skeleton v-show="feedStore.loading"/>
    <div v-show="!feedStore.loading" class="m-5">
        <ContentHeader 
        title="Feed & Inventory Management" 
        description="Track feed inventory and consumption" 
        button="Add Feeds"
        route="/feeds/create"
        />
        
        <!-- Feeds GridSummary -->

        <GridFeeds />




        <!-- Monthly Feed Consumption Chart Section -->

        <div class="border rounded-lg bg-white border-gray-300 p-6 mt-5 h-80 ">
            <div class="flex items-center">
                <TrendingDown />
                <h1 class="font-bold text-[15px] ml-2">Monthly Feed Consumption (kg)</h1>

            </div>
  
        </div>



        <!-- Recent Feed Consumption Records Section -->

        <div class="border rounded-lg bg-white border-gray-300 p-6 mt-5  ">
            <div class="flex justify-between items-center">

                <h1 class="font-bold text-[15px] ml-2 flex items-center">  <CalendarDays size="20" class="mr-1" />  Recent Consumption Records</h1>
                <button @click="addRecord()" class="btn btn-black" onclick="my_modal_4.showModal()"> <Plus/> Add Record</button>

            </div>
            <NoData v-if="feedStore.consumedFeedDatas.length < 0"/>
            <div v-else class="overflow-auto h-auto max-h-150">

            <table class="table table-s table-pin-rows table-pin-cols">
                <thead>
                   <tr>
                     <td>Batch Code</td>
                     <td>Feed</td>
                    <td>Date Consumed</td>
                    <td>Feed Type</td>
                    <td>Quantity (kg)</td>
                   </tr>
                </thead>
                
            <tbody >
                <tr v-for="items in feedStore.consumedFeedDatas">
                     <td>{{ items.batch?.batch_code }}</td>
                     <td>{{ `${items.feed?.feed_code} - ${items.feed?.name}`  }}</td>
                    <td>{{ items.used_at }}</td>
                    <td>{{ items.feed?.type.charAt(0).toUpperCase() + items.feed?.type.slice(1) }}</td>
                    <td class="font-bold">{{ items.quantity_kg }}</td>
                </tr>

            </tbody>
            </table>
            </div>

  
        </div>

    <ConsumptionModal />

 
    </div>
</template>

<script setup lang="ts">
import ContentHeader from '../../components/ContentHeader.vue';
import GridFeeds from './GridFeeds.vue';
import Skeleton from '../../components/Skeleton.vue';
import { useFeedStore, useBatchStore } from '../../stores';
import { onMounted } from 'vue';
import ConsumptionModal from './ConsumptionModal.vue';
import NoData from '../../components/NoData.vue';

const feedStore = useFeedStore();
const batch = useBatchStore()

onMounted(async() =>{
    await feedStore.fetchConsumedFeeds({limit:20})
})

const addRecord = async() =>{
    await feedStore.getOptions()
    await batch.getOptions()
}

</script>