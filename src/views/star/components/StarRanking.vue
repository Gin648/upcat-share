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
        v-for="item in state.list"
        :key="item.teamId"
        class="mt-[12px] common-linear py-[20px] px-[16px] flex items-center"
        @click="handleTo(`/teamInfo?id=${item.teamId}`)"
      >
        <img
          v-if="item.iconUrl"
          :src="item.iconUrl"
          class="w-[42px] mr-[10px] rounded-[10px] h-[42px] flex-shrink-0"
        />
        <div
          v-else
          class="w-[42px] mr-[10px] rounded-[10px] h-[42px] flex-shrink-0 bg-[#8F6B93] flex justify-center items-center"
        >
          <img src="@/assets/star/money.png" class="w-[30px]" />
        </div>

        <div class="flex flex-col justify-between">
          <div class="text-[16px] font-semibold line-clamp-1">
            {{ item.name }}
          </div>
          <div class="text-[12px] opacity-80">星星：{{ item.amount }}</div>
        </div>
        <div class="ml-auto text-[#1BA0FF] text-[16px] flex-shrink-0">
          查看社区
        </div>
      </div>
    </VanList>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getTeamPage } from '@/services/bigStar'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleTo = (path) => {
  router.push(path)
}
const state = reactive({
  page: 0,
  size: 10,
  finished: false,
  list: [],
  loading: false,
  total: 0,
})

const init = () => {
  state.page = 0
  state.total = 0
  state.finished = false
  state.list = []
  onLoad()
}

const getList = async () => {
  const resp = await getTeamPage({
    page: state.page,
    size: state.size,
  })
  if (!resp.success) {
    state.finished = true
    return
  }

  if (!resp.data || !+resp.data.total) {
    state.finished = true
    return
  }
  console.log(resp, 'resp')
  state.loading = false

  state.total = resp.data.total
  state.list =
    state.page === 1 ? resp.data.list : state.list.concat(resp.data.list)
  // 数据全部加载完成
  if (state.list.length >= state.total) {
    state.finished = true
  }
}

const onLoad = async () => {
  try {
    state.loading = true
    state.page += 1
    await getList()
  } catch (error) {
    state.finished = true
  } finally {
    state.loading = false
  }
}
</script>

<style scoped></style>
