<template>
  <van-popup
    v-model:show="globalStore.dailyCheck"
    style="max-width: 100vw; width: 100vw"
    class="van-popup--transparent max-w-[100vw] w-[100vw]"
    @close="onClose"
    :close-on-click-overlay="false"
  >
    <InitPage v-if="type === 1" @close="onNext(1)"></InitPage>
    <BindCode
      v-if="type === 2"
      @close="onClose"
      @success="onNext(2)"
    ></BindCode>
    <DailyCheck
      @success="(val) => onNext(3, val)"
      @close="onClose"
      v-if="type === 3"
    ></DailyCheck>
    <Awarded
      :val="awardAmount"
      iconType="Cat_Coin.svg"
      @click="onClose"
      @close="onClose"
      v-if="type === 4"
    ></Awarded>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import InitPage from './components/InitPage.vue'
import Awarded from './components/Awarded.vue'
import DailyCheck from './components/DailyCheck.vue'
import BindCode from './components/BindCode.vue'
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
        accountStore.changeNewcomer([...accountStore.newcomer, userInfo.id])
      } else if (!userInfo.pid1) {
        type.value = 2
        globalStore.changeDailyCheck(true)
      } else if (userInfo.pid1) {
        type.value = 3
      }
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => globalStore.dailyCheck,
  () => {
    if (type.value === 4 && globalStore.dailyCheck) {
      console.log(111)
      type.value = 3
    }
  },
  { deep: true, immediate: true }
)

const awardAmount = ref(0)
const onNext = (pageType, value?: any) => {
  if (pageType === 1) {
    type.value = 2
  } else if (pageType === 2) {
    type.value = 3
  } else if (pageType === 3) {
    type.value = 4
    awardAmount.value = value
  }
}

const onClose = () => {
  globalStore.changeDailyCheck(false)
}
</script>

<style scoped></style>
