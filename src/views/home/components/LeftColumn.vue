<template>
  <div class="absolute bottom-[50px] left-[8px]">
    <div
      class="px-[11px] py-[6px] rounded-[12px] bg-black/80 flex flex-col items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center">
        <van-icon name="arrow-up" size="12px" class="-mt-[3px]" />
        <img src="@/assets/svg/Cat_Coin.svg" class="w-[25px] h-auto" />
        <van-icon name="arrow-down" size="12px" class="mb-[14px]" />
      </div>
      <div class="flex flex-col items-center justify-center">
        <img src="@/assets/svg/star.svg" class="w-[30px]" />
        <div class="text-[10px] leading-[18px]">100k</div>
      </div>

      <div
        class="flex flex-col items-center justify-center pt-[5px] mt-[5px] border-t border-[#5F5F5F]"
      >
        <img src="@/assets/svg/up_buy.svg" class="w-[24px]" />
        <div class="text-[10px] leading-[18px]">100k</div>
      </div>
    </div>

    <div
      class="px-[11px] py-[6px] rounded-[12px] bg-black/80 flex flex-col items-center justify-center mt-[4px]"
    >
      <div class="flex flex-col items-center justify-center">
        <van-icon name="arrow-up" size="12px" class="-mt-[3px]" />
        <img src="@/assets/svg/Rat_Coin.svg" class="w-[25px] h-auto" />
        <van-icon name="arrow-down" size="12px" class="mb-[14px]" />
      </div>
      <div class="flex flex-col items-center justify-center">
        <img src="@/assets/svg/purple_medal.svg" class="w-[30px]" />
        <div class="text-[10px] leading-[18px]">100k</div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <img src="@/assets/svg/pink_medal.svg" class="w-[30px]" />
        <div class="text-[10px] leading-[18px]">100k</div>
      </div>

      <div
        class="flex flex-col items-center justify-center pt-[5px] mt-[5px] border-t border-[#5F5F5F]"
      >
        <img src="@/assets/svg/yellow_medal.svg" class="w-[24px]" />
        <div class="text-[10px] leading-[18px]">100k</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped></style>
