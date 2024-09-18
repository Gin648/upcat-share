<template>
  <div class="pt-[20px] flex flex-col">
    <Info @handleTo="handleTo" :baseInfo="baseInfo" />
    <Gold
      @open="setCatCoinPopShow(true)"
      :ratVal="studyStore.learningCoinAmount"
      :catVal="baseInfo.ibo"
    ></Gold>
    <Cat
      @receiveClick="receiveClick"
      :clickNumber="baseInfo.clickNumber"
      @addCoin="addCoin"
      :iconUrl="baseInfo.iconUrl"
      :currentEnergy="currentEnergy"
    >
      <LeftColumn @init="_getStUserInfo()" :baseInfo="baseInfo"></LeftColumn>
      <RightColumn
        :dotInfo="homeInfo"
        :boxInfo="userBoxInfo"
        @handleTo="handleTo"
        @addCatCoin="addCatCoin"
      ></RightColumn>
      <Energy
        @init="_getStUserEnergyAmount"
        :currentEnergy="currentEnergy"
        :basicEnergy="baseInfo.basicEnergy"
      ></Energy>
    </Cat>
    <getAwardPop
      :val="waitAmount"
      :show="workingPopShow"
      @close="setWorkingPopShow(false)"
    ></getAwardPop>

    <CatCoinDetailPop
      @init="_getStUserInfo()"
      :show="catCoinPopShow"
      @close="setCatCoinPopShow(false)"
    ></CatCoinDetailPop>

    <router-view class="child-view"></router-view>
  </div>
</template>

<script setup lang="ts" name="Home">
import { ref, onMounted, onActivated } from 'vue'
import { useToggle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import Info from './components/Info.vue'
import Gold from './components/Gold.vue'
import Cat from './components/Cat.vue'
import LeftColumn from './components/LeftColumn.vue'
import RightColumn from './components/RightColumn.vue'
import Energy from './components/Energy.vue'
import getAwardPop from './components/getAwardPop.vue'
import CatCoinDetailPop from './components/CatCoinDetailPop.vue'
import useStore from '@/store'
import {
  getStUserInfo,
  getBoxInfo,
  queryWaitHourAmount,
  userClick,
  getStUserEnergyAmount,
  getHomeInfo,
} from '@/services/study'

const { studyStore } = useStore()
const [workingPopShow, setWorkingPopShow] = useToggle(false)
const [catCoinPopShow, setCatCoinPopShow] = useToggle(false)

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
      baseInfo.value.dropSecondAmount
    )
    initEnergyInterval()
  }
}

const currentEnergy = ref<number>(0)
const _getStUserEnergyAmount = async () => {
  const { success, data } = await getStUserEnergyAmount()
  if (success) {
    currentEnergy.value = +Number(data).toFixed(0)
  }
}

// 体力定时器
const energyInterval = ref(null)
const initEnergyInterval = () => {
  clearInterval(energyInterval.value)
  energyInterval.value = setInterval(() => {
    // 体力
    currentEnergy.value =
      currentEnergy.value + baseInfo.value.energySecondAmount >
      baseInfo.value.basicEnergy
        ? baseInfo.value.basicEnergy
        : currentEnergy.value + baseInfo.value.energySecondAmount
  }, 1000)
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

// 每次点击的处理事件
const addCoin = async () => {
  currentEnergy.value -= baseInfo.value.clickAmount
  baseInfo.value.learningCoinAmount =
    studyStore.learningCoinAmount + baseInfo.value.clickNumber
  studyStore.changeCoin(baseInfo.value.learningCoinAmount)
  userBoxInfo.value.amount += 1
  if (getEnergyTimer.value) {
    clearTimeout(getEnergyTimer.value)
    getEnergyTimer.value = null
  }
}

const getEnergyTimer = ref(null)
// 防抖掉用接口
const receiveClick = async (number) => {
  const { success } = await userClick({
    clickNumber: number,
  })
  if (getEnergyTimer.value) {
    clearTimeout(getEnergyTimer.value)
    getEnergyTimer.value = null
  }
  getEnergyTimer.value = setTimeout(() => {
    _getStUserEnergyAmount()
    getEnergyTimer.value = null
  }, 1000)

  if (!success) {
    _getStUserInfo()
  }
}

// 获取盲盒参数
const userBoxInfo: any = ref({})
const _getBoxInfo = async () => {
  const { success, data } = await getBoxInfo()
  if (success) {
    userBoxInfo.value = data
  }
}

// 看盲盒领取猫币
const addCatCoin = (val) => {
  _getBoxInfo()
}
onActivated(async () => {
  if (baseInfo.value) {
    const { success, data }: any = await getStUserInfo()
    if (success) {
      baseInfo.value.nickname = data.nickname
      baseInfo.value.ibo = data.ibo
    }
  }
  _getBoxInfo()
  _getHomeInfo()
})

const homeInfo = ref<any>({})
const _getHomeInfo = async () => {
  const { success, data } = await getHomeInfo()
  if (success) {
    homeInfo.value = +data
  }
}

onMounted(async () => {
  await _queryWaitHourAmount()
  _getStUserInfo()
})

router.beforeEach(async (to, from) => {
  // 动态删除keep-alive缓存
  if (from.path === '/level' && to.path === '/home') {
    if (from.params.refresh) {
      await _queryWaitHourAmount()
      _getStUserInfo()
    }
  }
})
</script>

<style lang="less" scoped>
//
</style>
