<template>
  <div class="pb-[20px]">
    <NavBar :title="t('fen-jie-ji-lu')"></NavBar>

    <VanList
      v-model:loading="state.loading"
      :finished="state.finished"
      :finished-text="t('mei-you-geng-duo-le')"
      :loading-text="t('jia-zai-zhong')"
      @load="onLoad"
      class="px-[16px]"
    >
      <RecordItem v-for="item in state.list" :key="item.id" :data="item">
      </RecordItem>
    </VanList>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import RecordItem from './components/RecordItem.vue'
import NavBar from '@/components/NavBar/index.vue'
import { exchangePageList } from '@/services/bigStar'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
  const resp: any = await exchangePageList({
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
