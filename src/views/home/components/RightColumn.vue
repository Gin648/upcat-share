<template>
  <div
    class="absolute rounded-tl-[12px] rounded-bl-[12px] bg-black/80 p-[13px] right-0 -translate-y-1/2 top-1/2"
  >
    <div @click="boxNumber > 0 ? setBlindBoxShow(true) : ''">
      <van-badge :content="boxNumber" :show-zero="false">
        <img src="../../../assets/png/blind_Box.png" class="w-[36px]" />
      </van-badge>
      <div class="w-full h-[4px] rounded-[37px] bg-[#4A4848] mt-[8px]">
        <div
          :style="{ width: boxProgress }"
          class="rounded-[37px] bg-white h-full"
        ></div>
      </div>
    </div>

    <div class="mt-[27px]" @click="showDailyCheck">
      <van-badge :show-zero="false" :dot="dotInfo.signStatus ? true : false">
        <img src="@/assets/png/gift.png" class="w-[36px]" />
      </van-badge>
    </div>
    <div class="mt-[30px]" @click="emit('handleTo', '/task')">
      <van-badge :content="dotInfo?.taskNum" :show-zero="false">
        <img src="@/assets/png/list_home.png" class="w-[35px]" />
      </van-badge>
    </div>
    <div class="mt-[30px]">
      <van-badge :content="dotInfo?.articleNum" :show-zero="false">
        <img src="@/assets/png/ToDo.png" class="w-[36px]" />
      </van-badge>
    </div>
    <GetBlindBox
      @addCatCoin="(val) => emit('addCatCoin', val)"
      :boxInfo="boxInfo"
      @close="setBlindBoxShow(false)"
      :show="blindBoxShow"
    ></GetBlindBox>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToggle } from '@vueuse/core'
import GetBlindBox from './GetBlindBox.vue'
import useStore from '@/store'
const { globalStore } = useStore()

const [blindBoxShow, setBlindBoxShow] = useToggle(false)

const props = withDefaults(
  defineProps<{
    boxInfo?: any
    dotInfo?: any
  }>(),
  {
    boxInfo: () => ({}),
    dotInfo: () => ({}),
  }
)

const emit = defineEmits(['handleTo', 'addCatCoin'])

const showDailyCheck = () => {
  globalStore.changeDailyCheck(true)
}

// 盲盒进度
const boxProgress = computed(() => {
  if (!props.boxInfo.amount) return 0
  if (
    props.boxInfo.amount / props.boxInfo.boxAmount >
    props.boxInfo.totalNumber
  ) {
    return '100%'
  }
  return (
    ((props.boxInfo.amount % props.boxInfo.boxAmount) /
      props.boxInfo.boxAmount) *
      100 +
    '%'
  )
})

// 已激活盲盒数量 ,需要减去已经开启的
const boxNumber = computed(() => {
  if (!props.boxInfo.amount) return 0
  const number = parseInt(props.boxInfo.amount / props.boxInfo.boxAmount + '')
  const remainNumber = (number > 6 ? 6 : number) - props.boxInfo.openNumber

  return remainNumber
})
</script>

<style scoped></style>
