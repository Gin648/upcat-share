<template>
  <div class="px-[16px] pb-[16px]">
    <nav-bar title="人员管理"> </nav-bar>

    <div
      class="py-[16px] bg-black flex items-center gap-[10px] sticky top-[46px]"
    >
      <div class="field-grey">
        <van-field
          placeholder="请输入用户名"
          v-model="state.search"
          clearable
          right-icon="search"
          @clickRightIcon="onSearch"
        />
      </div>

      <div
        class="w-[38px] flex-shrink-0 h-[38px] flex justify-center items-center bg-white/20 rounded-[12px]"
        @click="setShowFilter(true)"
      >
        <img src="@/assets/svg/filter.svg" class="w-[20px]" />
      </div>
    </div>
    <CommonPop
      :name="t('shai-xuan')"
      :show="showFilter"
      onBtn
      @close="setShowFilter(false)"
    >
      <div class="text-[16px] flex flex-col gap-[16px]">
        <div
          v-for="item in filterList"
          :key="item.value"
          class="font-semibold border border-solid flex items-center border-white/20 rounded-[12px] px-[16px] py-[12px]"
        >
          <span> {{ item.text }}</span>
          <span class="ml-auto text-[#2C84FF]"
            ><van-icon name="success" size="24px"
          /></span>
        </div>
      </div>
    </CommonPop>
    <VanList
      v-model:loading="state.loading"
      :finished="state.finished"
      :finished-text="t('mei-you-geng-duo-le')"
      :loading-text="t('jia-zai-zhong')"
      @load="onLoad"
    >
      <Item v-for="item in 10" :key="item"> </Item>
    </VanList>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref, reactive } from 'vue'
const { t } = useI18n()
import { useToggle } from '@vueuse/core'
import CommonPop from '@/components/CommonPop/index.vue'
import Item from './components/Item.vue'
const [showFilter, setShowFilter] = useToggle(false)

const onSearch = () => {
  console.log(state.search)
}

const filterList = computed(() => [
  {
    text: '总数量',
    value: 1,
  },
  {
    text: '今日注册',
    value: 2,
  },
  {
    text: '今日活跃',
    value: 3,
  },
  {
    text: '注册时间',
    value: 4,
  },
])

const state = reactive({
  page: 0,
  size: 10,
  finished: false,
  list: [],
  loading: false,
  total: 0,
  search: '',
})

const init = () => {
  state.page = 0
  state.total = 0
  state.finished = false
  state.list = []
  onLoad()
}

// const getList = async () => {
//   const resp: any = await userTaskListPage({
//     page: state.page,
//     size: state.size,
//   })
//   if (!resp.success) {
//     state.finished = true
//     return
//   }

//   if (!resp.data || !+resp.data.total) {
//     state.finished = true
//     return
//   }
//   state.loading = false
//   state.total = resp.data.total
//   state.list =
//     state.page === 1 ? resp.data.list : state.list.concat(resp.data.list)
//   // 数据全部加载完成
//   if (state.list.length >= state.total) {
//     state.finished = true
//   }
// }

const onLoad = async () => {
  try {
    state.loading = true
    state.page += 1
    // await getList()
  } catch (error) {
    state.finished = true
  } finally {
    state.loading = false
  }
}
</script>

<style scoped lang="less"></style>
