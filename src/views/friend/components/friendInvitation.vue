<template>
  <!--  邀请组件-->
  <!--    链接复制成功弹窗-->
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

  <!--    礼包分享-->
  <div class="friend-gift mt-[20px]">
    <!--        顶部标题-->
    <div class="gift-title">
      <img src="@/assets/friend/gift.svg" alt="" />
      <span>你和你的朋友都将获得礼包</span>
    </div>
    <!--      card中间-->
    <div class="gift-card">
      <div class="card-top">
        <div class="top-item">
          <div class="money">
            <span>{{ inviterGiveAmount }}</span>
            <img src="@/assets/png/Cat_Coin.png" class="w-[24px]" />
          </div>
          <div class="text">好友获得</div>
        </div>
        <div class="symbol">
          <img src="@/assets/friend/plus.png" alt="" />
        </div>
        <div class="top-item">
          <div class="money">
            <span>{{ inviterGiveAmount / 2 }}</span>
            <img src="@/assets/png/Cat_Coin.png" class="w-[24px]" />
          </div>
          <div class="text">你获得</div>
        </div>
      </div>
      <van-divider dashed :style="{ margin: '20px 0 10px' }"></van-divider>
      <div class="card-botoom">
        <img src="@/assets/friend/tag.png" alt="" class="h-[38px]" />
        <span>邀请好友可获得星星购买折扣</span>
      </div>
    </div>
    <!--      card按钮-->
    <div class="flex justify-between gift-button">
      <van-button
        class="shadow-btn-green w-[48%]"
        type="primary"
        @click="onShare"
      >
        <div class="flex items-center gap-[8px]">
          <img src="@/assets/friend/share.png" alt="" class="h-[24px]" />
          <span>邀请好友</span>
        </div>
      </van-button>
      <van-button
        @click="onCopy"
        class="shadow-btn-primary w-[48%]"
        type="primary"
      >
        <div class="flex items-center gap-[8px]">
          <img src="@/assets/friend/copy.png" alt="" class="h-[24px]" />
          <span>复制链接</span>
        </div>
      </van-button>
    </div>
  </div>

  <!--    好友明细-->
  <div class="friend-list">
    <div class="mt-[16px] mb-2.5 text-[12px]">
      <span>好友明细</span>
    </div>
    <div class="friend-list-content">
      <div
        class="flex justify-between content-item mb-3 p-[9px]"
        v-for="(item, index) in 5"
        :key="index"
      >
        <div class="flex">
          <img
            src="@/assets/friend/gift.svg"
            class="w-[34px] h-[34px]"
            alt=""
          />
          <div class="flex flex-col ml-1.5">
            <div class="flex">
              <span class="text-[14px]">Binance CZ</span>
              <span class="text-[12px] opacity-60 ml-1">(Level 3)</span>
            </div>
            <div class="text-[12px]">08/22 2024</div>
          </div>
        </div>
        <div class="flex">
          <div class="flex flex-col items-center justify-center mr-5">
            <img
              class="w-[28px] h-[28px]"
              src="@/assets/friend/gift.svg"
              alt=""
            />
            <img
              class="w-[10px] h-[10px]"
              src="@/assets/friend/hook-g.svg"
              alt=""
            />
          </div>
          <div class="flex flex-col items-center justify-center">
            <img
              class="w-[28px] h-[28px]"
              src="@/assets/friend/frame.svg"
              alt=""
            />
            <img
              class="w-[10px] h-[10px]"
              src="@/assets/friend/hook-g.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getInviterGiveAmount } from '@/services/user'
import { handleCopy, telegramHandle } from '@/utils/utils'
import useStore from '@/store'
import { config } from '@/config'

const { accountStore, globalStore } = useStore()

const inviteUrl = computed(() => {
  if (globalStore.environment === 'tg') {
    return `https://t.me/share/url?url=${config.telegramInveteUrl}?startapp=${userInfo.value.invitationCode}`
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
const onCopy = () => {
  show.value = true
  if (globalStore.environment === 'tg') {
    telegramHandle(inviteUrl.value)
  } else {
    handleCopy(inviteUrl.value, false)
  }
  setTimeout(() => {
    show.value = false
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
