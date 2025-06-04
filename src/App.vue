<template>
  <router-view />
</template>

<script setup lang="ts">
</script>

<style>
/* ==================== Home Page ==================== */

.section {
  @apply absolute flex flex-col justify-center items-center w-full text-center font-[Impact,Charcoal,sans-serif] [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000];
  margin-bottom: 20px;
}

.card {
  @apply relative bg-[#0D3768] h-[224px] w-full py-[15px] border-[2px] border-[#001320] overflow-hidden z-0;
  border-radius: 16px;
}
.card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #0A2F58;
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  z-index: -1;
}

.btn {
  @apply relative w-[180px] h-[48px] bg-[#FFDC30] font-[Impact,sans-serif] text-[14px] text-center overflow-hidden z-0 [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000] m-[10px];
  border: 0.83px solid black;
}
.btn::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
  background-color: #FBC222;
  z-index: -1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* ==================== Tasks Page ==================== */

.task-item {
  @apply relative h-[80px] w-full overflow-hidden z-0;
  @apply bg-[linear-gradient(to_bottom,_#0A2F58_30%,_#16396F_30%)];
  border-radius: 8px;
  border: 1px black solid;
  @apply text-shadow-none;
  font-family: Inter;
  font-weight: 600;
  font-size: 12px;
  color: #E0FEFF;
  margin-bottom: 10px;
}
</style>
