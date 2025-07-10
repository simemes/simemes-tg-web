<template>
  <div class="w-full h-full flex items-center justify-center">

    <!-- 為解決 tg app 之 router 問題 -->
    <img :src="$store.isHome ? '/images/FarmerBG.jpg' : '/images/goldBackground3.jpg'" alt="" class="absolute top-0 left-0 w-full h-full object-cover -z-10 blur-md saturate-60 brightness-80">
    <router-view class="landscape-screen" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { init,postEvent } from '@telegram-apps/sdk';

// 為解決 tg app 之 router 問題
import { useStore } from './stores/store'
const $store = useStore()

// 作業系統
const getOS = () => {
  const userAgent = window.navigator.userAgent;
  const isTouch = 'ontouchstart' in window;
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }
  if (/win/i.test(userAgent)) {
    return "Windows";
  }
  if (/android/i.test(userAgent)) {
    return "Android";
  }
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }
  if (/Macintosh/.test(userAgent)) {
    // 若是 Mac，但支援觸控，基本上就是 iPad 偽裝成桌面
    return isTouch ? "iPadOS" : "macOS";
  }
  if (/Linux/.test(userAgent)) {
    return "Linux";
  }
  return "Unknown";
}

onMounted(() => {

  // 從 <script src="https://telegram.org/js/telegram-web-app.js"> 引入的 sdk
  // 目前抓 userinfo 只能從這裡
  try {
    const tg = (window as any).Telegram.WebApp;
    const user = tg.initDataUnsafe?.user;
    const init_data = tg.initData;
    const startParam = tg.initDataUnsafe?.start_param;
    console.log("[Telegram.WebApp] - user: ", user);
    console.log("經由", startParam, "推薦進來的");
    console.log("init_data: ", init_data);
    console.log("tg: ", tg);
  }
  catch (error) {
    console.log("[Telegram.WebApp]: ", error);
  }

  try {
    // 初始化 @telegram-apps/sdk-vue
    init();
    postEvent('web_app_expand')
    postEvent('web_app_toggle_orientation_lock', { locked: true })
    // 若是 mobile 就滿版
    if (getOS() == 'iOS' || getOS() == 'Android' || getOS() == 'Windows Phone' || getOS() == 'iPadOS') {
      postEvent('web_app_request_fullscreen')
      console.log("作業系統是:", getOS(), " web_app_request_fullscreen");
    }
  } catch (error) {
    console.log('[telegram-apps/sdk]: ',  error);
  }

})
</script>

<style>

.will-change-transform {
  will-change: transform;
}

/* ==================== Home Page ==================== */
@media screen and (orientation: landscape) {
  .landscape-screen {
    @apply relative;
    width: calc(100vh * 9 / 16);
    box-shadow: 0 0 30px black;
    border-radius: 12px;
  }
}
.section {
  @apply absolute flex flex-col justify-center items-center w-full text-center font-[Impact,Charcoal,sans-serif] mb-[20px];
  @apply [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000];
  color: white;
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
  border: 1px solid black !important; /* 1. 這裏手機無法呈現 0.83 border 2. home upgrade btn 不知為何是 rgb(100, 108, 255)/ #646cff 先強制 black */
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

.top-lvl-card {
  height: 100%;
}

.border-shadow-lvl0 {
  @apply border-[#FFFFFF] shadow-[#FFFCEE];
}
.border-shadow-lvl1 {
  @apply border-[#FFE564] shadow-[#FFDC30];
}
.border-shadow-lvl2 {
  @apply border-[#2063FF] shadow-[#AADAFF];
}
.border-shadow-lvl3 {
  @apply border-[#FF373B] shadow-[#FE696C];
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
