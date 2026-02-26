<template>
            <div class="flex-1 p-4 border-r-2 border-gray-300 ">
                <form class="flex flex-col gap-4  h-full m-2" @submit.prevent="handleSubmit()">
                    <div>
                        <h2 class="text-m font-bold flex items-center gap-1"> <BookPlus size="20" />Production Form</h2>


                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Batch</legend>
                            <select class="select validator w-auto" v-model="form.batch_id" required>
                                <option class="border-b border-gray-300" disabled >Pick a batch</option>
                                <option class=" md:text-[12px] border-b m-1 border-gray-300" v-for="batch in batchStore.batchOptions" :key="batch.id" :value="batch.id">
                                    {{ batch.batch_code }} - {{ batch.breed }}
                                </option>
                            </select>
                        </fieldset>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Date Collected</legend>
                            <input type="date" class="input w-full" v-model="form.date_collected" />
                        </fieldset>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Unit</legend>
                            <select @change="eggStore.unit = form.unit" class="select w-full" v-model="form.unit">
                                <option class="border-b border-gray-300" disabled >Pick a unit</option>
                                <option class="border-b border-gray-300" value="piece">Piece</option>
                                <option class="border-b border-gray-300" value="tray">Tray</option>
                                <option class="border-b border-gray-300" value="custom">Customize</option>
                            </select>
                        </fieldset>

                        <fieldset v-if="form.unit === 'piece'" class="fieldset">
                        <legend class="fieldset-legend">Weight</legend>
                        <input
                            type="number"
                            class="input validator w-full"
                            required
                            placeholder="Enter weight per grams..."
                            min="1"
                            v-model="form.weight_per_grams"
                            />
                        </fieldset>


                        <fieldset v-if="form.unit === 'tray' || form.unit === 'custom'" class="fieldset">
                            <legend class="fieldset-legend">Grade</legend>
                            <select class="select w-full" v-model="form.grade">
                                <option class="border-b border-gray-300" selected disabled >Pick a grade</option>
                                <option class="border-b border-gray-300" value="J">Jumbo</option>
                                <option class="border-b border-gray-300" value="XL">Extra Large</option>
                                <option class="border-b border-gray-300" value="L">Large</option>
                                <option class="border-b border-gray-300" value="M">Medium</option>
                                <option class="border-b border-gray-300" value="S">Small</option>
                                <option class="border-b border-gray-300" value="XS">Extra Small</option>
                                <option class="border-b border-gray-300" value="P">Pewee</option>
                            </select>
                        </fieldset>

                        <fieldset v-if="form.unit === 'tray'" class="fieldset">
                            <legend class="fieldset-legend">Tray</legend>
                        <input
                            type="number"
                            class="input  w-full"
                            required
                            placeholder="Enter per tray..."
                            min="1"
                            v-model="form.per_tray"
                            />
                        </fieldset>

                        <fieldset v-if="form.unit === 'custom'" class="fieldset">
                            <legend class="fieldset-legend">Total Eggs</legend>
                        <input
                            type="number"
                            class="input validator  w-full"
                            required
                            placeholder="Enter total eggs..."
                            min="1"
                            max="29"
                            v-model="form.total_eggs"
                            title="Must be between be 1 to 29"
                            />
                            <p class="validator-hint">Must be between be 1 to 29</p>
                        </fieldset>
                     


                       
                    </div>
                    <div class="flex justify-end gap-4 mb-2">
                        <button type="submit" class="btn btn-black p-5"> <Plus size="20" /> Add</button >
                    </div>
                     </form>

            </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useBatchStore, useEggStore } from '../../stores';

const batchStore = useBatchStore();
const eggStore = useEggStore();


interface ProductionFormState {
    batch_id: any,
    date_collected: any,
    unit: string,
    weight_per_grams: number | null,
    per_tray: number | null,
    grade: string,
    total_eggs: number | null
}

const form = reactive<ProductionFormState>({
    batch_id: null,
    date_collected: new Date().toISOString().split('T')[0],
    unit: 'piece',
    weight_per_grams: null,
    per_tray: null,
    grade: '',
    total_eggs: null
});

onMounted(async () =>{
    await batchStore.getOptions();
    eggStore.unit = form.unit;
})

const handleSubmit = () => {
    if(form.unit === 'custom'){
        eggStore.addCustomize([{
            egg_id: eggStore.custom_id,
            batch_id: form.batch_id,
            batch: batchStore.batchOptions?.find(option => option.id === form.batch_id)?.batch_code || '',
            date_collected: form.date_collected,
            grade: form.grade,
            total: form.total_eggs
        }])

    }

    if(form.unit === 'piece'){
        eggStore.addPerPiece([{
            egg_id: eggStore.piece_id,
            batch_id: form.batch_id,
            batch: batchStore.batchOptions?.find(option => option.id === form.batch_id)?.batch_code || '',
            date_collected: form.date_collected,
            weight_grams: form.weight_per_grams
        }])
    }

    if(form.unit === 'tray'){
        eggStore.addPerTray([{
            egg_id: eggStore.tray_id,
            batch_id: form.batch_id,
            batch: batchStore.batchOptions?.find(option => option.id === form.batch_id)?.batch_code || '',
            date_collected: form.date_collected,
            grade: form.grade,
            total: form.per_tray
        }])
    }

}

</script>