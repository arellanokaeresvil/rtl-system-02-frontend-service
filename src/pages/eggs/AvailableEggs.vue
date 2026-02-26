<template>
    <div class="flex-1 p-4">
        <h2 class="text-m font-bold mb-2 flex items-center gap-1"> <Egg size="20" /> Available Eggs</h2>
            <div class="grid">
                <div class="grid grid-cols-3 gap-4 p-3">

                    <div class="bg-white border border-gray-300 rounded-lg p-3 shadow-lg flex-col justify-between items-center">
                        <p class="text-[13px] text-gray-600">Total Eggs Available</p>
                        <p class="text-2xl font-bold text-blue-500">{{  eggAvail.totalEggAvailable?.toLocaleString() }}</p>
                    </div>
                    <div v-for="grade in gradeMapping" :key="grade.code" class="bg-white border border-gray-300 rounded-lg p-3 shadow-lg flex-col justify-between items-center">
                            <p class="text-[13px] text-gray-600">{{ grade.label }}</p>
                            <p class="text-2xl font-bold">{{ eggAvail.eggAvailable?.filter((item: any) => item.grade === grade.code).reduce((acc:number, item: any) => acc + item.count, 0) || 0 }}</p>
                    </div>


                </div>
            </div>
        </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useEggStore } from '../../stores';

const eggAvail = useEggStore();

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
    eggAvail.fetchEggAvailable();
})
</script>