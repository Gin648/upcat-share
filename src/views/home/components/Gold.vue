<template>
  <div class="flex justify-center mt-[16px]">
    <div class="px-[5px] py-[4px] flex items-center bg-black/80 rounded-[8px]">
      <img src="@/assets/svg/Rat_Coin.svg" class="w-[24px]" />
      <span class="text">100.23 K</span>
    </div>
    <div class="w-[6px]"></div>
    <div class="px-[5px] py-[4px] flex items-center bg-black/80 rounded-[8px]">
      <img src="@/assets/svg/Cat_Coin.svg" class="w-[24px]" />
      <span class="text">100.23 K</span>
      <van-icon name="arrow" size="14px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped lang="less">
.text {
  margin-left: 3px;
  color: #fff;
  text-align: center;
  font-family: 'Alibaba PuHuiTi';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 128.571% */
  letter-spacing: -0.165px;
}
</style>
