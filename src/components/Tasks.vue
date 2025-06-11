<template>
  <main class="w-full overflow-hidden">
    <img :src="goldBackground3" class="absolute top-0 left-0 w-full h-full object-cover -z-10"/>
    <!-- fadein anim -->
      <div class="flex flex-col justify-start items-center min-h-screen pt-[60px] pb-5 mx-auto relative box-border fadein">
        <div class="absolute top-0 left-0 p-5">
          <img :src="back_btn" @click="GoToHome" class="back-btn btn-click">
        </div>
        <!-- Get Promoted 示意區 -->
        <div class="section bottom-1/2 px-5">
          <h2>{{ $store.tasks_context.getPromote.title }}</h2>
          <!-- 半透明遮罩區 -->
          <div class="relative h-[224px] w-full py-[15px] bg-black/50 rounded-2xl overflow-hidden mt-3">
            <div class="flex px-10">
              <div>
                <div class="relative w-[80px] h-[80px] mx-auto mt-2 mb-2 border border-[#FFCE00] rounded-2xl shadow-[0px_0px_8px_0px_#FBC222] overflow-hidden" :class="`border-shadow-lvl${$store.userLvl}`">
                  <img :src="userBG" class="absolute" />
                  <!-- pic rotate anim -->
                  <img :src="userPic" class="relative -ml-1 mt-3 w-full h-full object-contain pic-rotate"/>
                </div>
                <h4 class="lvl-name">{{ $store.tasks_context.lvlist[$store.userLvl] }}</h4>
              </div>

              <!-- arrow anim -->
              <div class="relative w-[80px] h-[80px] mx-auto mt-2 mb-2 arrow-anim">
                <img :src="arrow_icon" class="w-full h-full object-contain"/>
              </div>
              <div>
                <div class="relative w-[80px] h-[80px] mx-auto mt-2 mb-2 border border-[#FFCE00] rounded-2xl shadow-[0px_0px_8px_0px_#FBC222] overflow-hidden" :class="`border-shadow-lvl${$store.userLvl + 1}`">
                  <img :src="userNextBG" class="absolute" />
                  <!-- pic rotate anim -->
                  <img :src="userNextPic" class="relative -ml-1 mt-3 w-full h-full object-contain pic-rotate"/>
                </div>
                <h4 class="lvl-name">{{ $store.tasks_context.lvlist[$store.userLvl + 1] }}</h4>
              </div>
            </div>
          </div>
          <!-- btn -->
          <div class="absolute bottom-[10px] w-full translate-btn">
            <button @click="GetPromoted" class="btn type1" :class="{ disabled: btnIsDisabled, 'btn-click': !btnIsDisabled}" :disabled="btnIsDisabled" ref="GetPromotedBtn">{{ $store.tasks_context.getPromote.btn }}</button>
          </div>
        </div>

        <!-- task 區 -->
        <div class="section top-1/2 px-5">
          <h4>{{ $store.tasks_context.tasks.title }}</h4>
          <div v-if="$store.tasks_context.tasks.lvl[$store.userLvl]" class="relative w-full z-0 mt-3">
            <!-- 1st -->
            <div class="task-item">
              <div class="h-[30%] flex justify-between px-3">
                <h4>{{ $store.tasks_context.tasks.lvl[$store.userLvl].task1 }}</h4>
                <h4>({{ $store.task1_num }}/1)</h4>
              </div>
              <div class="h-[70%] flex justify-between items-center px-3">
                <img :src="x_icon" class="h-[80%] object-contain"/>
                <button v-if="!task1_checked && !task1_loading" class="btn btn-click type2" @click="ClickTask1">{{ $store.tasks_context.tasks.followBtn }}</button>
                <LoadingIcon v-if="task1_loading" class="animate-spin mx-8" />
                <img v-if="task1_checked" :src="check_icon" class="h-[80%] object-contain"/>
              </div>
            </div>
            <!-- 2nd -->
            <div class="task-item">
              <div class="h-[30%] flex justify-between px-3">
                <h4>{{ $store.tasks_context.tasks.lvl[$store.userLvl].task2 }}</h4>
                <h4>({{ $store.task2_num }}/1)</h4>
              </div>
              <div class="h-[70%] flex justify-between items-center px-3">
                <img :src="tg_icon" class="h-[80%] object-contain"/>
                <button v-if="!task2_checked && !task2_loading" class="btn btn-click type2" @click="ClickTask2">{{ $store.tasks_context.tasks.followBtn }}</button>
                <LoadingIcon v-if="task2_loading" class="animate-spin mx-8" />
                <img v-if="task2_checked" :src="check_icon" class="h-[80%] object-contain"/>
              </div>
            </div>
            <!-- 3th -->
            <div class="task-item">
              <div class="h-[30%] flex justify-between px-3">
                <h4>{{ $store.tasks_context.tasks.lvl[$store.userLvl].task3 }}</h4>
                <h4>({{ $store.task3_num }}/{{ $store.tasks_context.tasks.inviteAmount[$store.userLvl] }})</h4>
              </div>
              <div class="h-[70%] flex justify-between items-center px-3">
                <img :src="invite_icon" class="h-[80%] object-contain"/>
                <button v-if="!task3_checked && !task3_loading" class="btn btn-click type2" @click="ClickTask3">{{ $store.tasks_context.tasks.inviteBtn }}</button>
                <LoadingIcon v-if="task3_loading" class="animate-spin mx-8" />
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
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router'
import { animate } from 'animejs';
import { useStore } from '../stores/store'
import LoadingIcon from 'vue-material-design-icons/Loading.vue';
// 導入素材
import goldBackground3 from '../assets/goldBackground3.jpg';
import arrow_icon from '../assets/arrow_icon.png';
import x_icon from '../assets/x_icon.png';
import tg_icon from '../assets/tg_icon.png';
import invite_icon from '../assets/invite_icon.png';
import check_icon from '../assets/check_icon.png';
import back_btn from '../assets/back_btn.png';

