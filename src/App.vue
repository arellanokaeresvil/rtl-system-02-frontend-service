<script setup lang="ts">
import Toast from './components/Toast.vue';

</script>

<template>
  <main id="app">
    <router-view></router-view>
    <Toast />
  </main>
</template>

<style>
#app {
  /* font-family: Arial, sans-serif; */
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #160f00;
}

.bottom-buttons {
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
}
</style>
