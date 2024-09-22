<template>
  <div class="relative linear-box mt-[12px] p-[8px]">
    <div class="px-[12px] border-[#2C84FF] border-solid border rounded-[10px]">
      <div class="py-[16px] flex items-center gap-[10px]">
        <div
          class="px-[21px] rounded-[30px] py-[4px] bg-[#2C84FF] text-[14px] leading-[18px]"
        >
          所有
        </div>
        <div
          class="px-[21px] rounded-[30px] py-[4px] bg-[#191A1C] text-white/60 text-[14px] leading-[18px]"
        >
          今日
        </div>
        <div
          class="px-[21px] rounded-[30px] py-[4px] bg-[#191A1C] text-[14px] text-white/60 leading-[18px]"
        >
          昨日
        </div>
      </div>

      <div
        v-for="item in 10"
        :key="item"
        class="py-[16px] flex items-center bg-[#191A1C] px-[10px] rounded-[12px] mb-[10px]"
      >
        <span class="text-[15px]">直接邀请</span>
        <span class="text-[16px] text-white/60 ml-[6px]">1200</span>
        <span class="ml-auto text-[17px] font-semibold">+1684</span>
        <img src="@/assets/png/masonry.png" class="w-[20px] ml-[4px]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped></style>
