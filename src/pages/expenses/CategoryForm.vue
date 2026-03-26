<template>
    <div class="m-5">
        <ContentHeader
        title="Expense Category"
        description="Track and manage all expenses category"
        :isCreateBtn="false"
        />

            <div class="flex mt-5 justify-center items-center">

            <form @submit.prevent="handleSubmit()" class="flex flex-col border border-gray-300 bg-white rounded-xl shadow-lg  w-150 justify-between gap-4 p-5">

                <div class="">


                         <fieldset class="fieldset">
                            <legend class="fieldset-legend">Name</legend>
                            <input type="text" class="input w-full"  placeholder="Enter receipt/reference no..." v-model="form.name" />
                        </fieldset>

                         <fieldset class="fieldset">
                                    <legend class="fieldset-legend">Description</legend>
                                     <textarea class="textarea w-full" placeholder="Enter description or product you purchased..." required v-model="form.description" ></textarea>
                             </fieldset>



                </div>

                <!-- buttons -->
                <div class="">
                    <div class="flex justify-end gap-2">
                      <router-link to="/expenses"  class="btn bg-gray-300 text-gray-700 p-3 rounded-lg w-m">Cancel</router-link>
                    <button class="btn btn-black">
                        <span v-if="expense.loading" class="loading"></span>
                        <span>{{ route.params.id ? 'Update':'Submit'}}</span>
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
import { useExpenseStore } from '../../stores';
import { useRoute } from 'vue-router';


const expense = useExpenseStore()
const route = useRoute()

interface CategoryForm{
    name: string
    description: string
}

const form = reactive<CategoryForm>({
    name: '',
    description: ''
})

onMounted( async () =>{

    if(route.params.id){
        const res = await expense.showExpenseCategories(route.params.id)
        form.name = res.data?.data?.name
        form.description = res.data?.data?.description
    }


})

const handleSubmit = () =>{
    if(route.params.id){
        expense.updateCategory(form, route.params.id)
    }else{
        expense.createCategory(form)
    }

}
</script>