<template>
  <!--  已经加入了社区-->
  <div class="friend-yes-community-card mt-2.5">
    <div class="flex ">
      <img src="@/assets/friend/gift.svg" class="w-[64px] h-[64px]" alt="">
      <div class="flex flex-col ml-2">
        <div class="flex mb-1.5">
          <span class="text-[18px] mr-2">社区名称</span>
          <div
              class=" text-[14px] text-[#FFD702] flex items-center border rounded-[8px] px-[10px] ml-1 border-[#FFD702]">
            LV3
          </div>
        </div>
        <div class="text-[12px]">
          <span>创建人: </span>
          <span>Binance CZ</span>
        </div>
      </div>
    </div>
    <div class="flex justify-around mt-6">
      <div class="px-[18px] py-[16px] bg-[#191A1C] rounded-2xl w-[31%] flex flex-col items-center ">
        <span class="text-[14px]">社区成员</span>
        <span class="text-[24px] font-bold">20</span>
      </div>
      <div class="px-[18px] py-[16px] bg-[#191A1C] rounded-2xl w-[31%] flex flex-col items-center ">
        <span>社区长</span>
        <div class="flex items-center mt-1">
          <img src="@/assets/friend/pentagram.png" class="w-[15px] h-[15px]" alt="">
          <span class="text-[16px] font-bold ml-1">100</span>
        </div>
      </div>
      <div class="px-[18px] py-[16px] bg-[#191A1C] rounded-2xl w-[31%] flex flex-col items-center ">
        <span>社区总量</span>
        <div class="flex items-center mt-1">
          <img src="@/assets/friend/pentagram.png" alt="" class="w-[15px] h-[15px]">
          <span class="text-[16px] font-bold ml-1">100</span>
        </div>
      </div>
    </div>
  </div>
  <!--  已加入社区按钮-->
  <div class="friend-yes-community-button flex justify-between mt-[16px] flex-wrap">
    <van-button class="shadow-btn-green w-[45%] mb-4 " type="primary">
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/friend/share.png" alt="">
        <span>邀请好友</span>
      </div>
    </van-button>
    <van-button class="shadow-btn-green w-[45%] mb-4 " type="primary">
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/friend/copy.png" alt="">
        <span>复制链接</span>
      </div>
    </van-button>
    <van-button class="shadow-btn-green w-[45%] mb-4 " type="primary">
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/friend/joinGroupChat.png" alt="">
        <span>加入群聊</span>
      </div>
    </van-button>
    <van-button class="shadow-btn-primary w-[45%] mb-4" type="primary">
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/friend/exitTheCommunity.png" alt="">
        <span>退出社区</span>
      </div>
    </van-button>
    <van-button class="shadow-btn-primary w-[45%] mb-4" type="primary">
      <div class="flex items-center gap-[8px]">
        <img src="@/assets/friend/dissolveTheCommunity.png" alt="">
        <span>解散社区</span>
      </div>
    </van-button>
  </div>
  <!--    社区成员-->
  <div class="friend-list">
    <div class="mt-[16px] mb-2.5 text-[12px]">
      <span>社区成员</span>
    </div>
    <div class="friend-list-content">
      <div class="flex justify-between content-item mb-3 p-[9px]" v-for="(item,index) in 5" :key="index">
        <div class="flex">
          <img src="@/assets/friend/gift.svg" class="w-[34px] h-[34px]" alt="">
          <div class="flex flex-col ml-1.5">
            <div class="flex">
              <span class="text-[14px]">Binance CZ</span>
              <span class="text-[12px] opacity-60 ml-1">(Level 3)</span>
            </div>
            <div class="text-[12px]">
              08/22 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>


<style scoped lang="less">
.friend-yes-community-card {
  border-radius: 8px;
  background: linear-gradient(180deg, #292D34 0%, rgba(0, 149, 255, 0.10) 100%);
  padding: 12px;
  //border: 1px solid #26B3F8;
}

.friend-list {
  .content-item {
    border-radius: 12px;
    background: linear-gradient(180deg, #4B4F55 0%, #232830 100%);
  }
}

</style>