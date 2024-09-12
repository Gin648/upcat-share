<template>
  <div class="pb-[20px]">
    <NavBar title="获奖记录"></NavBar>
    <div class="px-[16px]">
      <div class="flex gap-[11px]">
        <div class="flex-1 mt-[10px]">
          <ShadowBorderBox>
            <div class="flex h-[80px] flex-col items-center justify-center">
              <div class="big_number text-[28px] leading-[28px]">{{ starStatistics.numNUmber }}</div>
              <div class="text-[12px] mt-[9px]">累计投入星星</div>
            </div>
          </ShadowBorderBox>
        </div>
        <div class="flex-1 mt-[10px]">
          <ShadowBorderBox>
            <div class="flex h-[80px] flex-col items-center justify-center">
              <div class="big_number text-[28px] leading-[28px]">{{ starStatistics.totalAmount }}</div>
              <div class="text-[12px] mt-[9px]">累计获得</div>
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
            v-for="item in state.list"
            :key="item"
            :order="item"
            class="mt-[12px] common-linear py-[16px] px-[12px] flex items-center"
        >
          <div>
            <div class="text-[16px]">投入星星：{{ item.num}}</div>
            <div class="text-[12px] opacity-60 mt-[8px]">
              12:22:22 22/08/2024
            </div>
          </div>
          <div
              class="flex flex-col mr-[12px] items-center justify-center ml-auto"
          >
            <img class="w-[31px]" src="@/assets/png/Rat_Coin.png"/>
            <div class="text-[20px] text-[#E0B374] mt-[4px] font-semibold">
              +{{ item.receiveAmount}}
            </div>
          </div>
        </div>
      </VanList>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import NavBar from '@/components/NavBar/index.vue'
import ShadowBorderBox from '@/components/ShadowBorderBox/index.vue'
import {getLotteryPage, getLotteryStatistics} from "@/services/bigStar";

const state = reactive({
  active: 0,
  page: 0,
  size: 10,
  finished: false,
  list: [],
  loading: false,
  total: 0,
})
let starStatistics = reactive({
  numNUmber: 0,
  totalAmount: 0
})
onMounted(async () => {
  const res = await getLotteryStatistics()
  starStatistics.numNUmber = res.data.numNUmber
  starStatistics.totalAmount = res.data.totalAmount

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
  await getRecordList()
  state.loading = false
}
const getRecordList = async () => {
  const res = await getLotteryPage(state)
  state.list = res.data.list
  state.total = res.data.total
  state.finished = state.list.length >= state.total
}
</script>

<style scoped></style>
