<template>
  <router-view />
</template>

<script setup lang="ts">
</script>

<style>
/* 全域 reset，這裡不能加 scoped */
#app {
  width: 100%;
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
  display: block;
}
</style>
