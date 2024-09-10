<template>
  <div class="flex justify-center">
    <div class="relative -mt-[10px]">
      <van-circle
        v-model:current-rate="currentRate"
        :rate="100"
        size="232px"
        stroke-width="20"
      />

      <div
        class="absolute top-0 flex flex-col items-center justify-center"
        style="width: 232px; height: 232px"
      >
        <img src="@/assets/svg/Cat_Coin.svg" class="w-[50px]" />
        <div class="big">{{ info.minAmount || 0 }}</div>
        <div class="text-[14px]">星星总数：{{ info.lotteryNum || 0 }}</div>
        <div class="text-[12px] opacity-60 mt-[16px]">UTC0:00⽠分</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const currentRate = ref(25)

const props = defineProps({
  info: {
    type: Object,
    default: () => {},
  },
})
</script>

<style scoped lang="less">
.big {
  color: #f0c786;
  text-align: center;
  font-family: 'Alibaba PuHuiTi';
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
