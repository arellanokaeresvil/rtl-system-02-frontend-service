<template>
    <Skeleton v-show="feedStore.loading"/>

    <div v-show="!feedStore.loading" class="p-5">
        <ContentHeader 
        title="Feed & Inventory Management" 
        description="Track feed inventory and consumption" 
        :isCreateBtn=false
        />

        <!-- Table List -->
         <div class="flex flex-col border border-gray-300 rounded-2xl bg-white p-5  h-auto max-h-200 mt-5">

             <h1 class="font-bold text-[15px] ml-2 flex items-center"> <router-link to="/feeds"> <MoveLeft size="35" class="mr-2 cursor-pointer" /></router-link>   {{ params }} Feeds Record</h1>

             <NoData v-if="feedStore.datas.length <= 0" />

             <div v-else class="overflow-auto">
                    <table class="table table-s table-pin-rows table-pin-cols">
                        <thead>
                        <tr>
                            <td>Feed Code</td>
                            <td>Name</td>
                            <td>Quantity (kg)</td>
                            <td>Remaining (kg)</td>
                            <td>Cost (kg)</td>
                            <td>Total Cost</td>
                            <td>Date Purchased</td>
                            <td>Supplier</td>
                            <td>Action</td>
                        </tr>
                        </thead>
                        
                    <tbody >
                        <tr v-for="item in feedStore.datas" :key="item.id">
                            <td>{{ item.feed_code }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.quantity_kg }}</td>
                            <td>{{ item.remaining_kg }}</td>
                            <td><div class="flex items-center"><PhilippinePeso size="15"/>{{ item.cost_per_kg }}</div></td>
                            <td><div class="flex items-center"><PhilippinePeso size="15"/>{{ item.total_cost }}</div></td>                
                            <td>{{ item.date_manufactured }}</td>
                            <td>{{ item.supplier }}</td>
                            <td> <Trash2 size="18" class="cursor-pointer text-red-700" /></td>
                            
                        </tr>
                        

                    </tbody>
                    </table>
             </div>

             

         </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ContentHeader from '../../components/ContentHeader.vue';
import { useRoute } from 'vue-router';
import { useFeedStore } from '../../stores';
import Skeleton from '../../components/Skeleton.vue';
import NoData from '../../components/NoData.vue';

const route = useRoute();
const params = ref();
const feedStore = useFeedStore();

onMounted(()=>{
    if(route.params.id){
        params.value = route.params.id
        params.value = params.value.charAt(0).toUpperCase() + params.value.slice(1)
        feedStore.fetchFeeds( {type: route.params.id, limit: 20 });
    }

    // console.log(feedStore.datas)
})
</script>