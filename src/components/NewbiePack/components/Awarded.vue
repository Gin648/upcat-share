<template>
  <div class="w-full" @click="emit('click')">
    <div
      class="text-[24px] z-10 relative leading-[24px] text-[#FDF7E6] font-semibold text-center"
    >
      恭喜获得
    </div>
    <div class="-mt-[110px] relative">
      <img src="@/assets/newbie/bg.png" class="w-full" />
      <div
        class="absolute bottom-[20px] left-0 flex flex-col items-center w-full"
      >
        <img src="@/assets/newbie/gift-open.png" class="w-[38px]" />
        <div class="flex items-center mt-[10px]">
          <img :src="getPng(iconType)" class="w-[50px] mr-[10px]" />
          <span
            class="text-[#EDC88C] text-[48px] font-bold"
            style="font-family: Alibaba PuHuiTi"
            >+{{ val }}</span
          >
        </div>
      </div>
    </div>

    <div class="flex justify-center pt-[36px]" @click="emit('close')">
      点击屏幕关闭
    </div>
  </div>
</template>

<script setup lang="ts">
import {getPng, getSvg} from '@/utils/utils'

defineProps({
  val: {
    default: 0,
  },
  iconType: {
    type: String,
    default: 'Rat_Coin.png',
  },
})
const emit = defineEmits(['close', 'click'])
</script>

<style scoped></style>
