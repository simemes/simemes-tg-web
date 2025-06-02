<script setup lang="ts">
</script>

<template>
  <div>
  </div>
  <router-view />
</template>

<style>
/* 全域 reset，這裡不能加 scoped */
#app {
  padding: 0;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: sans-serif;
}

img {
  max-width: 100%;
  display: block;
}
</style>
