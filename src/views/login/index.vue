<template>
  <div class="login-wrapper">
    <div class="title">欢迎来到UPCAT</div>
    <div class="sub-title mt-[4px] mb-[90px]">登录UPCAT</div>
    <van-button
      @click="handleTo('/login-email')"
      class="shadow-btn-primary"
      type="primary"
      block
      >邮箱登陆</van-button
    >
    <div class="h-[13px]"></div>
    <van-button class="mt-[12px] shadow-btn-grey" block>游客登陆</van-button>
    <div class="protocol" @click="onChange">
      <img v-if="checked" src="@/assets/svg/checked.svg" class="checked-icon" />
      <img v-else src="@/assets/svg/unchecked.svg" class="checked-icon" />

      我已经阅读并确认<span class="text-[#1ba0ff]">《隐私协议》</span>
    </div>
    <router-view class="child-view"></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
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
  justify-content: center;
  align-items: center;
  padding: 0 22px;

  .protocol {
    display: flex;
    align-items: center;
    opacity: 0.8;
    color: #ffffff;
    font-size: 12px;
    margin-top: 130px;

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
