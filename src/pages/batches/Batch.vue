<template>
    <Skeleton v-show="batch.loading" />

   <div v-show="!batch.loading" class="m-5">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="flex flex-col"> 
                    <h2 class="text-2xl font-bold">Batch Management</h2>
                    <p class="text-[13px] text-gray-700">Manage and track poultry batches</p>
                </div>

                <!-- Search Field -->
                <div class="w-80">
                    <label class="input">
                    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input ref="searchInput" v-model="search" type="search" required placeholder="Search" />
                    </label>
                </div>

            </div>


                <router-link class="btn btn-black p-2 " to="/batches/create" > <Plus size="20" /> Add New Batch</router-link>

        </div>
        <NoData v-show="batch.datas?.length === 0" />
        <div v-show="batch.datas?.length > 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
            <div v-for="data in batch.datas" :key="data.id" class="bg-card border border-gray-300 rounded-lg p-6 shadow-lg bg-white">

                <div class="flex justify-between mb-6">
                    <div>
                        <h3 class="font-bold"> {{ data.batch_code }}</h3> 
                    </div>
                    <div>
                        <span v-if="data.status == 'active'" class="badge badge-xs badge-success">{{ data.status.toUpperCase() }}</span>
                        <span v-else-if="data.status == 'peak'" class="badge badge-xs badge-info">{{ data.status.toUpperCase() }}</span>
                        <span v-else class="badge badge-xs badge-error"> {{ data.status.toUpperCase() }}</span>
                    </div>
                </div>

                <div class="space-y-2 mb-5">
                                    <div class="flex justify-between">
                                            <span class="text-xs text-gray-600">Breed:</span>
                                            <span class="text-xs">{{ data.breed }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                            <span class="text-xs text-gray-600">Quantity:</span>
                                            <span class="text-xs">{{ data.current_quantity }} birds</span>
                                    </div>
                                    <div class="flex justify-between">
                                            <span class="text-xs text-gray-600">Start Date:</span>
                                            <span class="text-xs">{{ data.date_received }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                            <span class="text-xs text-gray-600">Age:</span>
                                            <span class="text-xs">{{ data.current_age_weeks }} weeks</span>
                                    </div>
                </div>

                <div class="flex gap-2 ">
                    <router-link :to="`/batches/edit/${data.id}`"  class="flex-1 btn rounded-lg p-2"> <SquarePen size="20"/> Edit</router-link>
                    <button @click="deleteBatch(data.id)" class="flex-1 btn btn-black text-white rounded-lg p-2"> <Trash2 size="18" /> Delete</button>
                </div>

            </div>



        </div>
         <div id="load-more-btn" class="mt-3"></div>
            <div v-show="batch.datas?.length >= 12 && batch.datas?.length != batch.total" class="flex justify-center mt-5 ">
                <button @click="loadMoreBatches"
                    class="btn  btn-black rounded-lg text-white p-5">
                    Load More
                </button>
            </div>
           
   </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref, watch } from 'vue';
import { useBatchStore, useToastStore } from '../../stores';
import Skeleton from '../../components/Skeleton.vue';
import NoData from '../../components/NoData.vue';

const batch = useBatchStore();
const toast = useToastStore();

onMounted(() =>{
    batch.fetchBatches()
})

const deleteBatch = async (id: any) => {
    const confirmed = confirm('Are you sure you want to delete this batch?')
    if (confirmed) {
        const success = await batch.deleteBatch(id)
        toast.show(success?.message, 'success')
        if (success) {
            batch.fetchBatches()
        } 
    }
}

const loadMoreBatches = async () => {
    await batch.loadMoreBatches()
      nextTick(() => {
            const btn = document.getElementById('load-more-btn')
              if (btn) {
            btn.scrollIntoView({ behavior: 'smooth', block: 'end' })
            }

    })
}

//Debouncing Search Field


const search = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
let timeout: ReturnType<typeof setTimeout> | null = null

watch(search, (value) => {
  if (timeout) clearTimeout(timeout)

  timeout = setTimeout( async() => {
    await batch.fetchBatches({ search: value, limit: 12 })

        setTimeout(() => {
        searchInput.value?.focus()
        }, 0)

  }, 800)

})

</script>