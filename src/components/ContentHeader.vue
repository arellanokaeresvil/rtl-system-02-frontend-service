<template>
    <div class="flex justify-between items-center mb-3">
        <div class="flex  item-center gap-3">
                <div class="flex flex-col"> 
                    <h2 class="text-2xl font-bold">{{ props.title }}</h2>
                    <p class="text-[13px] text-gray-700">{{ props.description }}</p>
                </div>
        </div>

        <router-link v-show="props.isCreateBtn" class="btn btn-black p-2 " :to="`${props.route}`" > <Plus /> {{ props.button }}</router-link>

     </div>
</template>

<script setup lang="ts">

const props = defineProps({
    title: String,
    description: String,
    button: String,
    route: String,
    isCreateBtn: {
        type: Boolean,
        default: true
    }
})

</script>
