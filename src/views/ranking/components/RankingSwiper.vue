<template>
  <div class="w-full">
    <div class="flex items-center w-full justify-evenly">
      <div
        class="relative"
        :class="{
          'opacity-50 ': currentIndex === 0,
        }"
      >
        <van-icon class="" name="arrow-left" size="16px" @click="handlePrev" />
      </div>
      <van-swipe
        ref="studySwipe"
        class="w-[120px] h-[120px]"
        :show-indicators="false"
        :loop="false"
        :initial-swipe="userLevelData"
        @change="changeIndex"
      >
        <van-swipe-item v-for="item in list" :key="item.id">
          <div class="relative flex items-center justify-center w-full h-full">
            <img class="rounded-full w-[100px] h-[100px]" :src="item.iconUrl" />
          </div>
        </van-swipe-item>
      </van-swipe>
      <div
        class="relative"
        :class="{
          'opacity-50 ': currentIndex === list.length - 1,
        }"
      >
        <van-icon @click="handleNext" name="arrow" size="16px" />
      </div>
    </div>

    <div class="text-center mt-[4px]">
      {{ currentLevelData[classNameShow] }}
    </div>

    <div class="text-center opacity-60 text-[12px] mt-[2px]">
      LV：{{ currentLevelData.lv }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { formatNumberUnit } from '@/utils/utils'
import useLocale from '@/hooks/useLocale'

const { currentLocale } = useLocale()

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
    default: () => {},
  },
  currentIndex: {
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

const userLevelData = computed(() => {
  let lvShow = ''

  if (props.studyType === 1) {
    lvShow = 'userLvId'
  } else {
    lvShow = 'teamLvId'
  }
  const level =
    props.list.findIndex((t) => t.id === props.userStInfo[lvShow]) < 0
      ? 0
      : props.list.findIndex((t) => t.id === props.userStInfo[lvShow])

  return level || 0
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
