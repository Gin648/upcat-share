<template>
  <div class="pb-[20px]">
    <NavBar :leftArrow="false" :title="t('xing-xing')"></NavBar>

    <div class="flex justify-end">
      <div class="record-box mr-[16px]" @click="handleTo('/star/record')">
        {{ t('huo-jiang-ji-lu') }}
        <van-icon name="arrow" />
      </div>
    </div>

    <PrizePool :info="allLottery"></PrizePool>
    <div class="px-[16px]">
      <StarInfo
        @init="init"
        @handleTo="handleTo"
        :info="lotteryInfo"
        :amount="carveAmount"
        :lotteryLoading="lotteryLoading"
      ></StarInfo>
      <StarRanking></StarRanking>
    </div>
    <router-view class="child-view"></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar/index.vue'
import PrizePool from './components/PrizePool.vue'
import StarInfo from './components/StarInfo.vue'
import StarRanking from './components/StarRanking.vue'
import { useRouter } from 'vue-router'
import {
  allLotteryAndMin,
  userLotteryInfo,
  getCarveAmount,
} from '@/services/bigStar'
import {useI18n} from "vue-i18n";
const {t} = useI18n();
const allLottery = ref({})
const _getAllLotteryAndMin = async (val?: any) => {
  const { success, data } = await allLotteryAndMin()
  if (success) {
    allLottery.value = data
  }
}

const lotteryLoading = ref(false)
const lotteryInfo = ref({})
const _getUserLotteryInfo = async (val?: any) => {
  lotteryLoading.value = true
  const { success, data } = await userLotteryInfo()
  lotteryLoading.value = false
  if (success) {
    lotteryInfo.value = data
  }
}

const carveAmount = ref(null)
const _getCarveAmount = async (val?: any) => {
  const { success, data } = await getCarveAmount()
  if (success) {
    carveAmount.value = data
  }
}

const router = useRouter()
const handleTo = (path) => {
  router.push(path)
}

const init = () => {
  _getAllLotteryAndMin()
  _getUserLotteryInfo()
  _getCarveAmount()
}

onMounted(() => {
  init()
})
</script>

<style scoped></style>
