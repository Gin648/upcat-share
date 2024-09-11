<template>
  <div>
    <NavBar :leftArrow="false" title="我的仓库">
      <template v-slot:right>
        <div
          class="opacity-60 text-[14x]"
          @click="handleTo('/collection/record')"
        >
          分解记录
        </div>
      </template>
    </NavBar>

    <div class="py-[20px]">
      <div class="flex items-center px-[16px]">
        <span class="text-[14px] mr-[18px]">总收藏额</span>
        <img src="@/assets/svg/Cat_Coin.svg" class="w-[20px] mr-[6px]" />
        <span class="text-[14px] text-[#E0B374]">
          {{ buyStatistics || 0 }}
        </span>

        <div class="ml-auto">
          <van-popover
            theme="dark"
            v-model:show="showPopover"
            :actions="actions"
            @select="onSort"
          >
            <template #reference>
              <div
                class="bg-[#292D34] rounded-[38px] px-[11px] py-[5px] ml-auto text-[12px]"
              >
                <span class="mr-[8px]">{{
                  actions.find((t) => +t.value === +state.sortType).text
                }}</span>
                <van-icon name="arrow-down" />
              </div>
            </template>
          </van-popover>
        </div>
      </div>
    </div>

    <VanList
      v-model:loading="state.loading"
      :finished="state.finished"
      @load="onLoad"
    >
      <div class="grid grid-cols-4 px-[8px] gap-[5px] pb-[20px]">
        <div
          v-for="item in state.list"
          @click="onSelect(item)"
          :key="item.id"
          class="h-[95px] flex items-center bg-[#292D34] rounded-[14px] relative"
          :class="{ active: selectIds.includes(item) }"
        >
          <img :src="getSvg(item.url)" class="w-full" />
          <img
            v-if="selectIds.includes(item)"
            src="@/assets/svg/checked_round.svg"
            class="w-[27px] absolute right-[8px] bottom-[8px]"
          />
        </div>
      </div>
    </VanList>

    <div class="upcat-bar" v-if="selectIds && selectIds.length > 0">
      <div class="flex items-center px-[20px] w-full">
        <div class="">
          <div class="text-[14px] opacity-60 flex items-center">
            <van-checkbox
              v-model="isCheckAll"
              :indeterminate="isIndeterminate"
              @change="checkAllChange"
            ></van-checkbox>
            <span class="mx-[4px]">已选</span>
            {{ selectIds.length }}/{{ state.total }}
          </div>
          <div class="flex mt-[11px] items-center">
            <div class="text-[14px] mr-[2px]">分解获得</div>
            <span class="mr-[2px] text-[16px] font-semibold">{{
              lotteryNumTotal
            }}</span>
            <img src="@/assets/star/star.png" class="w-[18px] h-[18px]" />
          </div>
        </div>

        <div class="ml-auto pb-[3px] rounded-[4px] border-[1.5px] border-black">
          <van-button
            class="shadow-btn-primary"
            type="primary"
            :loading="loading"
            block
            @click="onExchange"
          >
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
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar/index.vue'
import {
  buyPageList,
  getBuyStatistics,
  bacteriaExchange,
} from '@/services/bigStar'
import { getSvg } from '@/utils/utils'

const state = reactive({
  page: 0,
  size: 999,
  finished: false,
  list: [],
  loading: false,
  total: 0,
  sortType: 0,
})

const showPopover = ref(false)
// 通过 actions 属性来定义菜单选项
const actions = computed(() => [
  { text: '按时间排序', value: 0 },
  { text: '按价格排序', value: 1 },
])
const onSort = (action) => {
  state.sortType = action.value
  selectIds.value = []
  isCheckAll.value = false
  isIndeterminate.value = true
  init()
}

const init = () => {
  state.page = 0
  state.total = 0
  state.finished = false
  state.list = []
  onLoad()
}
const bacteriaList = ['purple_medal.png', 'pink_medal.png', 'yellow_medal.png']
const getList = async () => {
  const resp = await buyPageList({
    page: state.page,
    size: state.size,
    sortType: state.sortType,
  })
  if (!resp.success) {
    state.finished = true
    return
  }

  if (!resp.data || !+resp.data.total) {
    state.finished = true
    return
  }

  resp.data.list = resp.data.list.map((t) => {
    return {
      ...t,
      url: `${bacteriaList[t.type - 1]}`,
    }
  })

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
  const checkedCount = selectIds.value.length
  isCheckAll.value = checkedCount === state.list.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < state.list.length
}

const isCheckAll = ref(false)
const isIndeterminate = ref(true)
const checkAllChange = (val: boolean) => {
  selectIds.value = val ? [...state.list] : []
  isIndeterminate.value = false
}

const buyStatistics = ref(null)
const _getUserLotteryInfo = async (val?: any) => {
  const { success, data } = await getBuyStatistics()
  if (success) {
    buyStatistics.value = data
  }
}

const lotteryNumTotal = computed(() => {
  if (selectIds.value && selectIds.value.length > 0) {
    return selectIds.value.reduce((total, item) => total + item.lotteryNum, 0)
  } else {
    return 0
  }
})
const loading = ref(false)
const onExchange = async () => {
  loading.value = true
  const ids = selectIds.value.map((t) => t.id)
  const { success } = await bacteriaExchange(ids)
  loading.value = false
  if (success) {
    reset()
  }
}

const reset = () => {
  selectIds.value = []
  isCheckAll.value = false
  isIndeterminate.value = true
  init()
  _getUserLotteryInfo()
}

onMounted(() => {
  _getUserLotteryInfo()
})
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
