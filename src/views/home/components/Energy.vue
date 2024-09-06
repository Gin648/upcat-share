<template>
  <div
    class="absolute flex items-center bottom-[10px] right-[24px] rounded-[12px] bg-black/80 pr-[7px]"
  >
    <img src="@/assets/home/energy.png" class="w-[27px]" />
    <div class="mr-[7px]">
      <div class="text">3210<span class="opacity-40">/5000</span></div>
      <div class="w-[68px] h-[4px] rounded-[37px] bg-[#4A4848] mt-[2px]">
        <div class="w-1/2 rounded-[37px] bg-white h-full"></div>
      </div>
    </div>

    <img src="@/assets/svg/watch_ad_home.svg" class="w-[17px]" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped lang="less">
.text {
  color: #fff;
  font-family: 'Alibaba PuHuiTi';
  font-size: 10.86px;
  font-style: normal;
  font-weight: 900;
  line-height: 13.963px; /* 128.571% */
  letter-spacing: -0.128px;
}
</style>
