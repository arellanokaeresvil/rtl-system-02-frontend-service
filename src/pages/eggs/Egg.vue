<template>
    <Skeleton v-show="egg.loading" />
   <div v-show="!egg.loading" class="m-5">
    <!-- Content Header -->
        <ContentHeader 
        title="Egg Production Monitoring" 
        description="Track and record daily egg production" 
        button="Record Production"
        route="/egg-production/create" />

    <!-- Egg Summary By Size  -->
    <GridSummary />

    <!-- Weekly Chart Production -->
    <div class="flex border border-gray-300 bg-white mt-7 h-80 rounded-lg shadow-lg">
        <div class="flex-1 p-4">
            <h2 class="text-m font-bold mb-2 flex items-center gap-1"> <Calendar size="20" /> Weekly Egg Production</h2>
            <p class="text-[12px] -mt-2.25 text-gray-600">Track egg production trends over the week</p>
        </div>
    </div>
    <!-- Recent Egg Production List -->
    <div class="flex flex-col border border-gray-300 bg-white mt-7 h-auto max-h-200 rounded-lg shadow-lg cursor-pointer">
        <div class="flex pl-4 pt-4">
            <h2 class="text-m font-bold mb-2 flex items-center gap-1"> <CalendarDays size="20" /> Recent Production Records</h2>
            <!-- <p class="text-[12px] -mt-2.25 text-gray-600"> Egg production data for each day</p> -->

        </div>
        <RecentTable />
 
    </div>


   </div>
</template>

<script setup lang="ts">
import Skeleton from '../../components/Skeleton.vue';
import GridSummary from './GridSummary.vue';
import { useEggStore } from '../../stores';
import ContentHeader from '../../components/ContentHeader.vue';
import RecentTable from './RecentTable.vue';

const egg = useEggStore();

</script>
