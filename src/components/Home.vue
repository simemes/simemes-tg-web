<template>
  <main class="w-full overflow-hidden">

    <!-- 預載入圖片後遮罩消失 -->
    <transition leave-active-class="transition duration-0 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="!isLoaded" class="absolute w-full h-full bg-black z-1"></div>
    </transition>

    <img :src="FarmerBG" class="absolute top-0 left-0 w-full h-full object-cover -z-10"/>
    <div class="flex flex-col justify-start items-center min-h-screen pb-5 mx-auto relative box-border">
      <!-- SIMemes Logo -->
      <div class="section logo mt-[13%] md:mt-[5%]">
        <img :src="sim_logo" class="w-1/2 max-w-[300px] block mx-auto"/>
      </div>
      <!-- player avatar -->
      <div class="section bottom-[51%] -z-10 avatar ava-fadein">
        <img :src="farmerGmove" class="max-w-[40%] w-[186px] h-[154px] object-contain block mx-auto"/>
      </div>
      
      <div class="section translate-context" :class="{ 'bottom-[42%]': $store.isJoin, 'top-[47%]': !$store.isJoin}">
        <!-- join -->
        <div v-if="!$store.isJoin && !$store.isClaim" class="my-5">
          <h2 class="mb-2 text-[24px]">{{ $store.home_context.join.title }}</h2>
          <h4 class="w-50 text-[16px] mx-auto">{{ $store.home_context.join.txt }}</h4>
        </div>
        <button @click="Join" class="btn btn-click type1 m-[10px]" v-if="!$store.isJoin" ref="joinBtn">{{ $store.home_context.join.btn }}</button>
        <!-- 已經 join 時顯示 -->
        <div v-if="$store.isJoin">
          <h2 class=" text-[24px]">{{ $store.home_context.join.isJoinTitle }}</h2>
          <h4 v-if="!$store.isClaim" class="w-50 text-[16px]">{{ $store.home_context.join.isJoinTxt }}</h4>
          <h4 v-if="$store.isClaim" class="w-50 text-[16px]">{{ $store.home_context.join.isClaimTxt }}</h4>
        </div>
      </div>
      
      <div class="section bottom-[3%] px-5 scale-box">
        <!-- card -->
        <div class="card" :class="{ 'top-lvl-card': $store.userLvl >= 3}" v-if="$store.isJoin">
          <!-- claim -->
           <transition name="fade" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="!$store.isClaim">
              <h4>{{ $store.home_context.claim.title }}</h4>
              <div class="relative w-[80px] h-[80px] mx-auto mt-5 mb-2 border border-[#FFCE00] rounded-2xl shadow-[0px_0px_8px_0px_#FBC222] overflow-hidden">
                <img :src="drink" class="w-full h-full object-contain" ref="picRotate" />
              </div>
            </div>
           </transition>
          <!-- upgrade -->
          <div class="scale-upgrade">
            <div v-if="$store.isClaim">
              <h4>{{ $store.home_context.upgrade.title }}</h4>
              <div class="relative w-[80px] h-[80px] mx-auto mt-2 mb-2 border border-[#FFCE00] rounded-2xl shadow-[0px_0px_8px_0px_#FBC222] overflow-hidden" :class="`border-shadow-lvl${$store.userLvl}`">
                <img :src="userBG" class="absolute" />
                <img :src="userPic" class="relative -ml-1 mt-3 w-full h-full object-contain" ref="picRotate"/>
              </div>
              <h4 class="lvl-name">{{ $store.home_context.lvl[$store.userLvl] }}</h4>
            </div>
          </div>
        </div>
        <button v-if="$store.isJoin && !$store.isClaim" @click="Claim" class="btn btn-click type1 absolute bottom-[10px]" ref="claimBtnTrans">{{ $store.home_context.claim.btn }}</button>
        <button v-if="$store.isJoin && $store.isClaim && $store.userLvl < 3" @click="GoToTasks" class="btn btn-click type1 absolute bottom-[10px]" ref="upgradeBtnTrans">{{ $store.home_context.upgrade.btn }}</button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// 導入 plugin
import { ref, onMounted, computed, watch } from 'vue';
// import { useRouter } from 'vue-router'
import { animate, createSpring } from 'animejs';
import { useStore } from '../stores/store'
// 導入 assets
import FarmerBG from '../assets/FarmerBG.jpg';
import farmerGmove from '../assets/farmerGmove.png';
import drink from '../assets/drink.png';
import sim_logo from '../assets/sim_logo.png';

const $store = useStore()
// const router = useRouter()

// 動畫 ref
const picRotate = ref(null)
const claimBtnTrans = ref(null)
const upgradeBtnTrans = ref(null)
const joinBtn = ref(null)

// 預載入圖片
const isLoaded = ref(false)
const imageList: string[] = [
  '/src/assets/FarmerPic.png',
  '/src/assets/FarmerBG.jpg',
];