const $store = useStore()
const router = useRouter()

const btnIsDisabled = ref(true)

const task1_checked = ref(false)
const task2_checked = ref(false)
const task3_checked = ref(false)

const task1_loading = ref(false)
const task2_loading = ref(false)
const task3_loading = ref(false)

// 動畫 ref
const GetPromotedBtn = ref(null)
const loadingIcon = ref(null)

// ============================ computed ============================
// 升等圖
const userPic = computed(() => {
  return '/src/assets/' + $store.tasks_context.lvlist[$store.userLvl] + 'Pic.png'
})
const userBG = computed(() => {
  return '/src/assets/' + $store.tasks_context.lvlist[$store.userLvl] + 'BG.jpg'
})
const userNextPic = computed(() => {
  return '/src/assets/' + $store.tasks_context.lvlist[$store.userLvl +1] + 'Pic.png'
})
const userNextBG = computed(() => {
  return '/src/assets/' + $store.tasks_context.lvlist[$store.userLvl +1] + 'BG.jpg'
})

// ============================ watch ============================

watch([task1_checked, task2_checked, task3_checked], ([t1, t2, t3]) => {
  if(t1 && t2 && t3) btnIsDisabled.value = false
})
// btn 脈動 anim
watch(btnIsDisabled, () => {
  // 解開按鈕失效時啟動
  if (!btnIsDisabled.value && GetPromotedBtn.value) animatePulse(GetPromotedBtn.value)
})

// ============================ onMounted ============================

onMounted(() => {
  // 抓 user 等級、任務完成度
  // $store.userLvl = 0
  // $store.task1_num = 0
  // $store.task2_num = 0
  // $store.task3_num = 0

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

// ============================ function ============================

function GoToHome() {
  router.push('/')
}

function ClickTask1() {
  task1_loading.value = true
  setTimeout(() => {
    task1_loading.value = false
    task1_checked.value = true
    $store.task1_num = 1
  }, 2000)
}

function ClickTask2() {
  task2_loading.value = true
  setTimeout(() => {
    task2_loading.value = false
    task2_checked.value = true
    $store.task2_num = 1
  }, 2000)
}

function ClickTask3() {
  task3_loading.value = true
  setTimeout(() => {
    task3_loading.value = false
    // 這邊先設一按就 true，其實是要等 invite 成功
    task3_checked.value = true
    $store.task3_num = $store.tasks_context.tasks.inviteAmount[$store.userLvl]
  }, 2000)
}

function GetPromoted() {
  $store.userLvl ++
  $store.task1_num = 0
  $store.task2_num = 0
  $store.task3_num = 0
  router.push('/')
}

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

</script>

<style scoped>
</style>