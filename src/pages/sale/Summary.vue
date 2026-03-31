<template>
           <div class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">

            <div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white shadow-xl">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm opacity-100">Total Revenue</p>
                    <TrendingUp size="20"/>
                </div>

                <span class="font-bold text-3xl inline-flex items-center opacity-90"> {{ formatToPeso(sales.data?.total_revenue ) }}</span>

            </div>


            <div class="border border-gray-300 bg-white rounded-lg p-6 shadow-xl">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm opacity-70">Egg Sales</p>
                </div>

                <span class="font-bold text-2xl inline-flex items-center opacity-80 text-blue-600"> {{ formatToPeso(sales.data?.egg_sales )}}</span>

            </div>
            <div class="border border-gray-300 bg-white rounded-lg p-6 shadow-xl">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm opacity-70">Bird Sales</p>
                </div>

                <span class="font-bold text-2xl inline-flex items-center opacity-80 text-green-600"> {{ formatToPeso(sales.data?.bird_sales || 0)}}</span>

            </div>

        </div>

</template>

<script setup lang="ts">
import { usePesoFormat } from '../../composable/pesoFormat';
import { useSalesStore } from '../../stores';

const sales = useSalesStore()
const formatToPeso = usePesoFormat
</script>