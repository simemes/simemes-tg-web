<template>
  <img :src="goldBackground3" class="full-width-image"/>
  <button @click="goToHome">Get Promoted</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import goldBackground3 from '../assets/goldBackground3.jpg';

defineProps<{  }>()
const router = useRouter()

function goToHome() {
  router.push('/')
}
</script>

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
