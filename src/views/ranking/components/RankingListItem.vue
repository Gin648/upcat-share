<template>
  <div class="flex items-center w-full gap-3 mt-5" @click="emits('click')">
    <div
      class="min-w-[20px] h-[27px] flex justify-center items-center text-sm break-all"
    >
      <img
        v-if="rankinglabel"
        :src="getImage(`study/${rankinglabel}.png`)"
        class="w-[20px] h-full"
      />
      <span v-else>{{ index + 1 }}</span>
    </div>
    <img
      :src="data.avatar || getImage('study/icon_moren_touxiang.png')"
      class="w-[37px] h-[37px] rounded-full"
    />
    <div class="flex-1">
      <div class="text-sm line-clamp-1">{{ data.name }}</div>
      <div class="flex items-center text-xs text-[#F4D316] mt-1">
        <img
          class="w-[13px] h-[13px] mr-1.5"
          src="@/assets/study/icon_xuexi_bi.png"
        />
        {{ formatNumberUnit(formatBalance(data.amount)) || 0 }}
      </div>
    </div>
    <van-icon v-if="studyType === 2" name="arrow" size="16px" color="#939497" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { getImage } from '@/utils/utils'
import { computed } from 'vue'
import { formatNumberUnit, formatBalance } from '@/utils/utils'

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
