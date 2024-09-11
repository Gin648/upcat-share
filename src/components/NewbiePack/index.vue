<template>
  <van-popup
    v-model:show="globalStore.dailyCheck"
    style="max-width: 100vw"
    class="van-popup--transparent max-w-[100vw] w-[100vw]"
    @close="onClose"
    :close-on-click-overlay="false"
  >
    <InitPage v-if="type === 1" @close="onNext(1)"></InitPage>
    <!-- <Awarded @close="onClose"></Awarded> -->
    <!-- <DailyCheck @close="onClose"></DailyCheck> -->
  </van-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import InitPage from './components/InitPage.vue'
import Awarded from './components/Awarded.vue'
import DailyCheck from './components/DailyCheck.vue'
import useStore from '@/store'

const { globalStore, accountStore } = useStore()

//  1: initPage
const type = ref(null)
watch(
  () => accountStore.userInfo,
  (userInfo) => {
    if (userInfo.id && accountStore.token) {
      if (!userInfo.pid1 && !accountStore.newcomer.includes(userInfo.id)) {
        type.value = 1
        globalStore.changeDailyCheck(true)
        // accountStore.changeNewcomer([...accountStore.newcomer, userInfo.id])
      }
    }
  },
  { deep: true, immediate: true }
)

const onNext = (val) => {
  console.log(val)

  if (val === 1) {
    onClose()
  }

  // else if (val === 2) {
  //   type.value = 3
  // }
}

const onClose = () => {
  globalStore.changeDailyCheck(false)
}
</script>

<style scoped></style>
