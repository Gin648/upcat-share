<template>
  <div class="flex justify-center mt-[16px]">
    <div class="px-[5px] py-[4px] flex items-center bg-black/80 rounded-[8px]">
      <img src="@/assets/png/Rat_Coin.png" class="w-[24px] mr-[2px]" />
      <span class="text">
        <count-up
          :startVal="oldRatVal"
          :endVal="ratVal"
          duration="0.3"
          :decimalPlaces="0"
          :options="{ useGrouping: false }"
        ></count-up>
      </span>
    </div>
    <div class="w-[6px]"></div>
    <div
      @click="emit('open')"
      class="px-[5px] py-[4px] flex items-center bg-black/80 rounded-[8px]"
    >
      <img src="@/assets/png/Cat_Coin.png" class="w-[24px] mr-[2px]" />
      <span class="text">
        <count-up
          :startVal="oldCatVal"
          :endVal="catVal"
          duration="0.3"
          :decimalPlaces="0"
          :options="{ useGrouping: false }"
        ></count-up>
      </span>
      <van-icon name="arrow" size="14px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CountUp from 'vue-countup-v3'
const props = defineProps({
  ratVal: {
    type: Number,
    default: 0,
  },
  catVal: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['open'])

const oldRatVal = ref(0)
watch(
  () => props.ratVal,
  (newValue, oldvalue) => {
    oldRatVal.value = oldvalue || 0
  },
  { deep: true }
)

const oldCatVal = ref(0)
watch(
  () => props.catVal,
  (newValue, oldvalue) => {
    oldCatVal.value = oldvalue || 0
  },
  { deep: true }
)
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
