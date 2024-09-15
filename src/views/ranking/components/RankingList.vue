<template>
  <div class="relative px-6" :class="{ 'pb-8': studyType !== 1 }">
    <div
      class="bg-[#282B30] min-h-[50vh] relative z-40 rounded-xl pt-4 px-5"
      :class="{ 'pb-[73px]': studyType === 1, 'pb-4': studyType !== 1 }"
    >
      <StudyTag
        bgcolor="#000000"
        :list="circleTypeList"
        :value="circleType"
        @onChange="circleTypeChange"
        :type="2"
      >
      </StudyTag>
      <div class="mt-[16px]">
        <VanList
          v-model:loading="loading"
          :finished="finished"
          :finished-text="t('mei-you-geng-duo-le')"
          :loading-text="t('jia-zai-zhong')"
          @load="onLoad"
        >
          <RankingListItem
            @click="openSquadPop(item)"
            :studyType="studyType"
            :data="item"
            v-for="(item, index) in list"
            :key="item.id"
            :index="index"
          ></RankingListItem>
        </VanList>
        <div
          class="fixed bottom-[110px] left-0 w-full px-6"
          v-if="studyType === 1 && !noOwn && userRankingInfo"
        >
          <div
            class="bg-[#363E4E] rounded-xl px-5 w-full h-[73px] flex items-center"
          >
            <RankingListItem
              :index="userRankingInfo?.rankNum - 1"
              :data="userRankingInfo"
              style="margin-top: 0; margin-bottom: 0; background: #363e4e"
              >(YOU)</RankingListItem
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { ref, computed, onMounted } from 'vue'
import StudyTag from './StudyTag.vue'
import {
  getUserSeniorityPage,
  getTeamSeniorityPage,
  queryTeam,
  getUserSeniority,
  queryUserTeamInfo,
  addTeam,
} from '@/services/study'
import RankingListItem from './RankingListItem.vue'

import { useI18n } from 'vue-i18n'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()

const { t } = useI18n()

const props = defineProps({
  studyType: {
    type: Number,
    default: 1, // 1个人   2 团队
  },
  searchParams: {
    type: Object,
    default: () => {
      return {}
    },
  },
  noOwn: {
    type: Boolean,
    default: false,
  },
  autoStart: {
    type: Boolean,
    default: true,
  },
  userStInfo: {
    type: Object,
    default: () => {},
  },
  currentLevelData: {
    type: Object,
    default: () => {},
  },
})

const [squadPopShow, setSquadPopShow] = useToggle(false)

// 加入
const onJoinSquad = (info) => {
  onAddTeam({ teamId: info.teamId })
}

const btnLoading = ref(false)
const onAddTeam = async (resq) => {
  btnLoading.value = true
  const { success } = await addTeam(resq)
  btnLoading.value = false
  if (success) {
    _queryUserTeamInfo()
    setSquadPopShow(false)
    // Toast(t('jia-ru-tuan-dui-cheng-gong'))
  }
}

const openSquadPop = async (item) => {
  if (props.studyType === 1) return
  router.push('/teamInfo?id=' + item.teamId)
}

// 排行榜类型1:今日2:本周(必传)
const circleType = ref(1)
const circleTypeList = computed(() => [
  {
    value: 1,
    text: t('ri-bang'),
  },
  {
    value: 2,
    text: t('zhou-bang'),
  },
])

const circleTypeChange = (value) => {
  if (circleType.value === value) return
  circleType.value = value
  init()
  _getUserSeniority()
}

const loading = ref(false)
const finished = ref(false)
const page = ref(0)
const size = ref(10)
const total = ref(0)
const list = ref([])

const init = () => {
  page.value = 0
  finished.value = false
  list.value = []
  total.value = 0
  onLoad()
}

const onLoad = async () => {
  if (!props.autoStart) return
  loading.value = true
  page.value += 1
  await getList()
  setTimeout(() => {
    loading.value = false
  }, 3000)
}

const getList = async () => {
  let resp = null
  if (props.studyType === 2) {
    resp = await getTeamSeniorityPage({
      page: page.value,
      size: size.value,
      type: circleType.value,
      ...props.searchParams,
    })
  } else {
    resp = await getUserSeniorityPage({
      page: page.value,
      size: size.value,
      type: circleType.value,
      ...props.searchParams,
    })
  }

  if (!resp.success) {
    finished.value = true
    return
  }

  if (!resp.data || !resp.data.total) {
    finished.value = true
    return
  }
  total.value = resp.data.total

  const tempList = resp.data.list
  list.value = page.value === 1 ? tempList : list.value.concat(tempList)

  // 数据全部加载完成
  if (list.value.length >= total.value) {
    finished.value = true
  }
}

const userRankingInfo = ref(null)
const _getUserSeniority = async () => {
  if (props.userStInfo.userLvId !== props.currentLevelData?.id) {
    userRankingInfo.value = null
    return
  }
  const { success, data }: any = await getUserSeniority({
    type: circleType.value,
    ...props.searchParams,
  })
  if (success) {
    userRankingInfo.value = data
  }
}
const userTeamInfo = ref(null)
const _queryUserTeamInfo = async () => {
  const { success, data } = await queryUserTeamInfo()
  if (success) {
    userTeamInfo.value = data || null
  }
}

onMounted(() => {
  _queryUserTeamInfo()
})

defineExpose({
  init,
  _getUserSeniority,
})
</script>

<style scoped lang="less">
.own {
  background: linear-gradient(180deg, #54595e, #3e4145);
}
</style>
