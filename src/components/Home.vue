<script setup lang="ts">
import { useRouter } from 'vue-router'
import farmBackground from '../assets/farmBackground.jpg';

defineProps<{  }>()
const router = useRouter()

function goToTasks() {
  router.push('/tasks')
}
</script>

<template>
  <img :src="farmBackground" class="full-width-image"/>
  <button @click="goToTasks">Upgrade</button>
</template>

<style scoped>
.full-width-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}
</style>
