<template>
  <div
    class="absolute flex items-center bottom-[10px] right-[24px] rounded-[12px] bg-black/80 pr-[7px]"
  >
    <img src="@/assets/home/energy.png" class="w-[27px]" />
    <div class="mr-[7px]">
      <div class="text">
        {{ currentEnergy || 0
        }}<span class="opacity-40">/{{ basicEnergy || 0 }}</span>
      </div>
      <div class="w-[68px] h-[4px] rounded-[37px] bg-[#4A4848] mt-[2px]">
        <div
          :style="{ width: progress }"
          class="rounded-[37px] bg-white h-full"
        ></div>
      </div>
    </div>

    <img src="@/assets/svg/watch_ad_home.svg" class="w-[17px]" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const props = defineProps({
  currentEnergy: {
    type: Number,
    default: 0,
  },
  basicEnergy: {
    type: Number,
    default: 0,
  },
})

const progress = computed(() => {
  try {
    return (props.currentEnergy / props.basicEnergy) * 100 + '%'
  } catch (error) {
    return 0
  }
})
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
