<template>
  <div class="pb-4">
    <NavBar :leftArrow="false" title="排行榜"></NavBar>
    <div class="px-[20px] pt-2">
      <StudyTag
          :list="studyTypeList"
          :value="studyType"
          @onChange="studyTypeChange"
      >
      </StudyTag>
    </div>
    <div class="pt-5">
      <RankingSwiper
          ref="swipeRef"
          :pageWidth="pageWidth"
          :currentIndex="currentIndex"
          @changeIndex="changeIndex"
          :userStInfo="baseInfo"
          :studyType="studyType"
          v-if="studyGradeList"
          :list="studyGradeList"
      ></RankingSwiper>
    </div>
    <div class="mt-2">
      <RankingList
          :userStInfo="baseInfo"
          :autoStart="autoStart"
          :searchParams="searchParams"
          :studyType="studyType"
          ref="rankingListRef"
      ></RankingList>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, nextTick} from 'vue'
import NavBar from '@/components/NavBar/index.vue'
import StudyTag from './components/StudyTag.vue'

import RankingSwiper from './components/RankingSwiper.vue'
import RankingList from './components/RankingList.vue'
import {getGradeList} from '@/services/study'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const studyType = ref(1)
const studyTypeList = computed(() => [
  {
    value: 1,
    text: '个人',
  },
  {
    value: 2,
    text: '小队',
  },
])

const rankingListRef = ref(null)

const swipeRef = ref(null)

const studyTypeChange = (value) => {
  if (studyType.value === value) return
  studyType.value = value

  let lvShow = ''
  if (studyType.value === 1) {
    lvShow = 'userLvId'
  } else {
    lvShow = 'teamLvId'
  }

  currentIndex.value =
      studyGradeList.value.findIndex((t) => t.lv === baseInfo.value[lvShow]) < 0
          ? 0
          : studyGradeList.value.findIndex((t) => t.lv === baseInfo.value[lvShow])
  searchParams.value.gradeConfigId =
      studyGradeList.value[currentIndex.value]?.id
  autoStart.value = true
  nextTick(() => {
    rankingListRef.value && rankingListRef.value.init()
    swipeRef.value && swipeRef.value.onSwipeTo()
    if (studyType.value === 1) {
      rankingListRef.value && rankingListRef.value._getUserSeniority()
    }
  })
}

// 当前等级
const currentIndex = ref(0)
const searchParams = ref({
  gradeConfigId: 0,
})
const timer = ref(null)

const changeIndex = (val) => {
  currentIndex.value = val
  console.log(val)

  searchParams.value.gradeConfigId = studyGradeList.value[val].id
  if (timer.value) {
    clearTimeout(timer.value)
  }
  timer.value = setTimeout(() => {
    rankingListRef.value && rankingListRef.value.init()
    if (studyType.value === 1) {
      rankingListRef.value && rankingListRef.value._getUserSeniority()
    }
    timer.value = null
  }, 600)
}

const studyGradeList = ref([])
// 储存用户和团队等级和金币
const baseInfo = ref<any>({})
const autoStart = ref(false)
const _getGradeList = async () => {
  const {success, data}: any = await getGradeList()
  if (success) {
    studyGradeList.value = data
    baseInfo.value = data[0]
    let lvShow = ''
    if (studyType.value === 1) {
      lvShow = 'userLvId'
    } else {
      lvShow = 'teamLvId'
    }
    currentIndex.value =
        studyGradeList.value.findIndex((t) => t.lv === baseInfo.value[lvShow]) < 0
            ? 0
            : studyGradeList.value.findIndex((t) => t.lv === baseInfo.value[lvShow])
    searchParams.value.gradeConfigId =
        studyGradeList.value[currentIndex.value]?.id
    autoStart.value = true
    nextTick(() => {
      rankingListRef.value && rankingListRef.value.init()
      if (studyType.value === 1) {
        rankingListRef.value && rankingListRef.value._getUserSeniority()
      }
    })
  }
}

const pageWidth = ref(0)

onMounted(() => {
  _getGradeList()
  const element = document.getElementById('el')
  pageWidth.value = element.offsetWidth
})
</script>

<style scoped></style>
