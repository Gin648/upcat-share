<template>
  <div class="friend-copy animate__animated animate__fadeInDown" v-if="show">
    <div class="text-copy-box">
      <img src="@/assets/friend/hook.svg" alt="" />
      <span>链接已复制</span>
    </div>
    <span class="text-bg">Invite Friends</span>
    <img
      @click="show = false"
      class="x-img"
      src="@/assets/friend/x.svg"
      alt=""
    />
  </div>
  <!--  已经加入了社区-->
  <div class="friend-yes-community-card mt-2.5">
    <div class="flex">
      <img
        :src="info.iconUrl || getImage('png/squad-default-icon.png')"
        class="w-[64px] h-[64px]"
      />
      <div class="flex flex-col ml-2">
        <div class="flex mb-1.5">
          <span class="text-[18px] mr-2">{{ info.name }}</span>
          <div
            class="text-[14px] text-[#FFD702] flex items-center border rounded-[8px] px-[10px] ml-1 border-[#FFD702]"
          >
            LV{{ info.lv }}
          </div>
        </div>
        <div class="text-[12px]">
          <span>创建人: </span>
          <span>{{ info.nickname }}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-around mt-6">
      <div
        class="px-[18px] py-[16px] bg-[#191A1C] rounded-2xl w-[31%] flex flex-col items-center"
      >
        <span class="text-[14px]">社区成员</span>
        <span class="text-[24px] font-bold">{{ info.teamNumber }}</span>
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
            info.lotteryTeamNumber
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
            info.lotteryTotalNumber
          }}</span>
        </div>
      </div>
    </div>
  </div>
  <!--  已加入社区按钮-->
  <div
    class="friend-yes-community-button flex justify-between mt-[16px] gap-y-[12px] flex-wrap"
  >
    <van-button
      class="shadow-btn-green w-[45%] mb-4"
      type="primary"
      @click="onShare"
    >
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/friend/share.png" class="w-[24px]" />
        <span>邀请好友</span>
      </div>
    </van-button>
    <van-button
      @click="onCopy"
      class="shadow-btn-green w-[45%] mb-4"
      type="primary"
    >
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/friend/copy.png" class="w-[20px]" />
        <span>复制链接</span>
      </div>
    </van-button>
    <van-button
      @click="telegramHandle(info?.telegramUrl)"
      class="shadow-btn-green w-[45%] mb-4"
      type="primary"
    >
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/friend/joinGroupChat.png" class="w-[30px]" />
        <span>加入群聊</span>
      </div>
    </van-button>
    <van-button
      v-if="info?.userId !== info?.groupUserId"
      class="shadow-btn-primary w-[45%] mb-4"
      type="primary"
      @click="openPop(1)"
    >
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/friend/exitTheCommunity.png" class="w-[24px]" />
        <span>退出社区</span>
      </div>
    </van-button>
    <van-button
      v-if="info?.userId === info?.groupUserId"
      class="shadow-btn-primary w-[45%] mb-4"
      type="primary"
      @click="openPop(2)"
    >
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/friend/dissolveTheCommunity.png" class="w-[21px]" />
        <span>解散社区</span>
      </div>
    </van-button>
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
              :src="item.avatar || getImage('png/squad-default-icon.png')"
              class="w-[34px] h-[34px]"
              alt=""
            />
            <div class="flex flex-col ml-1.5">
              <div class="flex">
                <span class="text-[14px]">{{ item.name || 'Tom' }}</span>
                <span class="text-[12px] opacity-60 ml-1"
                  >(Level {{ item.lv }})</span
                >
              </div>
              <div class="text-[12px]">星星：{{ item.amount }}</div>
            </div>
          </div>
        </div>
      </div>
    </VanList>
    <CommonPop
      :show="exitPopShow"
      @close="setExitPopShow(false)"
      @confirm="onLeave"
      :loading="btnLoading"
    >
      <span>
        {{ tipType === 1 ? '是否离开小队?' : '是否解散小队?' }}
      </span>
    </CommonPop>
  </div>
</template>
<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { ref, reactive, onMounted, computed } from 'vue'
import { config } from '@/config'
import useStore from '@/store'
import { handleCopy, telegramHandle, getImage } from '@/utils/utils'
import CommonPop from '@/components/CommonPop/index.vue'
import { outTeam, myTeamSeniorityPage } from '@/services/study'

const { accountStore, globalStore } = useStore()
const [exitPopShow, setExitPopShow] = useToggle(false)

const props = withDefaults(
  defineProps<{
    info?: any
  }>(),
  {
    info: () => ({}),
  }
)

const emit = defineEmits(['init'])

const show = ref(false)
const inviteUrl = computed(() => {
  if (globalStore.environment === 'tg') {
    return `${config.telegramInveteUrl}?startapp=${userInfo.value.invitationCode}_${props.info.teamId}`
  } else {
    if (userInfo.value.invitationCode) {
      return (
        window.location.origin +
        '/friend/communityDetails?id=' +
        props.info.teamId
      )
    }
  }
  return ''
})

const timer = ref(null)
const onCopy = () => {
  if (timer.value) {
    clearTimeout(timer.value)
  }
  show.value = true
  handleCopy(inviteUrl.value, false)
  timer.value = setTimeout(() => {
    show.value = false
    timer.value = null
  }, 3000)
}

const onShare = () => {
  const url = `https://t.me/share/url?url=${config.telegramInveteUrl}?startapp=${userInfo.value.invitationCode}_${props.info.teamId}`
  telegramHandle(url)
}

// 获取用户信息
const userInfo = computed(() => {
  if (accountStore.userInfo) {
    return accountStore.userInfo || {}
  }
})

const tipType = ref(1)
const openPop = (val) => {
  tipType.value = val
  setExitPopShow(true)
}

const btnLoading = ref(false)
const onLeave = async () => {
  btnLoading.value = true
  const { success } = await outTeam()
  btnLoading.value = false
  if (success) {
    emit('init')
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
}

const getList = async () => {
  const resp: any = await myTeamSeniorityPage({
    page: state.page,
    size: state.size,
    teamId: props.info.teamId,
  })
  if (!resp.success) {
    state.finished = true
    return
  }

  if (!resp.data || !+resp.data.total) {
    state.finished = true
    return
  }
  console.log(resp, 'resp')
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
</script>

<style scoped lang="less">
.friend-copy {
  position: fixed;
  top: 50px;
  width: calc(100% - 32px);
  display: flex;
  background-color: #292d34;
  align-items: center;
  border-radius: 40px;
  padding: 6px;

  .text-copy-box {
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }

    span {
      font-size: 12px;
    }
  }

  .text-bg {
    position: absolute;
    left: 20%;
    opacity: 0.05;
    font-weight: bold;
    font-size: 24px;
  }

  .x-img {
    position: absolute;
    right: 10px;
  }
}
.friend-yes-community-card {
  border-radius: 8px;
  background: linear-gradient(180deg, #292d34 0%, rgba(0, 149, 255, 0.1) 100%);
  padding: 12px;
  //border: 1px solid #26B3F8;
}

.friend-list {
  .content-item {
    border-radius: 12px;
    background: linear-gradient(180deg, #4b4f55 0%, #232830 100%);
  }
}
</style>
