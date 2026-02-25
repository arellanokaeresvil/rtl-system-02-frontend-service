<template>
    <div class="flex-3 p-3 border-r-2 border-gray-300 mt-1 overflow-y-auto">

        <div class="grid grid-row-1 md:grid-row-1 lg:grid-row-2 mt-3  gap-2">
            <!-- Per Pieace -->
            <div v-if="unit === 'piece'" class="h-auto border-2 rounded-lg p-4 border-gray-300">
                <div class="flex justify-between">
                <h2 class="text-m font-bold flex items-center gap-1"> <ClipboardList size="20" />Per Piece</h2>
                <p class="mr-3">Total: {{ perPiece.length }}</p>
                </div>

                <NoData v-show="!perPiece || perPiece.length === 0"/>
                 <div v-show="perPiece && perPiece.length > 0" class="overflow-y-auto h-auto max-h-150">
                 <table class="table table-s table-pin-rows table-pin-cols w-full">
                   
                        <thead class="text-[12px]">
                            <tr>
                                    <td>Batch</td>
                                    <td>Date Collected</td>
                                    <td>Weight</td>
                                    <td>Actions</td>
                            </tr>
                            
                        </thead>
             

                    <tbody class="text-[12px]">
                        <tr v-for="value in perPiece" :key="value.id">
                            <td>{{ value.batch }}</td>
                            <td>{{ value.date_collected }}</td>
                            <td>{{ value.weight_grams }}</td>
                            <td>
                                <button @click="eggStore.removePerPiece(value.egg_id)" class="text-red-500 hover:underline cursor-pointer">Delete</button>
                            </td>
                        </tr>
                       
                        
                    </tbody>

                </table>
                </div>
            </div>

            <!-- Per Tray Table -->
            <div v-if="unit === 'tray'" class="h-auto border-2 rounded-lg p-4 border-gray-300">
                <div class="flex justify-between">
                    <h2 class="text-m font-bold flex items-center gap-1"> <ClipboardList size="20" />Per Tray</h2>
                    <p class="mr-3">Total: {{ perTray.length }}</p>
                </div>

                <NoData v-show="!perTray || perTray.length === 0"/>
              <div v-show="perTray && perTray.length > 0" class="overflow-y-auto  h-auto max-h-150">
                 <table class="table table-s table-pin-rows table-pin-cols w-full">
            
                        <thead class="text-[12px]">
                            <tr>
                                <td>Batch</td>
                                <td>Date Collected</td>
                                <td>Grade</td>
                                <td>Tray</td>
                                <td>Actions</td>
                            </tr>
                        </thead>


                    <tbody class="text-[12px]">
                        <tr v-for="value in perTray" :key="value.id">
                            <td>{{ value.batch }}</td>
                            <td>{{ value.date_collected }}</td>
                            <td>{{ value.grade }}</td>
                            <td>{{ value.total }}</td>
                            <td>
                                <button @click="eggStore.removePerTray(value.egg_id)" class="text-red-500 hover:underline cursor-pointer">Delete</button>
                            </td>
                        </tr>
                      

                    </tbody>

                </table>
                </div>
            </div>

            <!-- Customize Table -->
          <div v-if="unit === 'custom'" class="h-auto border-2 rounded-lg p-4 border-gray-300">
            <div class="flex justify-between">
                <h2 class="text-m font-bold flex items-center gap-1"> <ClipboardList size="20" />Customize List</h2>
                <p class="mr-3">Total: {{ customize.length }}</p>
            </div>

            <NoData v-show="!eggStore.customize || eggStore.customize.length === 0"/>
            <div v-show="eggStore.customize && eggStore.customize.length > 0" class="overflow-y-auto h-auto max-h-150">
                 <table class="table table-s table-pin-rows table-pin-cols w-full">
                   
                        <thead class="text-[12px]">
                        <tr>
                            <td>Batch</td>
                            <td>Date Collected</td>
                            <td>Grade</td>
                            <td>Total</td>
                            <td>Actions</td>
                        </tr>
                        </thead>
                   

                    <tbody class="text-[12px]">
                        <tr v-for="value in customize" :key="value.id" >
                            <td>{{ value.batch }}</td>
                            <td>{{ value.date_collected }}</td>
                            <td>{{ value.grade }}</td>
                            <td>{{ value.total }}</td>
                            <td>
                                <button @click="eggStore.removeCustomize(value.egg_id)" class="text-red-500 hover:underline cursor-pointer">Delete</button>
                            </td>
                        </tr>

                    </tbody>

                </table>
                </div>
            </div>


        </div>
        <div class="flex justify-end gap-2 mt-4">
            <router-link to="/egg-production" class="btn">Cancel</router-link>
            <button  @click="eggStore.clearData()" class="btn">Clear Data</button>
            <button @click="eggStore.handleSubmission()" class="btn btn-black" :disabled="loading">
            <span v-if="loading" class="loading"></span>
            <span v-else>Submit</span>
            </button>
        </div>

    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import NoData from '../../components/NoData.vue';
import { useEggStore } from '../../stores';

const eggStore = useEggStore();
const { customize, perPiece, perTray, unit, loading } = storeToRefs(eggStore);

</script>