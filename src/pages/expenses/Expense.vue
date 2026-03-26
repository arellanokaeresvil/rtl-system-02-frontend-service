<template>
    <Skeleton v-if="expenses.loading" />
    <div v-else class="m-5">
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
                        <span class="text-white text-sm opacity-85 ">Total Expenses({{ monthName }})</span>
                    </div> 
                     <span class="text-4xl text-white inline-flex items-center opacity-90 font-extrabold">{{ formatted( expenses.totalExpense) }}</span>
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
                    <h1 class="font-bold text-[13px]">Total expense by categories month of ({{ monthName }})</h1>
                </div>
                <NoData v-if="expenses.summary.length <= 0" />
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">

                    <div v-for="item in expenses.summary" class="border border-gray-300 border-t-7 border-t-gray-400 shadow-xl rounded-lg bg-white p-6">
                        <h1 class="font-extrabold text-m mb-2">{{ item.name }}</h1>
                        <h1 class="font-extrabold text-xl inline-flex items-center">{{ formatted(item.total_amount) }}</h1>
                        <span class="block text-gray-500 text-sm">{{ item.percentage }}% of total</span>
                    </div>


                </div>

            </div>
            <div class="border border-gray-300 rounded-lg shadow-xl bg-white flex-1 p-4">
                <div class="flex justify-between items-center">
                    <h1 class="font-bold text-[13px]">Expense Categories</h1>

                    <router-link to="/expenses/create-category" class="btn btn-black h-8 text-sm mr-2">Add Category</router-link>
                </div>
              <NoData v-if="expenses.categories.length <= 0" />

                      <div class="overflow-auto h-auto">
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

                        <div class="flex justify-end">
                                <div class="join">
                                <button @click="categoryPaginate('prev')" class="join-item btn">«</button>
                                <button class="join-item btn">{{ expenses.categories_pagination?.current_page }} of {{ expenses.categories_pagination?.last_page }}</button>
                                <button @click="categoryPaginate('nxt')" class="join-item btn">»</button>
                            </div>
                        </div>

            </div>

        </div>



        <!-- Table -->

        <div class="border border-gray-300 bg-white rounded-xl mt-5 p-5">
            <div class="flex items-center">
                <TrendingDown />
                <h1 class="font-bold text-[15px] ml-2">Recent Expenses</h1>

            </div>
            
            <NoData v-if="expenses.data.length <= 0"  />
            
            <div v-else class=" h-auto max-h-155">
                       <table class=" overflow-auto table table-s table-pin-rows table-pin-cols">
                        <thead>
                        <tr>
                            <td>Category</td>
                            <td class="cursor-pointer inline-flex items-center gap-1"><Calendar size="20" /> Expense Date</td>
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
                            <td class="inline-flex items-center gap-3"> 
                                <router-link :to="`/expenses/edit/${item.id}`"> <SquarePen class="cursor-pointer" size="20"/></router-link>   
                                <Trash2 @click="removeExpense(item.id)" class="text-red-600 cursor-pointer" size="20"/>
                            </td>
                        </tr>
                       

                        

                    </tbody>
                    </table>

                <div class="flex justify-end">
                        <div class="join">
                        <button @click="recentPaginate('prev')" class="join-item btn">«</button>
                        <button class="join-item btn">{{ expenses.data_pagination?.current_page }} of {{ expenses.data_pagination?.last_page }}</button>
                        <button @click="recentPaginate('nxt')" class="join-item btn">»</button>
                    </div>
                </div>



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
const monthName = new Date().toLocaleString('en-US', { month: 'long' });

const parameter = {
    limit: 10,
    page: 1,
}

onMounted( () => {
   index()
})

const index = () =>{
    expenses.fetchExpenses(parameter)
    expenses.fetchExpenseCategories(parameter)
    expenses.fetchExpenseSummary()
}

const removeExpense = async (id:string) =>{
    await expenses.deleteExpense(id)
    index()
}

const formatted = (amount: string) => {
    const formatPeso =  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
    }).format(amount);

    return formatPeso;
}


const recentPaginate = async (action: string) =>{
     let current_page = expenses.data_pagination?.current_page
    let last_page = expenses.data_pagination?.last_page

   let res = await paginate(action, current_page, last_page)
   if(res) await expenses.fetchExpenses(parameter)
}

const categoryPaginate = async (action: string) =>{
     let current_page = expenses.categories_pagination?.current_page
    let last_page = expenses.categories_pagination?.last_page

   let res = await paginate(action, current_page, last_page)
   if(res) await expenses.fetchExpenseCategories(parameter)
}

const paginate = async (action: string, current_page: number, last_page: number) =>{

    if (action === 'nxt') {
        if (current_page >= last_page) return false; 
        current_page += 1;
    } else {
        if (current_page <= 1) return false; 
        current_page -= 1;
    }
   return  parameter.page = current_page
   
}

</script>