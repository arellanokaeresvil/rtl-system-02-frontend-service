<template>
    <div class="m-5">
    <ContentHeader
        title="Expense Management" 
        description="Track and manage all expenses" 
        :isCreateBtn="false" 
        />

        <div class="flex mt-5 justify-center items-center">

            <form @submit.prevent="handleSubmit()" class="flex flex-col border border-gray-300 bg-white rounded-xl shadow-lg  w-150 justify-between gap-4 p-5">

                <div class="">

                      <fieldset class="fieldset">
                             <legend class="fieldset-legend">Batch<p class="opacity-50">(Optional)</p></legend>
                            <select class="select w-full"  v-model="form.batch_id">
                                <option value="" disabled >Select a batch</option>
                                <option v-for="item in batch.batchOptions" :key="item.id"  :value="item.id">
                                    {{ item.batch_code }} - 
                                    {{ item.breed }}
                                </option>

                            </select>
                        </fieldset>
                      <fieldset class="fieldset">
                             <legend class="fieldset-legend">Category</legend>
                            <select class="select w-full" v-model="form.expense_category_id" required>
                                <option value="" disabled >Select a expense category</option>
                                <option v-for="item in useExpense.category_options" :value="item.id">{{ item.name }}</option>

                            </select>
                        </fieldset>
                      
                          <fieldset class="fieldset">
                            <legend class="fieldset-legend">Expense Date</legend>
                            <input type="date" class="input w-full" v-model="form.expense_date"/>
                        </fieldset>
 
                         <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Amount</legend>
                                    <input
                                        type="number"
                                        class="input validator w-full"
                                        required
                                        placeholder="Type feeds quantity per kg..."
                                        min="1"
                                        step="any"
                                        v-model="form.amount"
                                        />
                        </fieldset>

                         <fieldset class="fieldset">
                            <legend class="fieldset-legend">Reference/Receipt No.</legend>
                            <input type="text" class="input w-full"  placeholder="Enter receipt/reference no..." v-model="form.reference_no" />
                        </fieldset>

                         <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Description</legend>
                                     <textarea class="textarea w-full" placeholder="Enter description or product you purchased..." required v-model="form.description"></textarea>
                             </fieldset>



                </div>

                <!-- buttons -->
                <div class="">
                    <div class="flex justify-end gap-2">
                      <router-link to="/expenses"  class="btn bg-gray-300 text-gray-700 p-3 rounded-lg w-m">Cancel</router-link>
                    <button class="btn btn-black">
                        <span v-if="useExpense.btn_loading" class="loading"></span>
                        <span>Submit</span>
                    </button>
                </div>
                </div>


            </form>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import ContentHeader from '../../components/ContentHeader.vue';
import { useBatchStore, useExpenseStore } from '../../stores';

const batch = useBatchStore()
const useExpense = useExpenseStore()

interface ExpenseForm{
    batch_id: string;
    expense_category_id: string;
    expense_date: string;
    amount: number;
    reference_no: string;
    description: string;
}

const form = reactive<ExpenseForm>({
    batch_id: '',
    expense_category_id: '',
    expense_date:new Date().toISOString().split('T')[0] ?? '',
    amount: 0,
    reference_no: '',
    description: ''
})

onMounted(()=>{
    batch.getOptions()
    useExpense.getCategoriesOptions()
})

const handleSubmit = () => {
    console.log('form', form)
    useExpense.createExpense(form)
}

</script>