<template>
  <div>
    <!--社区详情-->
    <nav-bar title="查看小队"></nav-bar>

    <div class="px-[16px]">
      <!--  已经加入了社区-->
      <div class="friend-yes-community-card mt-2.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img :src="teamInfo.iconUrl" class="w-[64px] h-[64px]" />
            <div class="flex flex-col ml-2">
              <div class="flex mb-1.5">
                <span class="text-[18px] mr-2">{{ teamInfo.name }}</span>
                <div
                  class="text-[14px] text-[#FFD702] flex items-center border rounded-[8px] px-[10px] ml-[4px] border-[#FFD702]"
                >
                  LV{{ teamInfo.lv || 0 }}
                </div>
              </div>
              <div class="text-[12px]">
                <span>创建人: </span>
                <span>{{ teamInfo.nickname }}</span>
              </div>
            </div>
          </div>
          <van-button
            v-if="!(userTeamInfo && userTeamInfo.teamId)"
            class="h-full shadow-btn-primary"
            size="small"
            type="primary"
            st
            @click="confirmPupop = true"
          >
            <div class="flex items-center gap-[4px] px-[10px]">
              <img src="@/assets/friend/join.png" class="w-[16px]" />
              <span>加入小队</span>
            </div>
          </van-button>
        </div>
        <div class="flex justify-around mt-6">
          <div
            class="px-[18px] py-[16px] bg-[#191A1C] rounded-2xl w-[31%] flex flex-col items-center"
          >
            <span class="text-[14px]">小队成员</span>
            <span class="text-[24px] font-bold">{{ teamInfo.teamNumber }}</span>
          </div>
          <div
            class="px-[18px] py-[16px] bg-[#191A1C] rounded-2xl w-[31%] flex flex-col items-center"
          >
            <span class="text-[14px]">队长</span>
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
            <span class="text-[14px]">小队总量</span>
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
        <span>加入群聊</span>
        <img src="@/assets/friend/rightArrow.svg" alt="" />
      </div>
      <!--    社区成员-->
      <div class="friend-list">
        <div class="mt-[16px] mb-2.5 text-[12px]">
          <span>社区成员</span>
        </div>

        <VanList
          v-model:loading="state.loading"
          :finished="state.finished"
          finished-text="没有更多了"
          loading-text="加载中"
          @load="onLoad"
        >
          <div class="friend-list-content">
            <div
              class="flex justify-between content-item mb-3 p-[9px]"
              v-for="(item, index) in state.list"
              :key="index"
            >
              <div class="flex">
                <img
                  :src="item.avatar || getImage('png/header-default-trans.png')"
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
                  <div class="text-[12px]">星星：{{ item.amount }}</div>
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
            确定加入"{{ teamInfo.name }}"？
          </div>
          <div
            class="text-[16px] mb-[20px] text-center flex items-center justify-center"
          >
            加入后 <span class="text-[#FF2B00]">59:59</span> 内不得变更小队
          </div>
          <div class="w-[100%] flex justify-around">
            <van-button
              class="shadow-btn-grey w-[30%] mr-5"
              type="primary"
              @click="confirmPupop = false"
            >
              <div class="flex items-center gap-[8px]">
                <span class="text-[18px]">再想想</span>
              </div>
            </van-button>
            <van-button
              :loading="btnLoading"
              class="shadow-btn-primary w-[60%]"
              type="primary"
              @click="handleConfrim"
            >
              <div class="flex items-center gap-[8px]">
                <span class="text-[18px]">确认</span>
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
