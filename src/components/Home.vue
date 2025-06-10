<template>
  <main class="w-full overflow-hidden">
    <img :src="FarmerBG" class="absolute top-0 left-0 w-full h-full object-cover -z-10"/>
    <div class="flex flex-col justify-start items-center min-h-screen pt-[60px] pb-5 mx-auto relative box-border">
      <!-- SIMemes Logo -->
      <div class="section logo">
        <img :src="sim_logo" class="max-w-1/2 block mx-auto"/>
      </div>
      <!-- player avatar -->
      <div class="section top-1/4 -z-10 avatar ava-fadein">
        <img :src="farmerGmove" class="max-w-[40%] w-[186px] h-[154px] object-contain block mx-auto"/>
      </div>
      
      <div class="section top-1/2 translate-context">
        <!-- join -->
        <div v-if="!isJoin">
          <h2>Join The Early Access</h2>
          <h4>What happens in SIMemes,</h4>
          <h4>stays in SIMemes.</h4>
        </div>
        <button @click="Join" class="btn btn-click type1 m-[10px]" v-if="!isJoin" ref="joinBtn">Join</button>
        <!-- 已經 join 時顯示 -->
        <div v-if="isJoin">
          <h2>Welcome to SIMemes!</h2>
          <h4>You’re almost there…</h4>
        </div>
      </div>
      
      <div class="section bottom-[3%] px-5 scale-box">
        <!-- card -->
        <div class="card" v-if="isJoin">
          <!-- claim -->
           <transition name="fade" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="!isClaim">
              <h4>Just claim and drink up</h4>
              <div class="relative w-[80px] h-[80px] mx-auto mt-5 mb-2 border border-[#FFCE00] rounded-2xl shadow-[0px_0px_8px_0px_#FBC222] overflow-hidden">
                <img :src="drink" class="w-full h-full object-contain" ref="picRotate" />
              </div>
            </div>
           </transition>
          <!-- upgrade -->
          <div class="scale-upgrade">
            <div v-if="isClaim">
              <h4>Your early access reward</h4>
              <div class="relative w-[80px] h-[80px] mx-auto mt-5 mb-2 border border-[#FFCE00] rounded-2xl shadow-[0px_0px_8px_0px_#FBC222] overflow-hidden">
                <img :src="FarmerBG" class="absolute" />
                <img :src="FarmerPic" class="relative -ml-1 mt-3 w-full h-full object-contain" ref="picRotate"/>
              </div>
            </div>
          </div>
        </div>
        <button v-if="isJoin && !isClaim" @click="Claim" class="btn btn-click type1 absolute bottom-[10px]" ref="claimBtnTrans">Claim</button>
        <button v-if="isJoin && isClaim" @click="GoToTasks" class="btn btn-click type1 absolute bottom-[10px] translate-btn" ref="upgradeBtnTrans">Upgrade</button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// 導入 plugin
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router'
import { animate, createSpring } from 'animejs';
// 導入 assets
import FarmerBG from '../assets/FarmerBG.jpg';
import farmerGmove from '../assets/farmerGmove.png';
import drink from '../assets/drink.png';
import sim_logo from '../assets/sim_logo.png';
import FarmerPic from '../assets/FarmerPic.png';

const router = useRouter()
const isJoin = ref(false)
const isClaim = ref(false)

// const picRotate = useTemplateRef('picRotate')
const picRotate = ref(null)
const claimBtnTrans = ref(null)
const upgradeBtnTrans = ref(null)
const joinBtn = ref(null)

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

onMounted(() => {
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

function Join() {
  isJoin.value = true
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
  isClaim.value = true
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
  router.push('/tasks')
}

</script>

<style scoped>
</style>
