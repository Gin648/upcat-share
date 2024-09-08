<template>
  <van-popup
    v-model:show="globalStore.dailyCheck"
    class="van-popup--transparent max-w-[100vw] w-[100vw]"
    @close="onClose"
  >
    <!-- <InitPage></InitPage> -->
    <!-- <Awarded @close="onClose"></Awarded> -->
    <DailyCheck @close="onClose"></DailyCheck>
  </van-popup>
</template>

<script setup lang="ts">
import InitPage from './components/InitPage.vue'
import Awarded from './components/Awarded.vue'
import DailyCheck from './components/DailyCheck.vue'
import useStore from '@/store'
import { onMounted } from 'vue'

const { globalStore } = useStore()

const onClose = () => {
  globalStore.changeDailyCheck(false)
}
</script>

<style scoped></style>
