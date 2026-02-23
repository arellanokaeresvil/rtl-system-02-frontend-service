<template>
    <div class="flex-3 p-4 border-r-2 border-gray-300 ">
        <h2 class="text-m font-bold flex items-center gap-1"> <ClipboardList size="20" />Eggs List</h2>
        <div class="grid grid-cols-3 mt-3 border-2 border-gray-300">
            <div class="h-auto border-r-2 border-gray-300">
                <h2 class="text-m font-bold flex items-center gap-1"> <ClipboardList size="20" />Per Piece</h2>
            </div>
            <div class="h-auto border border-gray-300">
                <h2 class="text-m font-bold flex items-center gap-1"> <ClipboardList size="20" />Per Tray</h2>
            </div>
            <div class="h-auto">
                <h2 class="text-m font-bold flex items-center gap-1"> <ClipboardList size="20" />Customize List</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>