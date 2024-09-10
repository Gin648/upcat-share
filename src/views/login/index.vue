<template>
  <div class="login-wrapper">
    <div class="flex flex-col items-center mt-[20px]">
      <img src="@/assets/svg/up_login_icon.svg" class="w-[138px] mb-[13px]" />
      <img src="@/assets/svg/tomup.svg" class="w-[200px] mb-[12px]" />
      <div class="title">欢迎来到UPCAT</div>
    </div>

    <div class="w-full text-center">
      <div class="pb-[3px] w-full rounded-[4px] border-[1.5px] border-black">
        <van-button
          @click="handleTo('/login-email')"
          class="shadow-btn-primary"
          type="primary"
          block
        >
          <div class="text-[18px] flex items-center gap-[8px]">
            <img src="@/assets/svg/email_login.svg" class="w-[26px]" />
            <span>邮箱登陆</span>
          </div>
        </van-button>
      </div>

      <div class="h-[13px]"></div>
      <div class="pb-[3px] w-full rounded-[4px] border-[1.5px] border-black">
        <van-button class="mt-[12px] shadow-btn-grey" block>
          <div class="text-[18px] flex items-center gap-[8px]">
            <img src="@/assets/svg/visitor_login.svg" class="w-[24px]" />
            <span>游客登陆</span>
          </div>
        </van-button>
      </div>
      <div class="protocol" @click="onChange">
        <img
          v-if="checked"
          src="@/assets/svg/checked.svg"
          class="checked-icon"
        />
        <img v-else src="@/assets/svg/unchecked.svg" class="checked-icon" />

        我已经阅读并确认<span class="text-[#1ba0ff]">《隐私协议》</span>
      </div>
      {{ globalStore.environment }}
    </div>

    <router-view class="child-view"></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '@/store'
const { globalStore } = useStore()

const router = useRouter()

const checked = ref(false)

const onChange = () => {
  checked.value = !checked.value
}

const handleTo = (path) => {
  router.push(path)
}
</script>

<style scoped lang="less">
.login-wrapper {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 22px;

  .protocol {
    width: 100%;

    margin-top: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    color: #ffffff;
    font-size: 12px;

    .un-checked {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 3px;
      border: 1px solid #ffffff;
    }
    .checked-icon {
      width: 12px;
      height: 12px;
      flex-shrink: 0;
      margin-right: 3px;
    }
  }
}
</style>
