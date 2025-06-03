<template>
  <main class="home">
    <img :src="farmBackground" class="full-width-image"/>

    <div class="container">
      <!-- SIMemes Logo -->
      <div class="logo">
        <img :src="sim_logo" class="sim_logo"/>
      </div>
      <!-- player avatar -->
      <div class="avatar ava-fadein">
        <img :src="farmerGmove" class="avatar-img"/>
      </div>
      
      <div class="context translate-context">
        <!-- join -->
        <div v-if="!isJoin">
          <h2>Join The Early Access</h2>
          <h4>What happens in SIMemes,</h4>
          <h4>stays in SIMemes.</h4>
        </div>
        <button @click="Join" class="btn joinbtn" v-if="!isJoin">Join</button>
        <!-- 已經 join 時顯示 -->
        <div v-if="isJoin">
          <h2>Welcome to SIMemes!</h2>
          <h4>You’re almost there…</h4>
        </div>
      </div>
      
      <div class="box translate-box">
        <!-- isJoin && !isClaim -->
        <div class="upgrade-box" v-if="isJoin && !isClaim">
          <h4>Just claim and drink up</h4>
          <div class="claim-pic-box">
            <img :src="claim_pic" class="claim-pic"/>
          </div>
          <button @click="Claim" class="btn">Claim</button>
        </div>
        <!-- isJoin && isClaim -->
        <div class="upgrade-box" v-if="isJoin && isClaim">
          <h4>Your early access reward</h4>
          <div class="claim-pic-box">
            <img :src="player_pic" class="claim-pic"/>
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
    // delay: 1000,
    duration: 300,
    ease: createSpring({ stiffness: 120 }),
  })
}
</script>

<style scoped>
.home {
  width: 100%;
  overflow: hidden;
}
.full-width-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  padding: 60px 0 20px 0;
  box-sizing: border-box;
  position: relative;
}

/* spacer 占畫面 25% 高度 */
.spacer-15 {
  height: 15vh;
}

/* 基本樣式 */
.logo,
.avatar,
.context,
.box {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  font-family: Impact, Charcoal, sans-serif;
  text-shadow:
  2px 2px 0 #000,
 -2px -2px 0 #000,
  2px -2px 0 #000,
 -2px 2px 0 #000;
}
.avatar {
  top: 25%;
  z-index: -1;
}
.context {
  top: 50%;
  
}
.box {
  bottom: 6%;
}

.sim_logo {
  max-width: 50%;
  display: block;
  margin: 0 auto;
}


.avatar-img {
  max-width: 40%;
  width: 186px;
  height: 154px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.upgrade-box {
  background-color: #0D3768;
  height: 224px;
  width: 340px;
  border-radius: 16px;
  padding: 15px 0;
}
.claim-pic-box {
  margin: 20px auto;
  width: 80px;
  height: 80px;
  border: #FFCE00 1px solid;
  border-radius: 16px;
}
.claim-pic {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.btn {
  width: 180px;
  height: 48px;
  position: relative;
  background-color: #FFDC30;
  border: 0.83px solid black;
  font-family: Impact, sans-serif;
  text-shadow: 
    1px 1px 0 #000,
   -1px -1px 0 #000,
    1px -1px 0 #000,
   -1px 1px 0 #000;
  font-size: 14px;
  z-index: 0;
  overflow: hidden;
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
.joinbtn {
  margin: 10px;
}

</style>
