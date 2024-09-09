<template>
  <div class="pt-[20px] flex flex-col">
    <Info @handleTo="handleTo" />
    <Gold></Gold>
    <Cat>
      <LeftColumn></LeftColumn>
      <RightColumn @handleTo="handleTo"></RightColumn>
      <Energy></Energy>
    </Cat>
    <getAwardPop
      :val="waitAmount"
      :show="workingPopShow"
      @close="setWorkingPopShow(false)"
    ></getAwardPop>

    <router-view class="child-view"></router-view>
  </div>
</template>

<script setup lang="ts" name="Home">
import { ref, watch, onMounted } from 'vue'
import { useToggle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import Info from './components/Info.vue'
import Gold from './components/Gold.vue'
import Cat from './components/Cat.vue'
import LeftColumn from './components/LeftColumn.vue'
import RightColumn from './components/RightColumn.vue'
import Energy from './components/Energy.vue'
import getAwardPop from './components/getAwardPop.vue'
import useStore from '@/store'
import {
  getStUserInfo,
  addTaskSon,
  queryWaitHourAmount,
  userClick,
  getStUserEnergyAmount,
} from '@/services/study'

const { studyStore } = useStore()

const [workingPopShow, setWorkingPopShow] = useToggle(false)

const router = useRouter()
const handleTo = (path) => {
  router.push(path)
}

const baseInfo = ref<any>({})
const _getStUserInfo = async () => {
  const { success, data } = await getStUserInfo()
  if (success) {
    baseInfo.value = data
    studyStore.changeCoin(
      baseInfo.value.learningCoinAmount,
      baseInfo.value.learningCoinAmountHour
    )
    initEnergyInterval()
  }
}

const currentEnergy = ref<number>(0)
const _getStUserEnergyAmount = async () => {
  const { success, data } = await getStUserEnergyAmount()
  if (success) {
    currentEnergy.value = +data
  }
}

// 体力定时器
const energyInterval = ref(null)
const initEnergyInterval = () => {
  // clearInterval(energyInterval.value)
  // energyInterval.value = setInterval(() => {
  //   // 体力
  //   currentEnergy.value =
  //     currentEnergy.value + baseInfo.value.clickNumber > baseInfo.value.basicEnergy
  //       ? baseInfo.value.basicEnergy
  //       : currentEnergy.value + baseInfo.value.clickNumber
  // }, 1000)
}

// 获取待领取奖励
const waitAmount = ref(0)
const _queryWaitHourAmount = async (val?: any) => {
  const { success, data } = await queryWaitHourAmount()
  if (success) {
    waitAmount.value = +data
    if (+data >= 1 && !val) {
      setWorkingPopShow(true)
    }
  }
  _getStUserEnergyAmount()
}

onMounted(async () => {
  _queryWaitHourAmount()
  _getStUserInfo()
})
</script>

<style lang="less" scoped>
//
</style>
