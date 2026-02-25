<template>
    <div class="m-5 overflow-x-auto">
        <ContentHeader title="Egg Production Form" description="Manage the production of eggs" :isCreateBtn="false" />

        <!-- Form -->
         <div class="flex border justify-between border-gray-300 bg-white rounded-lg shadow-xl h-auto max-h-200">

            <!-- Egg List Form -->
                <EggListForm/>
            <!-- Production Form -->
                <ProductionForm />
         </div>
    </div>
</template>
<script setup lang="ts">
import ContentHeader from '../../components/ContentHeader.vue';
import EggListForm from './EggListForm.vue';
import ProductionForm from './ProductionForm.vue';
</script>