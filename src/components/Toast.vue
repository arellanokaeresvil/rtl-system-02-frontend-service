<template>
    <div v-if="toast.visible" class="toast toast-top toast-end">
    <div v-if="toast.type === 'error'" class="alert alert-error">
        <span>{{ toast.message }}</span>
    </div>
    <div v-else-if="toast.type === 'success'" class="alert alert-success">
        <span>{{ toast.message }}</span>
    </div>
    <div v-else class="alert alert-info">
        <span>{{ toast.message }}</span>
    </div>
    </div>

</template>

<script setup lang="ts">
import { useToastStore } from '../stores';

const toast = useToastStore();
</script>