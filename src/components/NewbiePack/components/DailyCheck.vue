<template>
  <div class="px-[16px]">
    <div class="common-linear py-[18px] px-[12px]">
      <div class="text-[16px]">
        已连续签到
        <span
          class="text-[#FFD702] text-[24px] font-semibold ml-[7px] mr-[17px]"
          >1</span
        >
        天
      </div>
      <div class="text-[12px] opacity-60 mt-[4px]">连续签到7天，获得奖励</div>

      <div class="flex items-center justify-between w-full mt-[16px] gap-[5px]">
        <div
          class="rounded-[20px] px-[10px] py-[12px] flex-1 bg-[#292D34] text-center"
          v-for="item in 7"
          :key="item"
        >
          <img src="@/assets/svg/checked-white.svg" class="w-full mb-[8px]" />
          <span class="text-[14px]">1天</span>
        </div>
      </div>

      <div class="flex justify-center mt-[24px]">
        <div class="pb-[3px] border-[1.5px] border-black min-w-[120px]">
          <AdButton class="shadow-btn-primary rounded-[4px]">
            <div class="text-[18px] flex items-center">
              <img
                src="@/assets/newbie/check-icon.png"
                class="w-[24px] mr-[4px]"
              />
              签到
            </div>
          </AdButton>
        </div>
      </div>
    </div>
    <div class="text-center pt-[30px]">
      <img
        src="@/assets/svg/close.svg"
        class="inline-block w-[28px]"
        @click="emit('close')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const emit = defineEmits(['close'])
</script>

<style scoped></style>
