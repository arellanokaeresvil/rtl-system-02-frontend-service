<template>
    <div class="m-5"> 
        <h2 class="text-2xl font-bold">Batch Management</h2>
         <p class="text-[13px] text-gray-700">Manage and track poultry batches</p>
    </div>

    <div class="border border-gray-200 rounded-lg bg-white  m-5 shadow-lg justify-between p-4">
        <form @submit.prevent="submitForm"> 
                <div class="grid grid-cols-2 gap-2 ">

                    <div class="">
                        <fieldset v-if="route.params.id" class="fieldset">
                            <legend class="fieldset-legend">Batch Code</legend>
                            <input disabled type="text" class="input w-full" placeholder="Batch Code..." v-model="form.batch_code"/>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Breed</legend>
                            <input type="text" class="input w-full" placeholder="Breed..." v-model="form.breed"/>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Supplier Name</legend>
                            <input type="text" class="input w-full" placeholder="Supplier..." v-model="form.supplier_name"/>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Date Received</legend>
                            <input type="date" class="input w-full" v-model="form.date_received"/>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Initial Age Week</legend>
                        <input
                            type="number"
                            class="input validator w-full"
                            required
                            placeholder="Type initial age week..."
                            min="1"
                            v-model="form.initial_age_weeks"
                            />
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Initial Quantity</legend>
                            <input
                            type="number"
                            class="input validator w-full"
                            required
                            placeholder="Type initial quantity..."
                            min="1"
                            v-model="form.initial_quantity"
                            @change="form.current_quantity = form.initial_quantity"
                            />
                        </fieldset>

                    </div>
                    <div class="">
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Cost Per Head</legend>
                            <input
                                type="number"
                                class="input validator w-full"
                                required
                                placeholder="Type initial quantity..."
                                min="1"
                                v-model="form.cost_per_head"
                                />
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Status</legend>
                            <select class="select w-full" v-model="form.status">
                                <option disabled >Pick a status</option>
                                <option value="active">Active</option>
                                <option value="peak">Peak</option>
                                <option value="sold">Sold</option>
                                <option value="culled">Culled</option>
                            </select>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Daily Feed Per Bird (grams)</legend>
                            <input
                                type="number"
                                class="input validator w-full"
                                required
                                placeholder="Type daily feed per bird (per grams)..."
                                min="1"
                                v-model="form.daily_feed_per_bird_kg"
                                />
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Current Quantity</legend>
                            <input
                                type="number"
                                class="input validator w-full"
                                required
                                placeholder="Type current quantity..."
                                min="1"
                                v-model="form.current_quantity"
                                disabled
                                />

                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Notes</legend>
                        <textarea class="textarea w-full" placeholder="Enter notes..." v-model="form.notes"></textarea>
                        </fieldset>


                    </div>
                </div>

                        <div class="flex justify-end mt-5 mr-3 gap-2">
                            <router-link to="/batches"  class="btn bg-gray-300 text-gray-700 p-3 rounded-lg w-m">Cancel</router-link>
                            <button v-if="route.params.id" class="btn bg-black text-white p-3 rounded-lg w-m">Update</button>
                            <button v-else class="btn bg-black text-white p-3 rounded-lg w-m">Create</button>
                        </div>
        </form>
   </div>
</template>

<script setup lang="ts">
import {  onMounted, reactive } from 'vue'
import { useBatchStore } from '../../stores'
import { useRoute } from 'vue-router'
import router from '../../router'


interface FormState {
  batch_code: string,
  breed: string,
  supplier_name: string,
  date_received: string,
  initial_age_weeks: number,
  initial_quantity: number,
  cost_per_head: number,
  status: string,
  daily_feed_per_bird_kg: number,
  current_quantity: number,
  notes: string
}

const form = reactive<FormState>({
  batch_code: "",
  breed: "",
  supplier_name: "",
  date_received: "",
  initial_age_weeks: 0,
  initial_quantity: 0,
  cost_per_head: 0,
  status: "active",
  daily_feed_per_bird_kg: 0,
  current_quantity: 0,
  notes: ""
})

const batch = useBatchStore()
const emit = defineEmits(['closeForm'])
const route = useRoute()

const submitForm = async () => {
    if(route.params.id){
      let res = await batch.updateBatch(form)
      if(res) router.push('/batches')
    }else{
      let res = await batch.createBatch(form)
      if(res) router.push('/batches')
    }

}

onMounted( async () =>{
    if(route.params.id) {
        await batch.show(route.params.id)
        
        if (batch.datas.length) {
        Object.assign(form, batch.datas[0])
        }
    }
})




</script>