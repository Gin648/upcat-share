<template>
  <div class="pb-[20px]">
    <NavBar title="任务"> </NavBar>
    <div class="px-[16px]">
      <div class="flex items-center py-[16px]">
        <div class="text-[16px] font-semibold">日常任务</div>
        <div class="ml-auto record-box" @click="handleTo('/task/record')">
          任务记录
          <van-icon name="arrow" />
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
          class="common-linear mb-[12px] p-[10px] flex items-center"
          v-for="item in 10"
          :key="item"
        >
          <div
            class="w-[56px] mr-[12px] shrink-0 h-[56px] bg-[#A8A8A8] rounded-[8px]"
          ></div>
          <div class="flex flex-col gap-[8px] mr-[20px]">
            <div class="text-[14px]">点击打开指定的TOM UP推文</div>
            <div class="flex bg-[#E0B374]/20 w-fit items-center rounded-full">
              <img src="@/assets/svg/Rat_Coin.svg" class="w-[24px] mr-[3px]" />
              <span class="mr-[7px] text-[14px] text-[#E0B374] font-semibold">
                +$10</span
              >
            </div>
          </div>

          <div
            class="pb-[3px] ml-auto  rounded-[4px] border-[1.5px] border-black"
          >
            <van-button
            block
              size="mini"
              class="shadow-btn-primary"
              type="primary"
            >
              <div class="text-[12px] px-[6px] py-[2px]">领取</div>
            </van-button>
          </div>
          <!-- <img class="ml-auto w-[32px]" src="@/assets/svg/tick.svg" /> -->
        </div>
      </VanList>
    </div>
    <router-view class="child-view"></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar/index.vue'
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

const router = useRouter()
const handleTo = (path) => {
  router.push(path)
}
</script>

<style scoped></style>
