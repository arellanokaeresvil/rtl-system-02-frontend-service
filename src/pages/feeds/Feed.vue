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

        <div class="border rounded-lg bg-white border-gray-300 p-6 mt-5 h-auto overflow-auto max-h-150 ">
            <div class="flex justify-between items-center">

                <h1 class="font-bold text-[15px] ml-2 flex items-center">  <CalendarDays size="20" class="mr-1" />  Recent Consumption Records</h1>
                <button class="btn btn-sm btn-black"> <Plus/> Add Record</button>

            </div>

            <table class="table table-s table-pin-rows table-pin-cols">
                <thead>
                   <tr>
                    <td>Date Consumed</td>
                    <td>Batch Code</td>
                    <td>Feed Type</td>
                    <td>Quantity (kg)</td>
                   </tr>
                </thead>
                
            <tbody >
                <tr>
                    <td>2024-06-01</td>
                    <td>Batch001</td>
                    <td>Layer Feed</td>
                    <td>1,000</td>
                </tr>
                <tr>
                    <td>2024-06-01</td>
                    <td>Batch001</td>
                    <td>Layer Feed</td>
                    <td>1,000</td>
                </tr>
                <tr>
                    <td>2024-06-01</td>
                    <td>Batch001</td>
                    <td>Layer Feed</td>
                    <td>1,000</td>
                </tr>
                <tr>
                    <td>2024-06-01</td>
                    <td>Batch001</td>
                    <td>Layer Feed</td>
                    <td>1,000</td>
                </tr>
                <tr>
                    <td>2024-06-01</td>
                    <td>Batch001</td>
                    <td>Layer Feed</td>
                    <td>1,000</td>
                </tr>
                <tr>
                    <td>2024-06-01</td>
                    <td>Batch001</td>
                    <td>Layer Feed</td>
                    <td>1,000</td>
                </tr>
                <tr>
                    <td>2024-06-01</td>
                    <td>Batch001</td>
                    <td>Layer Feed</td>
                    <td>1,000</td>
                </tr>

            </tbody>
            </table>

  
        </div>

        <!-- <div class="flex flex-col md:flex-row border justify-between border-gray-300 bg-white rounded-lg shadow-xl h-auto max-h-200">
            <FeedForm />
            <FeedList />
        </div> -->
    </div>
</template>

<script setup lang="ts">
import ContentHeader from '../../components/ContentHeader.vue';
import GridFeeds from './GridFeeds.vue';
import Skeleton from '../../components/Skeleton.vue';
import { useFeedStore } from '../../stores';

const feedStore = useFeedStore();

</script>