<template>
    <div class="m-5">
          <ContentHeader 
            title="Sales & Income Tracking" 
            description="Manage sales and revenue"
            :isCreateBtn="false"  
        />

        <!-- Form -->

        <div class="flex justify-center items-center mt-5 ">

            

            <div class=" border-gray-300 rounded-lg shadow-lg bg-white h-auto w-300">

                <div role="tablist" class="tabs tabs-border mt-5  ml-5">
                        <input type="radio" v-model="form.type" value="egg" class="tab" aria-label="Egg" :checked="form.type == 'egg'" />
                        <input type="radio" v-model="form.type" value="bird" class="tab" aria-label="Chicken" />
                    </div>

                <div v-if="form.type == 'egg'" class=" -mb-1 h-auto m-6">
                   <AvailableEggs />

                </div>
                <form @submit.prevent="handleSubmit()" class=" flex flex-col justify-between">




                    
                    <div class="flex-2 flex p-6 gap-2 ">
                        <div class="flex-1">

                            <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Batch<p v-if="form.type == 'egg'" class="opacity-50">(Optional)</p></legend>
                                    <select class="select w-full" v-model="form.batch_id">
                                        <option class="border-b border-gray-300" value="" disabled >Pick a batch</option>
                                <option class=" md:text-[12px] border-b m-1 border-gray-300" v-for="batch in batchStore.batchOptions" :key="batch.id" :value="batch.id">
                                    {{ batch.batch_code }} - {{ batch.breed }}
                                </option>
                                    </select>
                            </fieldset>

                             <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Sold To</legend>
                                    <input type="text" class="input w-full" placeholder="Sold to..." v-model="form.sold_to" required/>
                            </fieldset>


                            <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Date Sold</legend>
                                    <input type="date" class="input w-full"  v-model="form.sold_at"/>
                            </fieldset>


            
                                <fieldset class="fieldset">
                                            <legend class="fieldset-legend">Notes</legend>
                                        <textarea class="textarea w-full" placeholder="Enter remarks..." v-model="form.notes"></textarea>
                                </fieldset>
            

                        </div>

                        <div class="flex-1">

                             <fieldset v-if="form.type == 'egg'" class="fieldset">
                                    <legend class="fieldset-legend">Unit</legend>
                                    <select class="select w-full" v-model="form.unit" required>
                                        <option value="" disabled >Pick a unit</option>
                                        <option value="tray">Tray</option>
                                        <option value="piece">Piece</option>
                                    </select>
                                </fieldset>

                             <fieldset v-if="form.type == 'egg'" class="fieldset">
                                    <legend class="fieldset-legend">Grade</legend>
                                    <select class="select w-full" v-model="form.grade" required>
                                        <option class="border-b border-gray-300" value="" selected disabled >Pick a grade</option>
                                        <option class="border-b border-gray-300" value="J">Jumbo</option>
                                        <option class="border-b border-gray-300" value="XL">Extra Large</option>
                                        <option class="border-b border-gray-300" value="L">Large</option>
                                        <option class="border-b border-gray-300" value="M">Medium</option>
                                        <option class="border-b border-gray-300" value="S">Small</option>
                                        <option class="border-b border-gray-300" value="XS">Extra Small</option>
                                        <option class="border-b border-gray-300" value="P">Pewee</option>
                                    </select>
                                </fieldset>

                                <fieldset class="fieldset">
                                            <legend class="fieldset-legend">Quantity</legend>
                                                <input
                                                    type="number"
                                                    class="input validator w-full"
                                                    required
                                                    placeholder="Type feeds quantity per kg..."
                                                    min="1"
                                                    @input="computeTotalAmount"
                                                    v-model="form.quantity"
                                                
                                                    />
                                </fieldset>


                                 <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Price</legend>
                                    <input
                                        type="number"
                                        class="input validator w-full"
                                        required
                                        placeholder="Type feeds quantity per kg..."
                                        min="1"
                                        step="any"
                                        @input="computeTotalAmount"
                                        v-model="form.price_per_unit"
                                        />
                                </fieldset>

                                <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Total Amount</legend>
                                    <input type="text" class="input w-full" disabled v-model="form.total_amount"/>
                                </fieldset>

            

                        </div>

                      

                        
      
                    </div>


                <div class="flex justify-end items-center gap-2 p-5">
                      <router-link to="/sales"  class="btn bg-gray-300 text-gray-700 p-3 rounded-lg w-m">Cancel</router-link>
                    <button class="btn btn-black">
                         <span v-if="sale.loading" class="loading"></span>
                            <span v-else>Submit</span>
                    </button>
                </div>
                </form>

            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import ContentHeader from '../../components/ContentHeader.vue';
import { useSalesStore, useBatchStore } from '../../stores';
import AvailableEggs from './AvailableEggs.vue';

const sale = useSalesStore()
const batchStore = useBatchStore()

interface SaleForm{
    type: string;
    batch_id: string;
    sold_to: string;
    sold_at: string;
    count: number;
    quantity: number;
    unit: string;
    grade: string;
    price_per_unit: number;
    price_per_bird: number;
    total_amount: number;
    notes: string;
}

const form = reactive<SaleForm>({
     type: 'egg' ,
    batch_id: '',
    sold_to: '',
    sold_at: new Date().toISOString().split('T')[0] ?? '',
    count: 0,
    quantity: 0,
    unit: 'tray',
    grade: '',
    price_per_unit: 0,
    price_per_bird: 0,
    total_amount: 0,
    notes: '',
})

const computeTotalAmount = () =>{
    form.total_amount = form.quantity * form.price_per_unit
    form.count = form.quantity
    form.price_per_bird = form.price_per_unit
}

const handleSubmit = async () =>{
    sale.createSale(form)
}

onMounted( () =>{
    batchStore.getOptions();
})
  

</script>
