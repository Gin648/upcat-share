<template>
  <div class="w-full">
    <!--  个人详情-->
    <nav-bar :title="t('ge-ren-xiang-qing')"></nav-bar>
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
            <div class="flex mb-1.5 items-center">
              <div class="field-transparent w-[80%] mr-2">
                <van-field
                  ref="nicknameInput"
                  placeholder="Tom"
                  v-model="nickname"
                  :enterkeyhint="t('wan-cheng')"
                  @blur="handleBlurName"
                  @keyup.enter="handleBlurName"
                />
              </div>
              <img src="@/assets/my/edit.svg" />
            </div>
            <div class="text-[12px] flex items-center">
              <span>ID: </span>
              <span>{{ userInfo.id }}</span>
              <div @click="handleCopy(userInfo.id)">
                <img src="@/assets/my/copy.svg" class="ml-2" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex justify-between mt-[10px] items-center common-linear pt-[10px] pb-[22px] px-[20px]"
      >
        <div class="flex flex-col">
          <span class="opacity-80 text-[12px]">{{
            t('wo-de-yao-qing-ma')
          }}</span>
          <span class="mt-[10px] text-[20px] font-bold">{{
            userInfo.invitationCode
          }}</span>
        </div>
        <div class="copy-bg" @click="handleCopy(userInfo.invitationCode)">
          {{ t('fu-zhi') }}
        </div>
      </div>
      <div
        class="flex justify-between mt-[10px] items-center common-linear py-[22px] px-[20px]"
      >
        <div class="text-[16px]">{{ t('bang-ding-tui-jian-ren') }}</div>
        <div
          class="flex items-center"
          v-if="userInfo.pid1 == 0"
          @click="bindCodePupup = true"
        >
          <span class="opacity-80 text-[12px] mr-1">{{
            t('qu-bang-ding')
          }}</span>
          <img src="@/assets/my/downArrow.svg" alt="" />
        </div>
        <div class="flex items-center" v-else>
          <span class="opacity-80 text-[12px] mr-1">{{
            t('yi-bang-ding')
          }}</span>
        </div>
      </div>
      <div
        class="flex justify-between mt-[10px] items-center common-linear py-[22px] px-[20px]"
        @click="
          prodEnvAssert()
            ? showToast('coming soon')
            : userInfo.email
            ? ''
            : (bindEmailPupup = true)
        "
      >
        <div class="text-[16px]">{{ t('bang-ding-you-xiang') }}</div>
        <div class="flex items-center" v-if="!userInfo.email">
          <span class="opacity-80 text-[12px] mr-1">{{
            t('qu-bang-ding')
          }}</span>
          <img src="@/assets/my/downArrow.svg" alt="" />
        </div>
        <div class="flex items-center" v-else>
          <span class="opacity-80 text-[12px] mr-1">{{ userInfo.email }}</span>
        </div>
      </div>
      <div
        class="flex justify-between mt-[10px] items-center common-linear py-[22px] px-[20px]"
        @click="prodEnvAssert() ? showToast('coming soon') : handleTo"
      >
        <div class="text-[16px]">{{ t('an-quan-mi-ma') }}</div>
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
          <span>{{ t('tui-chu-deng-lu') }}</span>
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
      @open="onOpenEmail"
    >
      <bind-email
        ref="bindEmailRef"
        @close="bindEmailPupup = false"
      ></bind-email>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import useStore from '@/store'
import { getImage, handleCopy, prodEnvAssert } from '@/utils/utils'
import { updateUserInfo, upload } from '@/services/user'
import { useAccount } from '@/hooks/useAccount'
import { showToast } from 'vant'
import { computed, nextTick, ref } from 'vue'
import BindCode from '@/views/my/components/bindCode.vue'
import { useRouter } from 'vue-router'
import BindEmail from '@/views/my/components/bindEmail.vue'
import { useLoading } from '@/hooks/useLoading'
import { logout } from '@/services/login'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { loadingToggle } = useLoading()
const { globalStore } = useStore()
const { onLogout } = useAccount()
const nicknameInput = ref(null)
const { accountStore } = useStore()
const userInfo = computed(() => accountStore.$state.userInfo)
const disableNikeName = ref(true) //输入框禁用
const nickname = ref(accountStore.$state.userInfo.nickname) //输入框绑定值
const bindCodePupup = ref(false)
const router = useRouter()
const bindEmailPupup = ref(false) //绑定邮箱弹窗
//上传用户头像
const afterRead = async (file) => {
  console.log('userInfo=>', userInfo)
  const resFile = await upload({ file: file.file })
  const resUser = await setDateUserInfo({ avatar: resFile.data })
  showToast(t('shang-chuan-cheng-gong'))
}
//修改用户信息
const setDateUserInfo = async (data) => {
  const res = await updateUserInfo(data)
  if (res.success) {
    await accountStore.changeUserInfo()
    return showToast(t('xiu-gai-cheng-gong'))
  }
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
// const focus = ref(false)
// const handleEditName = async () => {
//   if (loading.value) return
//   if (focus.value) {
//     handleBlurName()
//     return
//   }
//   focus.value = true
//   disableNikeName.value = false
//   setTimeout(() => {
//     nicknameInput.value?.focus()
//   }, 100)
// }
//失去焦点更新用户名
const loading = ref(false)
const handleBlurName = async () => {
  if (loading.value) return
  loading.value = true
  loadingToggle(true)
  const res = await setDateUserInfo({ nickname: nickname.value })
  loading.value = false
  nickname.value = accountStore.$state.userInfo.nickname
  disableNikeName.value = true
  loadingToggle(false)
  nicknameInput.value?.blur()
  // focus.value = false
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
const bindEmailRef = ref()
const onOpenEmail = () => {
  bindEmailRef.value?.init()
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
