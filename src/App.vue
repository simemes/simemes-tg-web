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
  @apply font-[Impact,sans-serif] text-center [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000] m-[10px];
  @apply shadow-[inset_0px_-4px_0px_0px_#00000040] bg-[linear-gradient(to_bottom,_#FFDC30_50%,_#FBC222_50%,_#FFDC30_100%)];
  border: 0.83px solid black;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: manipulation;
}
.btn-click {
  @apply transition-transform duration-100 active:scale-90 select-none outline-none ring-0;
}
.type1 {
  @apply w-[180px] h-[48px] text-[14px];
}
.type2 {
  @apply w-[80px] h-[32px] text-[12px];
}

/* ==================== Tasks Page ==================== */

.back-btn {
  @apply transition-transform duration-100 active:scale-90 select-none outline-none ring-0;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: manipulation;
}

.lvl-name {
  @apply  text-[14px] leading-[100%] [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000];
}

.disabled {
  @apply bg-[linear-gradient(to_bottom,_#6D638A_50%,_#5D537A_50%,_#6D638A_100%)];
}

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
