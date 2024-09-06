<template>
  <div class="pb-[20px]">
    <NavBar :leftArrow="false" title="星星"></NavBar>

    <div class="flex justify-end">
      <div class="record-box mr-[16px]" @click="handleTo('/star/record')">
        获奖记录
        <van-icon name="arrow" />
      </div>
    </div>

    <PrizePool></PrizePool>
    <div class="px-[16px]">
      <StarInfo></StarInfo>
      <StarRanking></StarRanking>
    </div>
    <router-view class="child-view"></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import NavBar from '@/components/NavBar/index.vue'
import PrizePool from './components/PrizePool.vue'
import StarInfo from './components/StarInfo.vue'
import StarRanking from './components/StarRanking.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleTo = (path) => {
  router.push(path)
}
</script>

<style scoped></style>
