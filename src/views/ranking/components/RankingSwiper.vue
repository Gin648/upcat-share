<template>
  <div class="w-full">
    <div class="flex w-full justify-evenly">
      <div
          class="relative"
          :style="{
          width: pageWidth * 0.21 + 'px',
          height: pageWidth * 0.49 + 'px',
        }"
      >

        <van-icon
            class="absolute font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-[100%]"
            name="arrow-left"
            size="16px"
            @click="handlePrev"
        />
      </div>
      <div
          :style="{
          width: pageWidth * 0.4 + 'px',
          height: pageWidth * 0.4 + 'px',
        }"
      >
        <van-swipe
            ref="studySwipe"
            class="w-full h-full"
            :show-indicators="false"
            :loop="false"
            :initial-swipe="
            (studyType === 1
              ? userStInfo.userLvId - 1
              : userStInfo.teamLvId - 1) < 0
              ? 0
              : studyType === 1
              ? userStInfo.userLvId - 1
              : userStInfo.teamLvId - 1
          "
            @change="changeIndex"
        >
          <van-swipe-item v-for="item in list" :key="item.id">
            <div class="relative">
              <img
                  class="w-[111px] h-[111px] rounded-full absolute  top-1/2 left-1/2 -translate-x-1/2  -translate-y-[-20%]"
                  :src="item.iconUrl"
              />
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div
          class="relative"
          :style="{
          width: pageWidth * 0.21 + 'px',
          height: pageWidth * 0.49 + 'px',
        }"
      >
        <van-icon
            @click="handleNext"
            class="absolute font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-[0]"
            name="arrow"
            size="16px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, computed} from 'vue'
import {formatNumberUnit} from '@/utils/utils'
import useLocale from '@/hooks/useLocale'

const {currentLocale} = useLocale()

const props = defineProps({
  studyType: {
    type: Number,
    default: 1, // 1个人   2 团队
  },
  list: {
    default: () => [],
  },
  userStInfo: {
    type: Object,
    default: () => {
    },
  },
  currentIndex: {
    type: Number,
    default: 0,
  },
  pageWidth: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['changeIndex'])

const classNameShow = computed(() => {
  if (currentLocale.value === 'zh') {
    return 'nameZh'
  } else {
    return 'nameEn'
  }
})

const changeIndex = (index) => {
  emits('changeIndex', +index)
  // props.currentIndex = +index
}

const currentLevelData: any = computed(() => {
  return props.list[props.currentIndex] || {}
})

const amoutShowLable = computed(() =>
    +props.studyType === 1 ? 'amountHour' : 'teamAmountHour'
)

const studySwipe = ref(null)
const handlePrev = () => {
  if (studySwipe.value) {
    studySwipe.value.prev()
  }
}

const handleNext = () => {
  if (studySwipe.value) {
    studySwipe.value.next()
  }
}

const onSwipeTo = () => {
  studySwipe.value?.swipeTo(props.currentIndex)
}

defineExpose({
  onSwipeTo,
})
</script>

<style scoped></style>
