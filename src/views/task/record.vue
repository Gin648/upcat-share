<template>
  <div class="pb-[20px]">
    <NavBar :title="t('ren-wu-ji-lu')"></NavBar>
    <div class="px-[16px]">
      <div class="flex gap-[11px]">
        <div class="flex-1">
          <ShadowBorderBox>
            <div class="flex h-[80px] flex-col items-center justify-center">
              <div class="big_number text-[28px] leading-[28px]">
                {{ formatNumberUnit(taskInfo.ratAmount) }}
              </div>
              <div class="text-[12px] flex items-center mt-[9px] text-center">
                <img
                  src="@/assets/png/Rat_Coin.png"
                  class="w-[14px] mr-[2px]"
                />
                {{ t('lei-ji-huo-de') }}
              </div>
            </div>
          </ShadowBorderBox>
        </div>
        <div class="flex-1">
          <ShadowBorderBox>
            <div class="flex h-[80px] flex-col items-center justify-center">
              <div class="big_number text-[28px] leading-[28px]">
                {{ formatNumberUnit(taskInfo.catAmount) }}
              </div>
              <div class="text-[12px] mt-[9px] flex items-center text-center">
                <img
                  src="@/assets/png/Cat_Coin.png"
                  class="w-[14px] mr-[2px]"
                />
                {{ t('lei-ji-huo-de') }}
              </div>
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
          <img
            :src="item.icon"
            class="w-[56px] mr-[12px] shrink-0 h-[56px] rounded-[8px]"
          />
          <div>
            <div class="text-[14px]">{{ item.name }}</div>
            <div class="text-[12px] opacity-60 mt-[8px]">
              {{ item.createTime }}
            </div>
          </div>
          <div
            class="flex flex-col mr-[12px] items-center justify-center ml-auto"
          >
            <img class="w-[31px]" src="@/assets/png/Rat_Coin.png" />
            <div
              v-if="item.ratAmount"
              class="text-[20px] text-[#E0B374] mt-[4px] font-semibold"
            >
              +{{ formatNumberUnit(item.ratAmount) }}
            </div>
          </div>
          <div
            v-if="item.catAmount"
            class="flex flex-col mr-[12px] items-center justify-center ml-auto"
          >
            <img class="w-[31px]" src="@/assets/png/Cat_Coin.png" />
            <div class="text-[20px] text-[#E0B374] mt-[4px] font-semibold">
              +{{ formatNumberUnit(item.catAmount) }}
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
import { taskTatistics, userTaskListPage } from '@/services/task'
import { formatNumberUnit } from '@/utils/utils'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const taskInfo = ref<any>({})

const _taskTatistics = async () => {
  const { success, data } = await taskTatistics()
  if (success) {
    taskInfo.value = data
  }
}

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

const getList = async () => {
  const resp: any = await userTaskListPage({
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
onMounted(() => {
  _taskTatistics()
})
</script>

<style scoped></style>
