<template>
  <main class="w-full overflow-hidden">
    <img :src="farmBackground" class="absolute top-0 left-0 w-full h-full object-cover -z-10"/>
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
        <button @click="Join" class="btn m-[10px]" v-if="!isJoin">Join</button>
        <!-- 已經 join 時顯示 -->
        <div v-if="isJoin">
          <h2>Welcome to SIMemes!</h2>
          <h4>You’re almost there…</h4>
        </div>
      </div>
      
      <div class="section bottom-[3%] px-5 translate-box">
        <div class="bg-[#0D3768] h-[224px] w-full rounded-2xl py-[15px]" v-if="isJoin && !isClaim">
          <h4>Just claim and drink up</h4>
          <div class="w-[80px] h-[80px] mx-auto my-5 border border-[#FFCE00] rounded-2xl">
            <img :src="claim_pic" class="w-full h-full object-contain"/>
          </div>
          <button @click="Claim" class="btn">Claim</button>
        </div>
        <div class="bg-[#0D3768] h-[224px] w-full rounded-2xl py-[15px]" v-if="isJoin && isClaim">
          <h4>Your early access reward</h4>
          <div class="w-[80px] h-[80px] mx-auto my-5 border border-[#FFCE00] rounded-2xl">
            <img :src="player_pic" class="w-full h-full object-contain"/>
          </div>
          <button @click="GoToTasks" class="btn">Upgrade</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// 導入 plugin
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { animate, createSpring } from 'animejs';
// 導入 assets
import farmBackground from '../assets/farmBackground.jpg';
import farmerGmove from '../assets/farmerGmove.png';
import sim_logo from '../assets/sim_logo.png';
import claim_pic from '../assets/23.png';
import player_pic from '../assets/1.png';

const router = useRouter()
const isJoin = ref(false)
// const isJoin = ref(true)
const isClaim = ref(false)
// const isClaim = ref(true)

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
  animate('.translate-box', {
    translateX: [ 100, 0 ],
    opacity: [ 0, 1 ],
    delay: 2500,
    duration: 300,
    ease: createSpring({ stiffness: 120 }),
  })

})
// ============= 切換 Tasks 頁面 =============
function GoToTasks() {
  router.push('/tasks')
}
function Join() {
  isJoin.value = true
  // translate anim(claim)
  animate('.translate-context', {
    translateX: [ 100, 0 ],
    opacity: [ 0, 1 ],
    duration: 300,
    ease: createSpring({ stiffness: 120 }),
  })
  animate('.translate-box', {
    translateX: [ 100, 0 ],
    opacity: [ 0, 1 ],
    delay: 1000,
    duration: 300,
    ease: createSpring({ stiffness: 120 }),
  })
}
function Claim() {
  isClaim.value = true
  // translate anim(upgrade)
  animate('.translate-box', {
    translateX: [ 100, 0 ],
    opacity: [ 0, 1 ],
    duration: 300,
    ease: createSpring({ stiffness: 120 }),
  })
}
</script>

<style scoped>
.section {
  @apply absolute flex flex-col justify-center items-center w-full text-center font-[Impact,Charcoal,sans-serif] [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000];
  margin-bottom: 20px;
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

</style>
