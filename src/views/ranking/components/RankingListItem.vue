<template>
  <div class="flex items-center w-full gap-3 mb-[10px] px-[16px] py-[12px] rounded-[16px] bg-[#191A1C]"
       @click="emits('click')">
    <div class="min-w-[20px] h-[27px] flex justify-center items-center text-sm break-all ">
      <span class="font-bold text-[24px]">{{ index + 1 }}</span>
    </div>
    <img
        :src="data.avatar || getImage('study/icon_moren_touxiang.png')"
        class="w-[37px] h-[37px] rounded-full"
    />
    <div class="flex justify-between flex-1">
      <div class="text-[16px] ">{{ data.name || '无名氏' }}</div>
      <div class="flex items-center w-1/2">
        <img src="@/assets/rank/coinImage.svg" alt="" class="w-[20px] h-[20px] mr-[6px]">
        <span class="text-[#E0B374] font-bold text-[14px]">{{
            formatNumberUnit(formatBalance(data.amount)) || 0
          }}</span>
      </div>
    </div>
    <van-icon v-if="studyType === 2" name="arrow" size="16px" color="#939497"/>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import {getImage} from '@/utils/utils'
import {computed} from 'vue'
import {formatNumberUnit, formatBalance} from '@/utils/utils'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  studyType: {
    type: Number,
    default: 1, // 1个人   2 团队
  },
  index: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['click'])

const rankinglabel = computed(() => {
  let url = ''
  switch (props.index) {
    case 0:
      url = 'icon_jinpai'
      break
    case 1:
      url = 'icon_yinpai'
      break
    case 2:
      url = 'icon_tongpai'
      break
    default:
      break
  }
  return url
})
</script>

<style scoped></style>
