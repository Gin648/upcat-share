<template>
  <div class="w-full">
    <div
      class="text-[36px] z-10 relative leading-[36px] font-semibold text-center"
    >
      新人大礼包 <br />
      已到账
    </div>
    <div class="-mt-[60px] relative">
      <img src="@/assets/newbie/bg.png" class="w-full" />
      <div
        class="absolute -bottom-[50px] left-0 flex flex-col items-center w-full"
      >
        <div class="flex items-center -mb-[20px]">
          <img src="@/assets/svg/Rat_Coin.svg" class="w-[50px] mr-[10px]" />
          <span
            class="text-[#EDC88C] text-[48px] font-bold"
            style="font-family: Alibaba PuHuiTi"
            >+100</span
          >
        </div>

        <img src="@/assets/newbie/gift.png" class="w-[150px]" />
      </div>
    </div>

    <div class="flex justify-center mt-[50px]">
      <div class="pb-[3px] border-[1.5px] border-black max-w-[176px]">
        <AdButton class="shadow-btn-primary]">
          <div class="text-[18px] flex items-center px-[16px]">
            <img src="@/assets/newbie/finger.png" class="w-[24px] mr-[4px]" />
            领取
          </div>
        </AdButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdButton from '@/components/AdButton/index.vue'
</script>

<style scoped></style>
