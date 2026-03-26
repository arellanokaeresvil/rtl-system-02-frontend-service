<template>
    <!-- <Skeleton /> -->
    <div class="m-5">
       <ContentHeader 
        title="Expense Management" 
        description="Track and manage all expenses" 
        button="Add Expense"
        route="/expenses/create"
        />

        <div class="flex items-center shadow-xl rounded-xl bg-linear-to-r from-red-600 to-orange-500 mt-5 h-30 p-5">

            <div class="flex-1 flex justify-between items-center center">
                <div class="flex-1 h-10 -mt-5">
                    <div class="ml-2">
                        <span class="text-white text-sm opacity-85 ">Total Expenses(March)</span>
                    </div> 
                     <span class="text-4xl text-white inline-flex items-center opacity-90 font-extrabold"><PhilippinePeso size="35"/> 10,000</span>
                </div>
                <div class="flex flex-1 h-10  justify-end pr-5">
                    <div class="rounded-xl glass w-15 h-15 text-white opacity-80 items-center flex justify-center -mt-2"><PhilippinePeso size="35"/></div>
                </div>
            </div>

        </div>

        <!-- Grid Summary -->

        <div class=" grid grid-cols-1 lg:grid-cols-2 justify-between mt-5 gap-3">
            <div class=" flex-2">
                 <div class="flex items-center m-2">
                    <h1 class="font-bold text-[13px]">Total expense by categories month of (MARCH)</h1>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                    <div class="border border-gray-300 border-t-7 border-t-gray-400 shadow-xl rounded-lg bg-white p-6">
                        <h1 class="font-extrabold text-m mb-2">Feeds</h1>
                        <h1 class="font-extrabold text-xl inline-flex items-center"><PhilippinePeso class="-ml-1" size="22"/>5,000</h1>
                        <span class="block text-gray-500 text-sm">60.5% of total</span>
                    </div>

                    <div class="border border-gray-300 border-t-7 border-t-gray-400 shadow-xl rounded-lg bg-white p-6">
                        <h1 class="font-extrabold text-m mb-2">Supplements & Veterinary Drugs</h1>
                        <h1 class="font-extrabold text-xl inline-flex items-center"><PhilippinePeso class="-ml-1" size="22"/>2,000</h1>
                        <span class="block text-gray-500 text-sm">60.5% of total</span>
                    </div>

                    <div class="border border-gray-300 border-t-7 border-t-gray-400 shadow-xl rounded-lg bg-white p-6">
                        <h1 class="font-extrabold text-m mb-2">Utilities</h1>
                        <h1 class="font-extrabold text-xl inline-flex items-center"><PhilippinePeso class="-ml-1" size="22"/>1,000</h1>
                        <span class="block text-gray-500 text-sm">60.5% of total</span>
                    </div>

                    <div class="border border-gray-300 border-t-7 border-t-gray-400 shadow-xl rounded-lg bg-white p-6">
                        <h1 class="font-extrabold text-m mb-2">Maintenance</h1>
                        <h1 class="font-extrabold text-xl inline-flex items-center"><PhilippinePeso class="-ml-1" size="22"/>1,000</h1>
                        <span class="block text-gray-500 text-sm">60.5% of total</span>
                    </div>

                    <div class="border border-gray-300 border-t-7 border-t-gray-400 shadow-xl rounded-lg bg-white p-6">
                        <h1 class="font-extrabold text-m mb-2">Labor</h1>
                        <h1 class="font-extrabold text-xl inline-flex items-center"><PhilippinePeso class="-ml-1" size="22"/>1,000</h1>
                        <span class="block text-gray-500 text-sm">60.5% of total</span>
                    </div>
                

                </div>

            </div>
            <div class="border border-gray-300 rounded-lg shadow-xl bg-white flex-1 p-4">
                <div class="flex justify-between items-center">
                    <h1 class="font-bold text-[13px]">Expense Categories</h1>

                    <router-link to="/expenses/create-category" class="btn btn-black h-8 text-sm mr-2">Add Category</router-link>
                </div>
                <!-- <NoData /> -->

                      <div class="overflow-auto h-auto max-h-100">
                       <table class="table table-s table-pin-rows table-pin-cols">
                        <thead>
                        <tr>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Actions</td>
                        </tr>
                        </thead>
                        
                    <tbody >

                        <tr v-for="value in expenses.categories">
                            <td>{{ value.name }}</td>
                            <td>{{value.description}}</td>
                            <td class="inline-flex items-center gap-3"> <router-link :to="`/expenses/edit-category/${value.id}`"><SquarePen size="20"/></router-link> </td>
                        </tr>

                        
                    </tbody>
                    </table>
            </div>

            </div>

        </div>



        <!-- Table -->

        <div class="border border-gray-300 bg-white rounded-xl mt-5 p-5">
            <div class="flex items-center">
                <TrendingDown />
                <h1 class="font-bold text-[15px] ml-2">Recent Expenses</h1>

            </div>
            <NoData v-show="expenses.data.length <= 0"  />
            <div class="overflow-auto h-auto max-h-150">
                       <table class="table table-s table-pin-rows table-pin-cols">
                        <thead>
                        <tr>
                            <td>Category</td>
                            <td>Expense Date</td>
                            <td>Reference/Receipt No.</td>
                            <td>Remarks</td>
                             <td>Amount</td>
                            <td>Actions</td>
                        </tr>
                        </thead>
                        
                    <tbody >

                        <tr v-for="item in expenses.data">
                            <td>{{ item.category?.name }}</td>
                            <td>{{ item.expense_date }}</td>
                            <td>{{ item.reference_no }}</td>
                            <td>{{ item.description }}</td>
                            <td class="font-bold text-red-700 text-lg">{{ item.amount }}</td>
                            <td class="inline-flex items-center gap-3"> <SquarePen class="cursor-pointer" size="20"/> <Trash2 class="text-red-600 cursor-pointer" size="20"/></td>
                        </tr>
                       

                        

                    </tbody>
                    </table>
            </div>


        </div>
        
    </div>
</template>

<script setup lang="ts">
import ContentHeader from '../../components/ContentHeader.vue';
import Skeleton from '../../components/Skeleton.vue';
import NoData from '../../components/NoData.vue';
import { useExpenseStore } from '../../stores';
import { onMounted } from 'vue';

const expenses = useExpenseStore();

onMounted( () => {
    expenses.fetchExpenses()
    expenses.fetchExpenseCategories()
})
</script>