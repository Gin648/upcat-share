<template>
  <!--没有加入社区组件-->
  <div class="friend-community-title flex items-center justify-between mb-[16px] mt-[16px]">
    <div>加入社区</div>
    <div class="flex">
      <img class="w-[20px] h-[20px] mr-1" src="@/assets/friend/refresh.png" alt="">
      <span class="text-[#1BA0FF]">换一换</span>
    </div>
  </div>
  <!--    社区明细-->
  <div class="friend-list">
    <div class="flex justify-between content-item mb-3 p-[9px]" v-for="(item,index) in 5" :key="index">
      <div class="flex">
        <img src="@/assets/friend/gift.svg" class="w-[34px] h-[34px]" alt="">
        <div class="flex flex-col ml-1.5">
          <div class="flex">
            <span class="text-[14px]">Binance CZ</span>
          </div>
          <div class="flex items-center">
            <img src="@/assets/friend/team.svg" class="w-[12px] h-[12px]" alt="">
            <span class="text-[12px] ml-1">2022-08-08</span>
          </div>
        </div>
      </div>
      <div class="flex items-center text-[#1BA0FF] text-[16px] mr-2.5">
        查看社区
      </div>
    </div>
  </div>
  <!--  社区底部按钮-->
  <div class="gift-button flex justify-center mt-10">
    <van-button class="shadow-btn-green w-[40%] mr-5 " type="primary" @click="clickButon('join')">
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/friend/join.png" alt="">
        <span>加入社区</span>
      </div>
    </van-button>
    <van-button class="shadow-btn-primary w-[40%]" type="primary" @click="clickButon('create')">
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/friend/create.png" alt="">
        <span>创建社区</span>
      </div>
    </van-button>
  </div>
  <!--  弹窗-->
  <van-popup v-model:show="popupCfg.show" round class="van-popup--transparent  w-[90vw]">
    <div class="px-[16px]">
      <div class="common-linear py-[24px] px-[20px]">
        <div class="text-[20px] text-center mb-[44px]">
          {{ popupCfg.type == 'join' ? '加入社区' : '创建社区' }}
        </div>
        <div class="field-grey mb-[44px]">
          <van-field placeholder="请输入社区名称" v-model="communityName"/>
        </div>
        <div class="w-100 text-center">
          <van-button class="shadow-btn-primary w-2/3" :class="{'shadow-btn-green': popupCfg.type == 'join'}"
                      type="primary"
                      @click="handelPopupButton('create')">
            <div class="flex items-center  gap-[8px]">
              <img src="@/assets/friend/create.png" alt="" v-if="popupCfg.type == 'create'">
              <img src="@/assets/friend/join.png" alt="" v-else></img>
              <span>{{ popupCfg.type == 'join' ? '加入社区' : '创建社区' }}</span>
            </div>
          </van-button>
        </div>
      </div>
    </div>

  </van-popup>
</template>
<script setup lang="ts">

import {ref} from "vue";
import {createTeamApi} from "@/services/friend";

const popupCfg = ref({
  type: '',
  show: false
})
const communityName = ref('') // 社区名称

// 点击加入社区
const handelPopupButton = async () => {
  const res = await createTeamApi({

  })
}
//点击按钮
const clickButon = (type: string) => {
  popupCfg.value = {
    type,
    show: true
  }
}
</script>

<style scoped lang="less">
.friend-list {
  .content-item {
    border-radius: 12px;
    background: linear-gradient(180deg, #4B4F55 0%, #232830 100%);
  }
}
</style>