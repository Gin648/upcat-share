<template>
  <div class="mt-[24px]">
    <div>今日星星排名</div>
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
        class="mt-[12px] common-linear py-[20px] px-[16px] flex items-center"
      >
        <div
          class="w-[42px] mr-[10px] rounded-[10px] h-[42px] bg-[#8F6B93] flex justify-center items-center"
        >
          <img src="@/assets/star/money.png" class="w-[30px]" />
        </div>

        <div class="flex flex-col justify-between">
          <div class="text-[16px] font-semibold">Binance CZ</div>
          <div class="text-[12px] opacity-80">星星：2,345,666</div>
        </div>
        <div class="ml-auto text-[#1BA0FF] text-[16px]">查看社区</div>
      </div>
    </VanList>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
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
