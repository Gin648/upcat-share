<template>
  <!--  个人详情-->
  <nav-bar title="个人详情"></nav-bar>
  <div class="my relative w-[100%] box-border">
    <div class="my-card mt-2.5 p-[20px]">
      <div class="flex items-center">
        <div class="w-[88px] h-[88px]">
          <van-uploader :after-read="afterRead">
            <img :src="userInfo.avatar || getImage('friend/gift.png')" class="rounded-[100%] " alt="">
          </van-uploader>
        </div>
        <div class="flex flex-col ml-6 flex-1">
          <div class="flex mb-1.5">
            <div class="field-transparent  w-[80%] mr-2">
              <van-field placeholder="无名氏" :disabled="disableNikeName" v-model="nickname" @blur="handleBlurName"/>
            </div>
            <img src="@/assets/my/edit.svg" alt="" @click="handleEditName">
          </div>
          <div class="text-[12px] flex items-center">
            <span>ID: </span>
            <span>{{ userInfo.id }}</span>
            <img src="@/assets/my/copy.svg" @click="handleCopy(userInfo.id)" class="ml-2" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-[10px] items-center common-linear pt-[10px] pb-[22px] px-[20px]">
      <div class="flex flex-col">
        <span class="opacity-80 text-[12px]">我的邀请码</span>
        <span class="mt-[10px] text-[20px] font-bold">{{ userInfo.invitationCode }}</span>
      </div>
      <div class="copy-bg" @click="handleCopy(userInfo.invitationCode)">复制</div>
    </div>
    <div class="flex justify-between mt-[10px] items-center common-linear  py-[22px] px-[20px]">
      <div class="text-[16px]">
        绑定推荐人
      </div>
      <div class="flex items-center" v-if="userInfo.pid1==0" @click="bindCodePupup=true">
        <span class="opacity-80 text-[12px] mr-1">去绑定</span>
        <img src="@/assets/my/downArrow.svg" alt="">
      </div>
      <div class="flex items-center" v-else>
        <span class="opacity-80 text-[12px] mr-1">已绑定</span>
      </div>
    </div>
    <div class="flex justify-between mt-[10px] items-center common-linear  py-[22px] px-[20px]" v-if="!userInfo.email">
      <div class="text-[16px]">
        绑定邮箱
      </div>
      <div class="flex items-center">
        <span class="opacity-80 text-[12px] mr-1">去绑定</span>
        <img src="@/assets/my/downArrow.svg" alt="">
      </div>
    </div>
    <div class="flex justify-between mt-[10px] items-center common-linear  py-[22px] px-[20px]"
         @click="handleTo('/my/secure')">
      <div class="text-[16px]">
        安全密码
      </div>
      <div class="flex items-center">
        <img src="@/assets/my/downArrow.svg" alt="">
      </div>
    </div>
  </div>
  <!--    退出登录-->
  <div class="my-button fixed text-center bottom-[50px] w-[100%]">
    <van-button class="shadow-btn-grey w-[90%]" type="primary" @click="loginOut">
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/my/logOutAndLogIn.png" alt="">
        <span>退出登录</span>
      </div>
    </van-button>
  </div>
  <!--绑定邀请码-->
  <van-popup
      v-model:show="bindCodePupup"
      class="van-popup--transparent max-w-[100vw] w-[100vw]"
      @close="onClose"
  >
    <bind-code @close="onClose" :updateUserInfo="setDateUserInfo"></bind-code>
  </van-popup>
</template>
<script setup lang="ts">

import useStore from "@/store";
import {getImage, handleCopy} from "@/utils/utils";
import {updateUserInfo, upload} from "@/services/user";
import {useAccount} from '@/hooks/useAccount'
import {showToast} from "vant";
import {computed, ref} from "vue";
import BindCode from "@/views/my/components/bindCode.vue";
import {useRouter} from "vue-router";

const {onLogout} = useAccount()

const {accountStore} = useStore()
const userInfo = computed(() => accountStore.$state.userInfo)
const disableNikeName = ref(true) //输入框禁用
const nickname = ref(accountStore.$state.userInfo.nickname)//输入框绑定值
const bindCodePupup = ref(false)
const router = useRouter()

//上传用户头像
const afterRead = async (file) => {
  console.log("userInfo=>", userInfo)
  const resFile = await upload({file: file.file})
  const resUser = await setDateUserInfo({avatar: resFile.data})
  showToast('上传成功')

};
//修改用户信息
const setDateUserInfo = async (data) => {
  const res = await updateUserInfo(data)
  await accountStore.changeUserInfo()
  console.log("res=>", res)
};
const loginOut = () => {
  onLogout()
}
//修改用户名
const handleEditName = async () => {
  disableNikeName.value = false

}
//失去焦点更新用户名
const handleBlurName = async () => {
  const res = await setDateUserInfo({nickname: nickname.value})
  nickname.value = accountStore.$state.userInfo.nickname
  disableNikeName.value = true
}
const onClose = () => {
  bindCodePupup.value = false
}
const handleTo = (path) => {
  router.push(path)
}

</script>


<style scoped lang="less">
.my-card {
  border-radius: 8px;
  background: linear-gradient(180deg, #292D34 0%, rgba(0, 149, 255, 0.10) 100%);
}

.my {
  padding: 0 16px;

}

.copy-bg {
  background: rgba(27, 160, 255, 0.15);
  padding: 4px 20px;
  border-radius: 20px;
  color: #1BA0FF;
  font-size: 16px;
  font-weight: bold;
}


</style>