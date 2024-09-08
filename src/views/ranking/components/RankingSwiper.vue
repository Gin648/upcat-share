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
        <img
          src="@/assets/study/icon_kuang_paihangbang_zuo.png"
          class="w-auto h-full"
        />
        <div
          class="absolute w-10 h-10 -translate-y-1/2 rounded-full right-4 top-1/2"
          :class="{
            'text-white bg-[#282B30]': currentIndex === 0,
            'bg-[#F4D316] text-black': currentIndex !== 0,
          }"
          @click="handlePrev"
        >
          <van-icon
            class="absolute font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            name="arrow-left"
            size="16px"
          />
        </div>
      </div>
      <div
        :style="{
          width: pageWidth * 0.5 + 'px',
          height: pageWidth * 0.5 + 'px',
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
                src="@/assets/study/icon_paihang_cricle.png"
                class="w-full h-full"
              />

              <img
                class="w-[111px] h-[111px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                :src="item.iconUrl"
              />

              <img
                class="absolute bottom-7 left-2 w-[80%]"
                src="@/assets/study/icon_dianzui_paihang.png"
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
        <img
          src="@/assets/study/icon_kuang_paihangbang_you.png"
          class="w-auto h-full"
        />
        <div
          class="absolute w-10 h-10 -translate-y-1/2 rounded-full left-4 top-1/2"
          @click="handleNext"
          :class="{
            'text-white bg-[#282B30]': currentIndex === list.length - 1,
            'bg-[#F4D316] text-black': currentIndex !== list.length - 1,
          }"
        >
          <van-icon
            class="absolute font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            name="arrow"
            size="16px"
          />
        </div>
      </div>
    </div>
    <div class="px-2.5 mt-2.5 relative">
      <img
        src="@/assets/study/icon_kuang_xia_paihangbang.png"
        class="w-full h-auto"
      />
      <div class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div class="text-[#F4D316] text-base text-center">
          {{ currentLevelData[classNameShow] }}
        </div>
        <div
          class="py-2 px-9 bg-[#282B30] rounded-3xl text-sm mt-1"
          v-if="
            (studyType === 1
              ? userStInfo.totalUserAmountHour
              : userStInfo.totalTeamAmountHour) <
            currentLevelData[amoutShowLable]
          "
        >
          {{
            formatNumberUnit(
              studyType === 1
                ? userStInfo.totalUserAmountHour
                : userStInfo.totalTeamAmountHour || 0
            )
          }}/{{ formatNumberUnit(currentLevelData[amoutShowLable] || 0) }}
        </div>
      </div>
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
