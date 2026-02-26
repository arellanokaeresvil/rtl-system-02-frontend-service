<template>
    <div class="m-4 -mt-2" v-if="recentEgg.eggBatchSummary?.length === 0">
    <NoData />
    </div>

    <div v-else class="overflow-x-auto m-4 md:table-fixed">
            <table class="table table-s table-pin-rows table-pin-cols">
                <thead>
                   <tr>
                    <td>Date Collected</td>
                    <td>Batch Code</td>
                    <td>Jumbo</td>
                    <td>Extra Large</td>
                    <td>Large</td>
                    <td>Medium</td>
                    <td>Small</td>
                    <td>Extra Small</td>
                    <td>Peewee</td>
                    <td>Total</td>
                   </tr>
                </thead>
                
            <tbody >
                <tr class="hover:bg-base-300" v-for="item in recentEgg.eggBatchSummary" >
                    <td>{{ item.date_collected }}</td>
                    <td>{{ item.batch }}</td>
                    <td>{{ item.jumbo }}</td>
                    <td>{{ item.extra_large }}</td>
                    <td>{{ item.large }}</td>
                    <td>{{ item.medium }}</td>
                    <td>{{ item.small }}</td>
                    <td>{{ item.extra_small }}</td>
                    <td>{{ item.pewee }}</td>
                    <td class="font-bold">{{ item.total }}</td>
                </tr>
            </tbody>
            </table>

        </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useEggStore } from '../../stores';
import NoData from '../../components/NoData.vue';

const recentEgg = useEggStore();

onMounted(() => {
    recentEgg.fetchEggPerBatch();
});
</script>