<template>
  <main class="w-full overflow-hidden">
    <img :src="goldBackground3" class="absolute top-0 left-0 w-full h-full object-cover -z-10"/>
    <!-- fadein anim -->
      <div class="flex flex-col justify-start items-center min-h-screen pt-[60px] pb-5 mx-auto relative box-border fadein">
        <div class="absolute top-0 left-0 p-5">
          <img :src="back_btn" @click="GoToHome">
        </div>
        <!-- Get Promoted 示意區 -->
        <div class="section bottom-1/2 px-5">
          <h2>Level up and get promoted!</h2>
          <!-- 半透明遮罩區 -->
          <div class="relative h-[224px] w-full py-[15px] bg-black/50 rounded-2xl overflow-hidden mt-3">
            <div class="flex px-10">
              <div>
                <div class="relative w-[80px] h-[80px] mx-auto mt-2 mb-2 border border-[#FFCE00] rounded-2xl shadow-[0px_0px_8px_0px_#FBC222] overflow-hidden">
                  <img :src="farmBackground" class="absolute" />
                  <!-- pic rotate anim -->
                  <img :src="player_pic" class="relative -ml-1 mt-3 w-full h-full object-contain pic-rotate"/>
                </div>
                <h4 class="lvl-name">Farmer</h4>
              </div>

              <!-- arrow anim -->
              <div class="relative w-[80px] h-[80px] mx-auto mt-2 mb-2 arrow-anim">
                <img :src="arrow_icon" class="w-full h-full object-contain"/>
              </div>
              <div>
                <div class="relative w-[80px] h-[80px] mx-auto mt-2 mb-2 border border-[#FFCE00] rounded-2xl shadow-[0px_0px_8px_0px_#FBC222] overflow-hidden">
                  <img :src="mcdonald" class="absolute" />
                  <!-- pic rotate anim -->
                  <img :src="upgrade_pic" class="relative -ml-1 mt-3 w-full h-full object-contain pic-rotate"/>
                </div>
                <h4 class="lvl-name">McDonald’s Intern</h4>
              </div>
            </div>
          </div>
          <!-- btn -->
          <div class="absolute bottom-[10px] w-full translate-btn">
            <button @click="GetPromoted" class="btn type1" :class="{ disabled: btnIsDisabled}" :disabled="btnIsDisabled" ref="GetPromotedBtn">Get Promoted</button>
          </div>
        </div>

        <!-- task 區 -->
        <div class="section top-1/2 px-5">
          <h4>Complete tasks to upgrade</h4>
          <div class="relative w-full z-0 mt-3">
            <!-- 1st -->
            <div class="task-item">
              <div class="h-[30%] flex justify-between px-3">
                <h4>Follow SIMemes on Twitter</h4>
                <h4>({{ task1_num }}/1)</h4>
              </div>
              <div class="h-[70%] flex justify-between items-center px-3">
                <img :src="x_icon" class="h-[80%] object-contain"/>
                <button v-if="!task1_checked" class="btn type2" @click="ClickTask1">Follow</button>
                <img v-if="task1_checked" :src="check_icon" class="h-[80%] object-contain"/>
              </div>
            </div>
            <!-- 2nd -->
            <div class="task-item">
              <div class="h-[30%] flex justify-between px-3">
                <h4>Follow SImemes announcements</h4>
                <h4>({{ task2_num }}/1)</h4>
              </div>
              <div class="h-[70%] flex justify-between items-center px-3">
                <img :src="tg_icon" class="h-[80%] object-contain"/>
                <button v-if="!task2_checked" class="btn type2" @click="ClickTask2">Follow</button>
                <img v-if="task2_checked" :src="check_icon" class="h-[80%] object-contain"/>
              </div>
            </div>
            <!-- 3th -->
            <div class="task-item">
              <div class="h-[30%] flex justify-between px-3">
                <h4>Invite 2 friends</h4>
                <h4>({{ task3_num }}/2)</h4>
              </div>
              <div class="h-[70%] flex justify-between items-center px-3">
                <img :src="invite_icon" class="h-[80%] object-contain"/>
                <button v-if="!task3_checked" class="btn type2" @click="ClickTask3">Invite</button>
                <img v-if="task3_checked" :src="check_icon" class="h-[80%] object-contain"/>
              </div>
            </div>
          </div>
        </div>
        
      </div>
  </main>
</template>

<script setup lang="ts">
// 導入 plugin
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router'
import { animate } from 'animejs';
// 導入素材
import farmBackground from '../assets/farmBackground.jpg';
import mcdonald from '../assets/mcdonald.jpg';
import goldBackground3 from '../assets/goldBackground3.jpg';
import player_pic from '../assets/1.png';
import upgrade_pic from '../assets/2.png';
import arrow_icon from '../assets/arrow_icon.png';
import x_icon from '../assets/x_icon.png';
import tg_icon from '../assets/tg_icon.png';
import invite_icon from '../assets/invite_icon.png';
import check_icon from '../assets/check_icon.png';
import back_btn from '../assets/back_btn.png';

const router = useRouter()

const btnIsDisabled = ref(true)

const task1_checked = ref(false)
const task2_checked = ref(false)
const task3_checked = ref(false)

const task1_num = ref(0)
const task2_num = ref(0)
const task3_num = ref(0)

watch(task1_checked && task2_checked && task3_checked, () => {
  btnIsDisabled.value = false
})

onMounted(() => {
  animate('.fadein', {
    opacity: [0, 1],
    duration: 500,
  })
  animate('.arrow-anim', {
    translateX: [ 5, 0 ],
    ease: 'inQuad',
    duration: 500,
    loop: true,
    alternate: true
  })
  animate('.pic-rotate', {
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
})

function GoToHome() {
  router.push('/')
}

function ClickTask1() {
  task1_checked.value = true
  task1_num.value = 1
}

function ClickTask2() {
  task2_checked.value = true
  task2_num.value = 1
}

function ClickTask3() {
  task3_checked.value = true
  task3_num.value = 2
}

function GetPromoted() {
  router.push('/')
}

</script>

<style scoped>
</style>