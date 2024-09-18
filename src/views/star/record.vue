<template>
  <div class="pb-[20px]">
    <NavBar :title="t('huo-jiang-ji-lu')"></NavBar>
    <div class="px-[16px]">
      <div class="flex gap-[11px]">
        <div class="flex-1 mt-[10px]">
          <ShadowBorderBox>
            <div class="flex h-[80px] flex-col items-center justify-center">
              <div class="big_number text-[28px] leading-[28px]">
                {{ formatBalance(starStatistics.numNUmber, 0) }}
              </div>
              <div class="text-[12px] mt-[9px]">
                {{ t('lei-ji-tou-ru-xing-xing') }}
              </div>
            </div>
          </ShadowBorderBox>
        </div>
        <div class="flex-1 mt-[10px]">
          <ShadowBorderBox>
            <div class="flex h-[80px] flex-col items-center justify-center">
              <div class="big_number text-[28px] leading-[28px]">
                {{ formatBalance(starStatistics.totalAmount, 0) }}
              </div>
              <div class="text-[12px] mt-[9px]">{{ t('lei-ji-huo-de') }}</div>
            </div>
          </ShadowBorderBox>
        </div>
      </div>

      <VanList
        v-model:loading="state.loading"
        :finished="state.finished"
        :finished-text="t('mei-you-geng-duo-le')"
        :loading-text="t('jia-zai-zhong')"
        @load="onLoad"
      >
        <div
          v-for="item in state.list"
          :key="item"
          :order="item"
          class="mt-[12px] common-linear py-[16px] px-[12px] flex items-center"
        >
          <div>
            <div class="text-[16px]">
              {{ t('tou-ru-xing-xing') }}：{{ item.num }}
            </div>
            <div class="text-[12px] opacity-60 mt-[8px]">
              {{ item.updateTime }}
            </div>
          </div>
          <div
            class="flex flex-col mr-[12px] items-center justify-center ml-auto"
          >
            <img class="w-[31px]" src="@/assets/png/Cat_Coin.png" />
            <div class="text-[20px] text-[#E0B374] mt-[4px] font-semibold">
              {{ formatBalance(item.receiveAmount, 0) }}
            </div>
          </div>
        </div>
      </VanList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import NavBar from '@/components/NavBar/index.vue'
import ShadowBorderBox from '@/components/ShadowBorderBox/index.vue'
import { getLotteryPage, getLotteryStatistics } from '@/services/bigStar'
import { formatBalance } from '@/utils/utils'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
  totalAmount: 0,
})
onMounted(async () => {
  const res: any = await getLotteryStatistics()
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

const getList = async () => {
  const resp: any = await getLotteryPage({
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
