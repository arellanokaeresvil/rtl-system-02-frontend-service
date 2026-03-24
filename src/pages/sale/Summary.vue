<template>
           <div class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">

            <div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white shadow-xl">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm opacity-100">Total Revenue</p>
                    <TrendingUp size="20"/>
                </div>

                <span class="font-bold text-3xl inline-flex items-center opacity-90"><PhilippinePeso size="30"/> {{ sales.data?.total_revenue || 0 }}</span>

            </div>


            <div class="border border-gray-300 bg-white rounded-lg p-6 shadow-xl">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm opacity-70">Egg Sales</p>
                </div>

                <span class="font-bold text-2xl inline-flex items-center opacity-80 text-blue-600"><PhilippinePeso size="21"/> {{ sales.data?.egg_sales || 0}}</span>

            </div>
            <div class="border border-gray-300 bg-white rounded-lg p-6 shadow-xl">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm opacity-70">Bird Sales</p>
                </div>

                <span class="font-bold text-2xl inline-flex items-center opacity-80 text-green-600"><PhilippinePeso size="21"/> {{ sales.data?.bird_sales || 0}}</span>

            </div>

        </div>

</template>

<script setup lang="ts">
import { useSalesStore } from '../../stores';

const sales = useSalesStore()
</script>