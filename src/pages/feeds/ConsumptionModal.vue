<template>
        <dialog id="my_modal_4" ref="dialogRef" class="modal">
            <form @submit.prevent="handleSubmit()" class="modal-box w-11/12 max-w-3xl">
                <h3 class="text-lg font-bold">Feeds Consumption Form</h3>
              
                <div class=" grid grid-cols-2 h-auto mt-3 gap-4">
                    <div>

                         <fieldset class="fieldset">
                            <legend class="fieldset-legend">Feed Type</legend>
                            <select @change="fetchFeedOptions()" class="select w-full" required v-model="form.type">
                                <option disabled value="" >Select feed type</option>
                                <option value="layer"> Layer </option>
                                <option value="pre-layer"> Pre-Layer </option>
                                <option value="grower"> Grower </option>
                            </select>
                        </fieldset>

                         <fieldset class="fieldset">
                            <legend class="fieldset-legend">Feed <span class="opacity-40">(First-In First-Out (FIFO) rule)</span></legend>
                            <select class="select w-full" v-model="form.feed_id" required :disabled="form.type == ''">
                                <option disabled value="" >Pick feed (note: top list first stocks)</option>
                                <option v-for="value in feeds.options" :key="value.id" :value="value.id">
                                    {{ value.feed_code }} - {{ value.name }}
                                </option>
                            </select>
                        </fieldset>

                         <fieldset class="fieldset">
                            <legend class="fieldset-legend">Date Consumed</legend>
                            <input type="date" class="input w-full" v-model="form.used_at" required/>
                        </fieldset>

                    </div>

                    <div>
                           <fieldset class="fieldset">
                            <legend class="fieldset-legend">Batch</legend>
                           <select class="select w-full" v-model="form.batch_id" required>
                                <option disabled  value="">Pick batch</option>
                                <option @click="computeQuantity(value)" v-for="value in batch.batchOptions" :key="value.id" :value="value.id">
                                    {{ value.batch_code }} - {{ value.breed }}
                                </option>
                            </select>
                        </fieldset>

                       <fieldset class="fieldset">
                            <legend class="fieldset-legend">Quantity (kg)</legend>
                            <input
                                type="number"
                                class="input validator w-full"
                                required
                                placeholder="Enter feeds quantity consumed (kg)..."
                                min="0"
                                step="any"
                                v-model.number="form.quantity_kg"
                                disabled
                                />
                        </fieldset>
                         <fieldset class="fieldset">
                            <legend class="fieldset-legend">Remarks</legend>
                        <textarea class="textarea w-full" placeholder="Enter remarks..." v-model="form.remarks"></textarea>
                    </fieldset>

                    </div>
                  
                        
              
                <!-- <div class="col-span-2">
                     <fieldset class="fieldset">
                            <legend class="fieldset-legend">Remarks</legend>
                        <textarea class="textarea w-full" placeholder="Enter remarks..." v-model="form.remarks"></textarea>
                    </fieldset>
                </div> -->

                </div>
                

              

                <div class="modal-action">
                   
                    <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                    </form>
                      
                    <button type="submit" class="btn btn-black">
                            <span v-if="feeds.btn_loading" class="loading"></span>
                            <span v-else>Submit</span>
                        </button>
                        
                </div>
                 
                 
            </form>
        </dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useBatchStore, useFeedStore } from '../../stores';

const batch = useBatchStore()
const feeds = useFeedStore()

const dialogRef = ref<HTMLDialogElement | null>(null)

interface ConsumptionForm{
    feed_id: string;
    batch_id: string;
    used_at: string;
    quantity_kg: number;
    remarks: string
    type:string
}

const form = reactive<ConsumptionForm>({
    feed_id: '',
    batch_id: '',
    used_at: new Date().toISOString().split('T')[0] ?? '',
    quantity_kg: 0,
    remarks: '',
    type: ''
})

const resetForm = () => {
    form.feed_id = ''
    form.batch_id = ''
    form.used_at = new Date().toISOString().split('T')[0] ?? '',
    form.quantity_kg = 0
    form.remarks = '',
    form.type
}

const computeQuantity = (batch: any) => {
    let daily_feed_grams_per_bird = batch.daily_feed_per_bird_kg
    let remaining_quantity = batch.current_quantity

    form.quantity_kg = (daily_feed_grams_per_bird * remaining_quantity) / 1000
}

const fetchFeedOptions = () => {
    const parameter = {
        type: form.type
    }
    console.log('par',parameter)
    feeds.getOptions(parameter)
}

const handleSubmit = async () =>{
    const res = await feeds.createFeedsConsumption(form)

    if (res) {
        dialogRef.value?.close()
        resetForm()
        await feeds.fetchConsumedFeeds({ limit: 20 })
        await feeds.fetchFeedsByType();
    }
}

</script>
