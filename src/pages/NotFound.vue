<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <router-link to="/">Go back home</router-link>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
}
.not-found h1 {
  font-size: 5rem;
  margin-bottom: 1rem;
}
.not-found p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
</style>