// ============================ computed ============================
// 升等圖
const userPic = computed(() => {
  // return '/src/assets/' + $store.home_context.lvl[$store.userLvl] + 'Pic.png'
  return new URL(`../assets/${$store.home_context.lvl[$store.userLvl]}Pic.png`, import.meta.url).href
})
const userBG = computed(() => {
  return new URL(`../assets/${$store.home_context.lvl[$store.userLvl]}BG.jpg`, import.meta.url).href
})

// ============================ watch ============================

watch(picRotate, () => {
  if (picRotate.value) {
    animate(picRotate.value, {
      keyframes: [
        { rotate: 0, duration: 0 },
        { rotate: -5, duration: 100 },
        { rotate: 5, duration: 100 },
        { rotate: -5, duration: 100 },
        { rotate: 5, duration: 100 },
        { rotate: 0, duration: 100 },
        { rotate: 0, duration: 500 },
      ],
      loop: true,
    })
  }
})
watch(claimBtnTrans, () => {
  if (claimBtnTrans.value) {
    animate(claimBtnTrans.value, {
      translateY: [ 100, 0 ],
      opacity: [ 0, 1 ],
      delay: 2000,
      duration: 300,
      ease: createSpring({ stiffness: 120 }),
    })
  }
})
watch(upgradeBtnTrans, () => {
  if (upgradeBtnTrans.value) {
    animate(upgradeBtnTrans.value, {
      translateY: [ 100, 0 ],
      opacity: [ 0, 1 ],
      delay: 1000,
      duration: 300,
      ease: createSpring({ stiffness: 120 }),
    })
  }
})

// btn 脈動 anim
watch(joinBtn, () => {
  if (joinBtn.value) animatePulse(joinBtn.value)
})
watch(claimBtnTrans, () => {
  if (claimBtnTrans.value) animatePulse(claimBtnTrans.value)
})
watch(upgradeBtnTrans, () => {
  if (upgradeBtnTrans.value) animatePulse(upgradeBtnTrans.value)
})

// ============================ onMounted ============================

onMounted(async() => {
  // 預載入圖片
  await preloadImages(imageList);
  isLoaded.value = true;

  // 抓 user 等級
  // $store.userLvl = 0
  // $store.isJoin = true
  // $store.isClaim = true

  // logo scale anim
  animate('.logo', {
    scale: 1.1,
    ease: 'inOutQuad',
    duration: 5000,
    loop: true,
    alternate: true
  })
  // player scale anim
  animate('.avatar', {
    scale: 1.1,
    ease: 'inOutQuad',
    duration: 4000,
    delay: 2000,
    loop: true,
    alternate: true
  })
  // player fade anim
  animate('.ava-fadein', {
    opacity: [0, 1],
    duration: 1000,
    delay: 2000,
  })
  // translate anim(join or claim)
  animate('.translate-context', {
    translateX: [ 100, 0 ],
    opacity: [ 0, 1 ],
    delay: 1500,
    duration: 300,
    ease: createSpring({ stiffness: 120 }),
  })
  animate('.scale-box', {
    scale: [0.5, 1],
    opacity: [ 0, 1 ],
    delay: 2500,
    duration: 300,
    ease: createSpring({ stiffness: 120 }),
  })

})

// ============================ function ============================

function Join() {
  $store.isJoin = true
  animate('.translate-context', {
    translateX: [ 100, 0 ],
    opacity: [ 0, 1 ],
    duration: 300,
    ease: createSpring({ stiffness: 120 }),
  })
  animate('.scale-box', {
    scale: [0.5, 1],
    opacity: [ 0, 1 ],
    delay: 1000,
    duration: 300,
    ease: createSpring({ stiffness: 120 }),
  })
}

function Claim() {
  $store.isClaim = true
  animate('.scale-upgrade', {
    scale: [0.5, 1],
    opacity: [ 0, 1 ],
    duration: 300,
    delay: 500,
    ease: createSpring({ stiffness: 120 }),
  })
}

// 按鈕動畫
function animatePulse(target: HTMLElement | null) {
  if (!target) return
  animate(target, {
    keyframes: [
      { scale: 1, duration: 0 },
      { scale: 1.1, duration: 200 },
      { scale: 1, duration: 200 },
      { scale: 1, duration: 3000 },
    ],
    loop: true,
  })
}

// ============= 切換 Tasks 頁面 =============
function GoToTasks() {
  // router.push('/tasks')

  // 為解決 tg app 之 router 問題
  $store.isHome = false
  $store.isTasks = true
}
// 預載入圖片
function preloadImages(imageUrls: string[]) {
  console.log("preloadImages")
  return Promise.all(
    imageUrls.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        })
    )
  );
}

</script>

<style scoped>
</style>
