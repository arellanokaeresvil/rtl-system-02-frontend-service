<template>
             <div class="flex flex-col h-auto max-h-200 bg-white border border-gray-300 rounded-xl mt-5 p-5">
              <h1 class="font-bold inline-flex items-center"><PhilippinePeso size="17" class="mr-2"/> Recent Sales Records</h1>

              <NoData v-if="sale.recentSales.length <= 0" />
             
              <div v-else class=" overflow-auto space-y-3 h-auto mt-3">
                <div v-for="item in sale.recentSales" class="border flex flex-col border-gray-300 rounded-xl h-25 p-3">
                    
                        <div class="flex-1 ">
                           <div class="flex  justify-between items-center">
                            <div>
                                <h1 class="font-bold">{{ item.sold_to }} 
                                    <div :class="['badge ml-2', item.sale_type == 'egg' ? 'bg-blue-200' : 'bg-green-200 badge-success']">    
                                       <span :class=" ['text-sm', item.sale_type == 'egg' ? 'text-blue-500': 'text-green-500']"> {{ item.sale_type?.toUpperCase() }}</span>
                                       <span>{{ item.sale_type == 'bird' ?item.batch:'' }}</span>
                                    </div>
  
                                </h1>
                                <p class="opacity-60 text-sm">{{ item.sold_at }}</p>
                            </div>
                            
                                   <span class="font-bold text-2xl inline-flex items-center opacity-80 text-green-800"><PhilippinePeso size="21"/> {{ item.total_amount }}</span>
                            

                           </div>
                        </div>

                        <div class="flex-1 flex justify-between items-center ">
                        
                            <div class="flex-1">
                                 <p class="opacity-60 text-sm">Quantity: <span class="text-black opacity-100 font-extrabold">{{ item.quantity }}</span></p>
                            </div>
                            <div class="flex-1">
                                 <p class="opacity-60 text-sm">Unit Price: <span class="text-black opacity-100 font-extrabold inline-flex"> <PhilippinePeso size="15"/>{{ item.price }}</span></p>
                            </div>
                            <div class="flex-1">
                                 <p class="opacity-60 text-sm">Notes: <span class="text-black opacity-100 font-extrabold text-">{{ item.notes }}</span></p>
                            </div>

                          </div>
                        

                       

                    </div>
                
              
              </div>
            


         </div>
</template>

<script setup lang="ts">
import NoData from '../../components/NoData.vue';
import { useSalesStore } from '../../stores';

const sale = useSalesStore()
</script>