<template>
    <div>
         <p class="text-sm">Available Eggs</p>
                    <span v-for="grade in gradeMapping" :key="grade.code"  class="text-sm mr-4 text-gray-500">
                        {{ grade.label }}:  
                        <span class="text-black font-bold">{{ eggAvail.eggAvailable?.filter((item: any) => item.grade === grade.code).reduce((acc:number, item: any) => acc + item.count, 0) || 0 }}</span></span>
                  
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