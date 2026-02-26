<template>
    <div class="m-5 overflow-x-auto">
        <ContentHeader title="Egg Production Form" description="Manage the production of eggs" :isCreateBtn="false" />

        <!-- Form -->
         <div class="flex flex-col md:flex-row border justify-between border-gray-300 bg-white rounded-lg shadow-xl h-auto max-h-200">

               <!-- Production Form -->
                <ProductionForm />
            <!-- Egg List Form -->
                <EggListForm/>
         
         </div>
    </div>
</template>
<script setup lang="ts">
import ContentHeader from '../../components/ContentHeader.vue';
import EggListForm from './EggListForm.vue';
import ProductionForm from './ProductionForm.vue';
</script>