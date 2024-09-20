<template>
  <div class="pb-[20px]">
    <NavBar :title="t('ren-wu')"> </NavBar>
    <div class="px-[16px]">
      <div class="flex items-center py-[16px]">
        <div class="text-[16px] font-semibold">{{ t('ri-chang-ren-wu') }}</div>
        <!-- <div class="ml-auto record-box" @click="handleTo('/task/record')">
          {{ t('ren-wu-ji-lu') }}
          <van-icon name="arrow" />
        </div> -->
      </div>

      <div
        @click="onPageTo(item)"
        class="common-linear mb-[12px] p-[10px] flex items-center"
        v-for="item in taskList"
        :key="item.id"
      >
        <img
          :src="item.icon"
          class="w-[56px] mr-[12px] shrink-0 h-[56px] rounded-[8px]"
        />
        <div class="flex flex-col gap-[8px] mr-[20px]">
          <div class="text-[14px]">{{ item.name }}</div>

          <div class="flex items-center gap-[8px]">
            <div
              v-if="item.ratAmount"
              class="flex bg-[#E0B374]/20 w-fit items-center rounded-full"
            >
              <img src="@/assets/png/Rat_Coin.png" class="w-[24px] mr-[3px]" />
              <span class="mr-[7px] text-[14px] text-[#E0B374] font-semibold">
                +{{ formatNumberUnit(item.ratAmount) }}</span
              >
            </div>
            <div
              v-if="item.catAmount"
              class="flex bg-[#E0B374]/20 w-fit items-center rounded-full"
            >
              <img src="@/assets/png/Cat_Coin.png" class="w-[24px] mr-[3px]" />
              <span class="mr-[7px] text-[14px] text-[#E0B374] font-semibold">
                +{{ item.catAmount }}</span
              >
            </div>
          </div>
        </div>

        <img
          v-if="item.taskStatus === 0"
          class="ml-auto w-[17px]"
          src="@/assets/svg/arrow.svg"
        />

        <div
          @click="onReceiveSStudyStTask(item)"
          v-else-if="item.taskStatus === 2"
          class="pb-[3px] ml-auto rounded-[4px] border-[1.5px] border-black"
        >
          <van-button
            :loading="item.loading"
            block
            size="mini"
            class="shadow-btn-primary"
            type="primary"
          >
            <div class="text-[12px] px-[6px] py-[2px]">{{ t('ling-qu') }}</div>
          </van-button>
        </div>
        <img
          v-else-if="item.taskStatus === 1"
          class="ml-auto w-[32px]"
          src="@/assets/svg/tick.svg"
        />
      </div>
    </div>
    <router-view class="child-view"></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar/index.vue'
import { addTask, receiveSStudyStTask, taskListPage } from '@/services/task'
import { formatNumberUnit, openLinkHandle } from '@/utils/utils'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const taskList = ref([])
const getList = async () => {
  const { success, data }: any = await taskListPage({ page: 1, size: 999 })
  if (success) {
    taskList.value = data.list.map((t) => {
      return {
        ...t,
        loading: false,
      }
    })
  }
}

const router = useRouter()
const handleTo = (path) => {
  router.push(path)
}

const onPageTo = (item) => {
  if (item.taskStatus !== 0) return
  if (item.type === 2) {
    openLinkHandle(item.link)
    onAddTask(item)
  } else if (item.type === 1) {
    handleTo('/friend')
  }
}

const onAddTask = async (item) => {
  const { success } = await addTask(item.id)
  if (success) {
    getList()
  }
}

const onReceiveSStudyStTask = async (item) => {
  item.loading = true
  const { success } = await receiveSStudyStTask({
    taskLogId: item.taskLogId,
  })
  item.loading = false
  if (success) {
    showToast(t('ling-qu-cheng-gong'))
    item.taskStatus = 1
  }
}

onMounted(() => {
  getList()
})
</script>

<style scoped></style>
