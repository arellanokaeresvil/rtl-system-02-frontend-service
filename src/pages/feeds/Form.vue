<template>
    <div class="m-5">
         <ContentHeader 
          title="Feed & Inventory Management" 
        description="Track feed inventory and consumption" 
         :isCreateBtn="false" 
         />

         <div class="flex justify-center items-center">

            <form @submit.prevent="SubmitForm" class="border-gray-300 h-auto w-250 p-3 rounded-lg border bg-white flex-row justify-between mt-5 ">

                <div class="flex-row  p-4">
                
                         <fieldset class="fieldset">
                            <legend class="fieldset-legend">Name</legend>
                            <input type="text" class="input w-full" v-model="form.name" placeholder="Feed Name..." required/>
                        </fieldset>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Type</legend>
                            <select class="select w-full" v-model="form.type" required>
                                <option value="" disabled >Pick a type</option>
                                <option value="grower">Grower</option>
                                <option value="pre-layer">Pre-Layer</option>
                                <option value="layer">Layer</option>
                            </select>
                        </fieldset>

                          <fieldset class="fieldset">
                            <legend class="fieldset-legend">Date Purchased</legend>
                            <input type="date" class="input w-full" v-model="form.date_manufactured"/>
                        </fieldset>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Quantity (kg)</legend>
                            <input
                                type="number"
                                class="input validator w-full"
                                required
                                placeholder="Type feeds quantity per kg..."
                                min="1"
                                v-model="form.quantity_kg"
                                />
                        </fieldset>
      
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Cost (kg)</legend>
                            <input
                                type="number"
                                class="input validator w-full"
                                required
                                placeholder="Type feeds cost per kg..."
                                min="1"
                                step="any"
                                v-model="form.cost_per_kg"
                                />
                        </fieldset>

                           <fieldset class="fieldset">
                            <legend class="fieldset-legend">Supplier</legend>
                            <input type="text" class="input w-full" placeholder="Supplier..." v-model="form.supplier"/>
                        </fieldset>
      
                   
                </div>
               

                <div class="flex justify-end mr-5 gap-2">
                      <router-link to="/feeds"  class="btn bg-gray-300 text-gray-700 p-3 rounded-lg w-m">Cancel</router-link>
                    <button class="btn btn-black">Submit</button>
                </div>

            </form>
          
         </div>

    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import ContentHeader from '../../components/ContentHeader.vue';
import { useFeedStore } from '../../stores';
import router from '../../router';

const feedStore = useFeedStore();

interface FeedForm {
    name: string;
    type: string;
    date_manufactured: string;
    quantity_kg: number;
    cost_per_kg: number;
    supplier: string;
}

const form = reactive<FeedForm>({
    name: '',
    type: '',
    date_manufactured: '',
    quantity_kg: 0,
    cost_per_kg: 0,
    supplier: ''
});


const SubmitForm = () => {
    // if(route.params.id){
    //   let res = await batch.updateBatch(form)
    //   if(res) router.push('/batches')
    // }else{
        feedStore.createFeeds(form)
     
    // }

}
</script>