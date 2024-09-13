<template>
  <div class="w-full">
    <!--  个人详情-->
    <nav-bar title="个人详情"></nav-bar>
    <div class="my relative w-[100%] box-border">
      <div class="my-card mt-2.5 p-[20px]">
        <div class="flex items-center">
          <div class="w-[88px] h-[88px]">
            <van-uploader :after-read="afterRead">
              <img
                :src="userInfo.avatar"
                class="rounded-[100%] w-[88px] h-[88px]"
                v-if="userInfo.avatar"
              />
              <img
                src="@/assets/png/header-default.png"
                class="rounded-[100%] w-[88px] h-[88px]"
                alt=""
                v-else
              />
            </van-uploader>
          </div>
          <div class="flex flex-col flex-1 ml-6">
            <div class="flex mb-1.5">
              <div class="field-transparent w-[80%] mr-2">
                <van-field
                  ref="nicknameInput"
                  placeholder="Tom"
                  :disabled="disableNikeName"
                  v-model="nickname"
                  @blur="handleBlurName"
                />
              </div>
              <img src="@/assets/my/edit.svg" alt="" @click="handleEditName" />
            </div>
            <div class="text-[12px] flex items-center">
              <span>ID: </span>
              <span>{{ userInfo.id }}</span>
              <img
                src="@/assets/my/copy.svg"
                @click="handleCopy(userInfo.id)"
                class="ml-2"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex justify-between mt-[10px] items-center common-linear pt-[10px] pb-[22px] px-[20px]"
      >
        <div class="flex flex-col">
          <span class="opacity-80 text-[12px]">我的邀请码</span>
          <span class="mt-[10px] text-[20px] font-bold">{{
            userInfo.invitationCode
          }}</span>
        </div>
        <div class="copy-bg" @click="handleCopy(userInfo.invitationCode)">
          复制
        </div>
      </div>
      <div
        class="flex justify-between mt-[10px] items-center common-linear py-[22px] px-[20px]"
      >
        <div class="text-[16px]">绑定推荐人</div>
        <div
          class="flex items-center"
          v-if="userInfo.pid1 == 0"
          @click="bindCodePupup = true"
        >
          <span class="opacity-80 text-[12px] mr-1">去绑定</span>
          <img src="@/assets/my/downArrow.svg" alt="" />
        </div>
        <div class="flex items-center" v-else>
          <span class="opacity-80 text-[12px] mr-1">已绑定</span>
        </div>
      </div>
      <div
        class="flex justify-between mt-[10px] items-center common-linear py-[22px] px-[20px]"
        @click="userInfo.email ? '' : (bindEmailPupup = true)"
      >
        <div class="text-[16px]">绑定邮箱</div>
        <div class="flex items-center" v-if="!userInfo.email">
          <span class="opacity-80 text-[12px] mr-1">去绑定</span>
          <img src="@/assets/my/downArrow.svg" alt="" />
        </div>
        <div class="flex items-center" v-else>
          <span class="opacity-80 text-[12px] mr-1">{{ userInfo.email }}</span>
        </div>
      </div>
      <div
        class="flex justify-between mt-[10px] items-center common-linear py-[22px] px-[20px]"
        @click="handleTo"
      >
        <div class="text-[16px]">安全密码</div>
        <div class="flex items-center">
          <img src="@/assets/my/downArrow.svg" alt="" />
        </div>
      </div>
      <router-view class="child-view"></router-view>
    </div>
    <!--    退出登录-->
    <div
      v-if="globalStore.environment != 'tg'"
      class="my-button fixed text-center bottom-[50px] w-[100%]"
    >
      <van-button
        :loading="outLoading"
        class="shadow-btn-grey w-[90%]"
        type="primary"
        @click="loginOut"
      >
        <div class="flex items-center gap-[8px]">
          <img src="@/assets/my/logOutAndLogIn.png" alt="" class="h-[24px]" />
          <span>退出登录</span>
        </div>
      </van-button>
    </div>

    <!--绑定邀请码-->
    <van-popup
      v-model:show="bindCodePupup"
      class="van-popup--transparent max-w-[100vw] w-[100vw]"
      style="width: 100vw"
      @close="onClose"
    >
      <bind-code @close="onClose"></bind-code>
    </van-popup>
    <!--  绑定邮箱-->
    <van-popup
      v-model:show="bindEmailPupup"
      class="van-popup--transparent max-w-[100vw] w-[100vw]"
      @close="bindEmailPupup = false"
    >
      <bind-email @close="bindEmailPupup = false"></bind-email>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import useStore from '@/store'
import { getImage, handleCopy } from '@/utils/utils'
import { updateUserInfo, upload } from '@/services/user'
import { useAccount } from '@/hooks/useAccount'
import { showToast } from 'vant'
import { computed, ref } from 'vue'
import BindCode from '@/views/my/components/bindCode.vue'
import { useRouter } from 'vue-router'
import BindEmail from '@/views/my/components/bindEmail.vue'
import { useLoading } from '@/hooks/useLoading'
import { logout } from '@/services/login'
const { loadingToggle } = useLoading()
const { globalStore } = useStore()
const { onLogout } = useAccount()
const nicknameInput = ref()
const { accountStore } = useStore()
const userInfo = computed(() => accountStore.$state.userInfo)
const disableNikeName = ref(false) //输入框禁用
const nickname = ref(accountStore.$state.userInfo.nickname) //输入框绑定值
const bindCodePupup = ref(false)
const router = useRouter()
const bindEmailPupup = ref(false) //绑定邮箱弹窗
//上传用户头像
const afterRead = async (file) => {
  console.log('userInfo=>', userInfo)
  const resFile = await upload({ file: file.file })
  const resUser = await setDateUserInfo({ avatar: resFile.data })
  showToast('上传成功')
}
//修改用户信息
const setDateUserInfo = async (data) => {
  const res = await updateUserInfo(data)
  await accountStore.changeUserInfo()
  return showToast('修改成功')
}

const outLoading = ref(false)
const loginOut = async () => {
  outLoading.value = true
  const { success } = await logout()
  outLoading.value = false
  if (success) {
    onLogout()
  }
}
//修改用户名
const handleEditName = async () => {
  nicknameInput.value?.focus()
  disableNikeName.value = false
}
//失去焦点更新用户名
const handleBlurName = async () => {
  loadingToggle(true)
  const res = await setDateUserInfo({ nickname: nickname.value })
  nickname.value = accountStore.$state.userInfo.nickname
  disableNikeName.value = true
  loadingToggle(false)
}
const onClose = () => {
  bindCodePupup.value = false
}
const handleTo = () => {
  const password = accountStore.$state.userInfo.password
  if (!password) {
    router.push('/secure?type=add')
  } else {
    router.push('/secure?type=edit')
  }
}
</script>

<style scoped lang="less">
.my-card {
  border-radius: 8px;
  background: linear-gradient(180deg, #292d34 0%, rgba(0, 149, 255, 0.1) 100%);
}

.my {
  padding: 0 16px;
}

.copy-bg {
  background: rgba(27, 160, 255, 0.15);
  padding: 4px 20px;
  border-radius: 20px;
  color: #1ba0ff;
  font-size: 16px;
  font-weight: bold;
}
</style>
