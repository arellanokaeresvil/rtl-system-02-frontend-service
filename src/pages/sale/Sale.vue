<template>
    <div class="m-5">

         <ContentHeader 
        title="Sales & Income Tracking" 
        description="Manage sales and revenue" 
        button="Record Sale"
        route="/sale/create"
        />
    </div>
</template>

<script setup lang="ts">
import ContentHeader from '../../components/ContentHeader.vue';

</script>