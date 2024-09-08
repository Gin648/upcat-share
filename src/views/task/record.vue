<template>
  <div class="pb-[20px]">
    <NavBar title="任务记录"></NavBar>
    <div class="px-[16px]">
      <div class="flex gap-[11px]">
        <div class="flex-1">
          <ShadowBorderBox>
            <div class="flex h-[80px] flex-col items-center justify-center">
              <div class="big_number text-[28px] leading-[28px]">10M</div>
              <div class="text-[12px] mt-[9px]">累计获得IBO</div>
            </div>
          </ShadowBorderBox>
        </div>
        <div class="flex-1">
          <ShadowBorderBox>
            <div class="flex h-[80px] flex-col items-center justify-center">
              <div class="big_number text-[28px] leading-[28px]">10000</div>
              <div class="text-[12px] mt-[9px]">累计获得学习币</div>
            </div>
          </ShadowBorderBox>
        </div>
      </div>

      <VanList
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        loading-text="加载中"
        @load="onLoad"
      >
        <div
          v-for="item in 10"
          :key="item"
          :order="item"
          class="mt-[12px] common-linear py-[16px] px-[12px] flex items-center"
        >
          <div
            class="w-[56px] mr-[12px] shrink-0 h-[56px] bg-[#A8A8A8] rounded-[8px]"
          ></div>
          <div>
            <div class="text-[14px]">点击打开TOM UP的推特主页</div>
            <div class="text-[12px] opacity-60 mt-[8px]">
              12:22:22 22/08/2024
            </div>
          </div>
          <div
            class="flex flex-col mr-[12px] items-center justify-center ml-auto"
          >
            <img class="w-[31px]" src="@/assets/svg/Rat_Coin.svg" />
            <div class="text-[20px] text-[#E0B374] mt-[4px] font-semibold">
              +100
            </div>
          </div>
        </div>
      </VanList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import NavBar from '@/components/NavBar/index.vue'
import ShadowBorderBox from '@/components/ShadowBorderBox/index.vue'
const state = reactive({
  active: 0,
  page: 0,
  size: 10,
  finished: false,
  list: [],
  loading: false,
  total: 0,
  sortType: 1,
})

const init = () => {
  state.page = 0
  state.total = 0
  state.finished = false
  state.list = []
  onLoad()
}

const onLoad = async () => {
  state.loading = true
  state.page += 1
  // await getRecordList()
  state.loading = false
}
</script>

<style scoped></style>
