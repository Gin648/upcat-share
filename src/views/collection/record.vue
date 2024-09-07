<template>
  <div class="pb-[20px]">
    <NavBar title="兑换记录"></NavBar>

    <VanList
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      loading-text="加载中"
      @load="onLoad"
      class="px-[16px]"
    >
      <RecordItem v-for="item in 10" :key="item" :order="item"> </RecordItem>
    </VanList>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import RecordItem from './components/RecordItem.vue'
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
</script>

<style scoped></style>
