<template>
  <div>
    <NavBar :leftArrow="false" title="我的仓库">
      <template v-slot:right>
        <div
          class="opacity-60 text-[14x]"
          @click="handleTo('/collection/record')"
        >
          兑换记录
        </div>
      </template>
    </NavBar>

    <div class="py-[20px]">
      <div class="flex items-center px-[16px]">
        <span class="text-[14px] mr-[18px]">总收藏额</span>
        <img src="@/assets/svg/Rat_Coin.svg" class="w-[20px] mr-[6px]" />
        <span class="text-[14px] text-[#E0B374]"> 7,654,321 </span>
        <div
          class="bg-[#292D34] rounded-[38px] px-[11px] py-[5px] ml-auto text-[12px]"
        >
          <span class="mr-[8px]">按时间排序</span>
          <van-icon name="arrow-down" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 px-[8px] gap-[5px] pb-[20px]">
      <div
        v-for="item in 30"
        @click="onSelect(item)"
        :key="item"
        class="h-[95px] bg-[#292D34] rounded-[14px] relative"
        :class="{ active: selectIds.includes(item) }"
      >
        <img
          v-if="selectIds.includes(item)"
          src="@/assets/svg/checked_round.svg"
          class="w-[27px] absolute right-[8px] bottom-[8px]"
        />
      </div>
    </div>

    <div class="upcat-bar" v-if="selectIds && selectIds.length > 0">
      <div class="flex items-center px-[20px] w-full">
        <div class="">
          <div class="text-[14px] opacity-60">
            <span class="mr-[4px]">已选</span>
            5/1246777
          </div>
          <div class="flex mt-[11px] items-center">
            <div
              class="w-[20px] h-[20px] mr-[8px] bg-[#D9D9D9] rounded-[4px]"
            ></div>
            <img src="@/assets/svg/Union.svg" class="w-[27px] mr-[2px]" />
            <span class="mr-[2px] text-[16px] font-semibold">1246777</span>
            <img src="@/assets/star/star.png" class="w-[18px] h-[18px]" />
          </div>
        </div>

        <div class="ml-auto">
          <van-button class="shadow-btn-primary" type="primary" block>
            <div class="text-[14px] flex items-center px-[16px]">
              <img src="@/assets/svg/decompose.svg" class="w-[24px] mr-[4px]" />
              分解
            </div>
          </van-button>
        </div>
      </div>
    </div>
    <router-view class="child-view"></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import NavBar from '@/components/NavBar/index.vue'
const router = useRouter()
const handleTo = (path) => {
  router.push(path)
}

const selectIds = ref([])

const onSelect = (val) => {
  let index = selectIds.value.indexOf(val)
  if (index !== -1) {
    selectIds.value.splice(index, 1)
  } else {
    selectIds.value = [...selectIds.value, val]
  }
}
</script>

<style scoped lang="less">
.active {
  border: 1px solid #0fbb29;
}

.upcat-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: content-box;
  width: 100%;
  height: 102px;
  background: #292d34;
}
</style>
