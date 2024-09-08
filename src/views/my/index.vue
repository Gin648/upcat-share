<template>
  <!--  个人详情-->
  <nav-bar title="个人详情"></nav-bar>
  <div class="my">
    <div class="my-card mt-2.5 p-[20px]">
      <div class="flex items-center">
        <img :src="userInfo.avatar || getImage('friend/gift.png')" class="rounded-[100%] w-[64px] h-[64px]" alt="">
        <div class="flex flex-col ml-6">
          <div class="flex mb-1.5">
            <span class="text-[24px] font-bold mr-2">{{ userInfo.nickname || '无名氏' }}</span>
            <img src="@/assets/my/edit.svg" alt="">
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
      <div class="flex items-center">
        <span class="opacity-80 text-[12px] mr-1">去绑定</span>
        <img src="@/assets/my/downArrow.svg" alt="">
      </div>
    </div>
    <div class="flex justify-between mt-[10px] items-center common-linear  py-[22px] px-[20px]">
      <div class="text-[16px]">
        绑定邮箱
      </div>
      <div class="flex items-center" v-if="!userInfo.email">
        <span class="opacity-80 text-[12px] mr-1">去绑定</span>
        <img src="@/assets/my/downArrow.svg" alt="">
      </div>
      <div class="opacity-80 text-[12px]" v-else>
        {{ userInfo.email }}
      </div>
    </div>
    <div class="flex justify-between mt-[10px] items-center common-linear  py-[22px] px-[20px]">
      <div class="text-[16px]">
        安全密码
      </div>
      <div class="flex items-center">
        <img src="@/assets/my/downArrow.svg" alt="">
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">

import useStore from "@/store";
import {getImage, handleCopy} from "@/utils/utils";

const {accountStore} = useStore()
const {userInfo} = accountStore.$state
console.log("userInfo=>", userInfo)

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