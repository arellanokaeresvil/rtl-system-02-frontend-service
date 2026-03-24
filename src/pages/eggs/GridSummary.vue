<template>

         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">

        <div class="bg-white border border-gray-300 rounded-lg p-6 shadow-lg flex justify-between items-center h-20">
            <div>
            <p class="text-[13px] text-gray-600">Total Production Today</p>
            <p class="text-3xl font-bold text-green-700">{{ eggSum.totalEggSummary?.toLocaleString() }}</p>
            </div>
            
        </div>
        <div v-for="grade in gradeMapping" :key="grade.code" class="bg-white border border-gray-300 rounded-lg p-6 shadow-lg flex justify-between items-center h-20">
            <div>
            <p class="text-[13px] text-gray-600">{{ grade.label }}</p>
            <p class="text-2xl font-bold">{{ eggSum.eggSummary?.filter((item: any) => item.grade === grade.code).reduce((acc:number, item: any) => acc + item.count, 0) || 0 }}</p>
            </div>
            
        </div>



     </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useEggStore } from '../../stores';

const eggSum = useEggStore();

const gradeMapping= ref([
    { label: 'Jumbo', code: 'J' },
    { label: 'Extra Large', code: 'XL' },
    { label: 'Large', code: 'L' },
    { label: 'Medium', code: 'M' },
    { label: 'Small', code: 'S' },
    { label: 'Extra Small', code: 'XS' },
    { label: 'Pewee', code: 'P' },
])


onMounted (() => {
    eggSum.fetchEggSummary();
})
</script>