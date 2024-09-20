<template>
  <!--  邀请组件-->
  <!--    链接复制成功弹窗-->
  <div class="friend-copy animate__animated animate__fadeInDown" v-if="show">
    <div class="text-copy-box">
      <img src="@/assets/friend/hook.svg" alt="" />
      <span>{{ t('lian-jie-yi-fu-zhi') }}</span>
    </div>
    <span class="text-bg">Invite Friends</span>
    <img
      @click="show = false"
      class="x-img"
      src="@/assets/friend/x.svg"
      alt=""
    />
  </div>

  <!--    礼包分享-->
  <div class="friend-gift mt-[20px]">
    <!--        顶部标题-->
    <div class="gift-title">
      <img src="@/assets/friend/gift.svg" alt="" />
      <span>{{ t('ni-he-ni-de-peng-you') }}</span>
    </div>
    <!--      card中间-->
    <div class="gift-card">
      <div class="card-top">
        <div class="top-item">
          <div class="money">
            <span>{{ inviterGiveAmount }}</span>
            <img src="@/assets/png/Cat_Coin.png" class="w-[24px]" />
          </div>
          <div class="text">{{ t('hao-you-huo-de') }}</div>
        </div>
        <div class="symbol">
          <img src="@/assets/friend/plus.png" alt="" />
        </div>
        <div class="top-item">
          <div class="money">
            <span>{{ inviterGiveAmount / 2 }}</span>
            <img src="@/assets/png/Cat_Coin.png" class="w-[24px]" />
          </div>
          <div class="text">{{ t('ni-huo-de') }}</div>
        </div>
      </div>
      <van-divider dashed :style="{ margin: '20px 0 10px' }"></van-divider>
      <div class="card-botoom">
        <img src="@/assets/friend/tag.png" alt="" class="h-[38px]" />
        <span>{{ t('yao-qing-hao-you-huo-de-zhe-kou') }}</span>
      </div>
    </div>
    <!--      card按钮-->
    <div class="flex justify-between gift-button mt-[20px]">
      <van-button
        class="shadow-btn-green w-[48%]"
        type="primary"
        @click="onShare"
      >
        <div class="flex items-center gap-[8px]">
          <img src="@/assets/friend/share.png" alt="" class="h-[24px]" />
          <span>{{ t('yao-qing-hao-you') }}</span>
        </div>
      </van-button>
      <van-button
        @click="onCopy"
        class="shadow-btn-primary w-[48%]"
        type="primary"
      >
        <div class="flex items-center gap-[8px]">
          <img src="@/assets/friend/copy.png" alt="" class="h-[24px]" />
          <span>{{ t('fu-zhi-lian-jie') }}</span>
        </div>
      </van-button>
    </div>
  </div>

  <!--    好友明细-->
  <div class="friend-list">
    <div class="mt-[16px] mb-2.5 text-[12px]">
      <span>{{ t('hao-you-ming-xi') }}</span>
    </div>
    <div>
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
                class="w-[34px] h-[34px] "
                alt=""
              />
              <div class="flex flex-col ml-1.5">
                <div class="flex">
                  <span class="text-[14px]">{{ item.nickname || 'Tom' }}</span>
                  <span class="text-[12px] opacity-60 ml-1"
                    >(Level {{ item.lv }})</span
                  >
                </div>
                <div class="text-[12px]">{{ item.createTime }}</div>
              </div>
            </div>
            <div class="flex justify-end">
              <div
                v-if="item.isSignAward"
                class="flex flex-col items-center justify-center mr-5"
              >
                <img class="w-[28px]" src="@/assets/friend/gift.svg" alt="" />
                <img
                  class="w-[10px] h-[10px]"
                  src="@/assets/friend/hook-g.svg"
                  alt=""
                />
              </div>
              <div
                v-if="item.isTeamFlag"
                class="flex flex-col items-center justify-center"
              >
                <img class="w-[31px]" src="@/assets/friend/frame.svg" alt="" />
                <img
                  class="w-[10px] h-[10px]"
                  src="@/assets/friend/hook-g.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </VanList>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { getInviterGiveAmount } from '@/services/user'
import { handleCopy, telegramHandle, getImage } from '@/utils/utils'
import { getUserTeamPage } from '@/services/user'
import useStore from '@/store'
import { config } from '@/config'
import {useI18n} from "vue-i18n";
const {t} = useI18n();
const { accountStore, globalStore } = useStore()

const state = reactive({
  active: 0,
  page: 0,
  size: 10,
  finished: false,
  list: [],
  loading: false,
  total: 0,
})

const getList = async () => {
  const resp: any = await getUserTeamPage({
    page: state.page,
    size: state.size,
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

const inviteUrl = computed(() => {
  if (globalStore.environment === 'tg') {
    return `${config.telegramInveteUrl}?startapp=${userInfo.value.invitationCode}`
  } else {
    if (userInfo.value.invitationCode) {
      return (
        window.location.origin +
        '/login?type=2&invitationCode=' +
        userInfo.value.invitationCode
      )
    }
  }
  return ''
})

const onShare = () => {
  const url = `https://t.me/share/url?url=${config.telegramInveteUrl}?startapp=${userInfo.value.invitationCode}`
  telegramHandle(url)
}

const show = ref(false)
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

const inviterGiveAmount = ref<number>(0)
const _getInviterGiveAmount = async () => {
  const { success, data } = await getInviterGiveAmount()
  if (success) {
    inviterGiveAmount.value = +data
  }
}

// 获取用户信息
const userInfo = computed(() => {
  if (accountStore.userInfo) {
    return accountStore.userInfo || {}
  }
})

onMounted(() => {
  _getInviterGiveAmount()
})
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

.friend-gift {
  border-radius: 12px;
  background: #050506;
  padding: 12px 16px 20px;

  .gift-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;

    span {
      font-size: 18px;
      font-weight: bold;
      margin-left: 10px;
    }
  }

  .gift-card {
    background: url('@/assets/friend/card-bg.png') no-repeat;
    background-size: contain;
    padding: 20px 17px;

    .card-top {
      display: flex;

      .top-item {
        flex: 1;
        text-align: center;
        .money {
          width: 100%;
          gap: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          //text-align: center;

          span {
            &:first-child {
              font-size: 26px;
              font-weight: bold;
            }

            &:last-child {
              font-size: 24px;
              margin-left: 10px;
            }
          }
        }

        .text {
          font-size: 14px;
          opacity: 0.6;
        }
      }

      .symbol {
        flex-shrink: 0;

        img {
          width: 16px;
          height: 16px;
          margin-top: 10px;
        }
      }
    }

    .card-botoom {
      display: flex;
      align-items: center;

      span {
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }
}

.friend-list {
  .content-item {
    border-radius: 12px;
    background: linear-gradient(180deg, #4b4f55 0%, #232830 100%);
  }
}
</style>
