<template>
  <div class="flex justify-center">
    <div class="relative -mt-[10px]">
      <van-circle
        v-model:current-rate="currentRate"
        :rate="100"
        size="232px"
        stroke-width="20"
      />

      <div
        class="absolute top-0 flex flex-col items-center justify-center"
        style="width: 232px; height: 232px"
      >
        <img src="@/assets/png/Cat_Coin.png" class="w-[50px]" />
        <div class="big">{{ info.minAmount || 0 }}</div>
        <div class="text-[14px]">
          {{ t('xing-xing-zong-shu') }}：{{ info.lotteryNum || 0 }}
        </div>
        <div class="text-[12px] opacity-60 mt-[16px]">
          {{ `${countDown.hours}:${countDown.minutes}:${countDown.seconds}` }}
          {{ t('hou-ke-gua-fen') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  info: {
    type: Object,
    default: () => {},
  },
  countDown: {
    type: Object,
    default: () => {},
  },
})

const totalTime = ref(24 * 60 * 60)
const currentRate = computed(() => {
  if (props.countDown.total === 0) {
    return 100
  } else if (props.countDown.total) {
    return (
      ((totalTime.value - props.countDown.total / 1000) / totalTime.value) * 100
    )
  }
  return 0
})
</script>

<style scoped lang="less">
.big {
  color: #f0c786;
  text-align: center;
  font-family: 'Alibaba PuHuiTi';
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
