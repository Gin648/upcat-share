<template>
  <!--社区详情-->
  <nav-bar title="查看小队"></nav-bar>

  <div class="px-[16px]">
    <!--  已经加入了社区-->
    <div class="friend-yes-community-card mt-2.5">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
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
        <van-button class="shadow-btn-primary " size="mini" type="primary" @click="confirmPupop=true">
          <div class="flex items-center gap-[4px]">
            <img src="@/assets/friend/join.png" class="w-[16px] h-[16px]" alt="">
            <span>加入社区</span>
          </div>
        </van-button>
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
    <div class="mt-[16px] flex justify-between bg-[#292D34] py-[13px] px-[20px] rounded-[20px]">
      <span>加入群聊</span>
      <img src="@/assets/friend/rightArrow.svg" alt=""/>
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
  </div>

  <van-popup
      v-model:show="confirmPupop"
      class="van-popup--transparent max-w-[100vw] w-[100vw]"
      @close="confirmPupop = false"
  >
    <div class="px-[16px] pt-[24px]">
      <div class="common-linear py-[32px] px-[20px] relative">
        <div class="text-[20px] font-bold mb-[20px] text-center">确定加入“社区名称”？</div>
        <div class="text-[16px] mb-[20px] text-center">
          加入后 <span class="text-[#FF2B00]">56:33</span> 内不得变更小队
        </div>
        <div class="w-[100%] flex justify-around">
          <van-button class="shadow-btn-grey w-[30%] mr-5 " type="primary" @click="confirmPupop = false">
            <div class="flex items-center gap-[8px]">
              <span class="text-[18px]">再想想</span>
            </div>
          </van-button>
          <van-button class="shadow-btn-primary w-[60%]" type="primary" @click="handleConfrim">
            <div class="flex items-center gap-[8px]">
              <span class="text-[18px]">确认</span>
            </div>
          </van-button>
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter()
const confirmPupop = ref(false)
const query = router.currentRoute.value.query //地址栏参数ID
const handleConfrim = () => {

}
</script>


<style scoped lang="less">
.friend-list {
  .content-item {
    border-radius: 12px;
    background: linear-gradient(180deg, #4B4F55 0%, #232830 100%);
  }
}

.friend-yes-community-card {
  border-radius: 8px;
  background: linear-gradient(180deg, #292D34 0%, rgba(0, 149, 255, 0.10) 100%);
  padding: 12px;
  //border: 1px solid #26B3F8;
}
</style>