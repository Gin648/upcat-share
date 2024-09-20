<template>
  <div>
    <!--社区详情-->
    <nav-bar :title="t('cha-kan-xiao-dui')"></nav-bar>

    <div class="px-[16px]">
      <!--  已经加入了社区-->
      <div class="friend-yes-community-card mt-2.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center flex-1">
            <img
              :src="teamInfo.iconUrl || getImage('png/squad-default-icon.png')"
              class="w-[64px] h-[64px] flex-shrink-0"
            />
            <div class="flex flex-col ml-2">
              <div class="flex mb-1.5">
                <span class="text-[16px] font-semibold truncate max-w-[64px]">{{
                  teamInfo.name
                }}</span>
                <div
                  class="text-[14px] text-[#FFD702] flex items-center border rounded-[8px] px-[10px] ml-[1px] border-[#FFD702] flex-shrink-0"
                >
                  LV{{ teamInfo.lv || 0 }}
                </div>
              </div>
              <div class="text-[12px]">
                <span>{{ t('chuang-jian-ren') }}: </span>
                <span>{{ teamInfo.nickname }}</span>
              </div>
            </div>
          </div>
          <van-button
            v-if="!(userTeamInfo && userTeamInfo.teamId)"
            class="flex-shrink-0 h-full shadow-btn-primary"
            size="small"
            type="primary"
            st
            @click="confirmPupop = true"
          >
            <div class="flex items-center py-[8px] gap-[4px] px-[10px]">
              <img src="@/assets/friend/join.png" class="w-[16px]" />
              <span>{{ t('jia-ru-xiao-dui') }}</span>
            </div>
          </van-button>
        </div>
        <div class="flex justify-around mt-6">
          <div
            class="px-[18px] py-[16px] bg-[#191A1C] rounded-2xl w-[31%] flex flex-col items-center"
          >
            <span class="text-[14px]">{{ t('xiao-dui-cheng-yuan') }}</span>
            <div class="flex items-center mt-1">
              <img
                src="@/assets/friend/create.png"
                class="w-[15px] h-[15px]"
                alt=""
              />
              <span class="text-[16px] font-bold ml-1">{{
                teamInfo.teamNumber
              }}</span>
            </div>
          </div>
          <div
            class="px-[18px] py-[16px] bg-[#191A1C] rounded-2xl w-[31%] flex flex-col items-center"
          >
            <span class="text-[14px]">{{ t('dui-zhang') }}</span>
            <div class="flex items-center mt-1">
              <img
                src="@/assets/friend/pentagram.png"
                class="w-[15px] h-[15px]"
                alt=""
              />
              <span class="text-[16px] font-bold ml-1">{{
                teamInfo.lotteryTeamNumber
              }}</span>
            </div>
          </div>
          <div
            class="px-[18px] py-[16px] bg-[#191A1C] rounded-2xl w-[31%] flex flex-col items-center"
          >
            <span class="text-[14px]">{{ t('xiao-dui-zong-liang') }}</span>
            <div class="flex items-center mt-1">
              <img
                src="@/assets/friend/pentagram.png"
                alt=""
                class="w-[15px] h-[15px]"
              />
              <span class="text-[16px] font-bold ml-1">{{
                teamInfo.lotteryTotalNumber
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <!--  已加入社区按钮-->
      <div
        class="mt-[16px] flex justify-between bg-[#292D34] py-[13px] px-[20px] rounded-[20px]"
        @click="telegramHandle(teamInfo?.telegramUrl)"
      >
        <span>{{ t('jia-ru-qun-liao') }}</span>
        <img src="@/assets/friend/rightArrow.svg" alt="" />
      </div>
      <!--    社区成员-->
      <div class="friend-list">
        <div class="mt-[16px] mb-2.5 text-[12px]">
          <span>{{ t('xiao-dui-cheng-yuan') }}</span>
        </div>

        <VanList
          v-model:loading="state.loading"
          :finished="state.finished"
          :finished-text="t('mei-you-geng-duo-le')"
          :loading-text="t('jia-zai-zhong')"
          @load="onLoad"
        >
          <div class="friend-list-content">
            <div
              class="flex justify-between content-item mb-3 p-[9px]"
              v-for="(item, index) in state.list"
              :key="index"
            >
              <div class="flex items-center">
                <img
                  :src="item.avatar || getImage('png/header-default.png')"
                  class="w-[34px] h-[34px]"
                  alt=""
                />
                <div class="flex flex-col ml-1.5">
                  <div class="flex">
                    <span class="text-[14px]">{{ item.name }}</span>
                    <span class="text-[12px] opacity-60 ml-1"
                      >(Level {{ item.lv || 0 }})</span
                    >
                  </div>
                  <div class="text-[12px]">
                    {{ t('xing-xing') }}：{{ item.amount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VanList>
      </div>
    </div>

    <van-popup
      v-model:show="confirmPupop"
      style="width: 100vw"
      class="van-popup--transparent max-w-[100vw] w-[100vw]"
      @close="confirmPupop = false"
    >
      <div class="px-[16px] pt-[24px]">
        <div class="common-linear py-[32px] px-[20px] relative">
          <div class="text-[20px] font-bold mb-[20px] text-center">
            {{ t('que-ding-jia-ru') }}"{{ teamInfo.name }}"？
          </div>
          <div
            class="text-[16px] mb-[20px] text-center flex items-center justify-center"
          >
            <span class="text-[#FF2B00]">60 &nbsp;</span>
            {{ t('fen-nei-bu-ke-bian-xiao-dui') }}
          </div>
          <div class="w-[100%] flex justify-around">
            <van-button
              class="shadow-btn-grey w-[30%] mr-5"
              type="primary"
              @click="confirmPupop = false"
            >
              <div class="flex items-center gap-[8px]">
                <span class="text-[18px]">{{ t('zai-xiang-xiang') }} </span>
              </div>
            </van-button>
            <van-button
              :loading="btnLoading"
              class="shadow-btn-primary w-[60%]"
              type="primary"
              @click="handleConfrim"
            >
              <div class="flex items-center gap-[8px]">
                <span class="text-[18px]">{{ t('que-ren') }} </span>
              </div>
            </van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref, reactive } from 'vue'
import {
  queryTeam,
  myTeamSeniorityPage,
  addTeam,
  queryUserTeamInfo,
} from '@/services/study'
import { telegramHandle, getImage } from '@/utils/utils'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const teamInfo: any = ref({})
const _queryTeamInfo = async () => {
  const { success, data } = await queryTeam({
    teamId: route.query?.id,
  })
  if (success) {
    teamInfo.value = data || {}
  }
}

const confirmPupop = ref(false)
const handleConfrim = () => {
  onAddTeam({ teamId: teamInfo.value.teamId })
}

const btnLoading = ref(false)
// 加入小队
const onAddTeam = async (resq) => {
  btnLoading.value = true
  const resp = await addTeam(resq)
  btnLoading.value = false
  if (resp.success) {
    route.params.refresh = '1'
    confirmPupop.value = false
    init()
  }
}

const state = reactive({
  page: 0,
  size: 10,
  finished: false,
  list: [],
  loading: false,
  total: 0,
})

const init = () => {
  state.page = 0
  state.total = 0
  state.finished = false
  state.list = []
  onLoad()
  _queryUserTeamInfo()
  _queryTeamInfo()
}

const getList = async () => {
  const resp: any = await myTeamSeniorityPage({
    page: state.page,
    size: state.size,
    teamId: route.query?.id,
  })
  if (!resp.success) {
    state.finished = true
    return
  }

  if (!resp.data || !+resp.data.total) {
    state.finished = true
    return
  }
  state.loading = false

  state.total = resp.data.total
  state.list =
    state.page === 1 ? resp.data.list : state.list.concat(resp.data.list)
  // 数据全部加载完成
  if (state.list.length >= state.total) {
    state.finished = true
  }
}

const onLoad = async () => {
  try {
    state.loading = true
    state.page += 1
    await getList()
  } catch (error) {
    state.finished = true
  } finally {
    state.loading = false
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
  _queryTeamInfo()
})
</script>

<style scoped lang="less">
.friend-list {
  .content-item {
    border-radius: 12px;
    background: linear-gradient(180deg, #4b4f55 0%, #232830 100%);
  }
}

.friend-yes-community-card {
  border-radius: 8px;
  background: linear-gradient(180deg, #292d34 0%, rgba(0, 149, 255, 0.1) 100%);
  padding: 12px;
  //border: 1px solid #26B3F8;
}
</style>
