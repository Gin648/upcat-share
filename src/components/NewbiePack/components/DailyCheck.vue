<template>
  <div class="px-[16px]">
    <div class="common-linear py-[18px] px-[12px]">
      <div class="text-[16px]">
        已连续签到
        <span
          class="text-[#FFD702] text-[24px] font-semibold ml-[7px] mr-[17px]"
          >{{ userSignInfo.day }}</span
        >
        天
      </div>
      <div class="text-[12px] opacity-60 mt-[4px]">
        连续签到{{ userSignInfo.totalDay }}天，获得奖励
      </div>

      <div class="flex items-center justify-between w-full mt-[16px] gap-[4px]">
        <div
          class="rounded-[20px] flex flex-col items-center flex-1 py-[12px] bg-[#292D34] text-center"
          v-for="item in userSignInfo.totalDay || 7"
          :key="item"
        >
          <img
            src="@/assets/svg/checked-white.svg"
            class="w-[60%] mb-[8px]"
            v-if="userSignInfo.day >= item"
          />
          <img
            src="@/assets/svg/gift-checked.svg"
            class="w-[60%] mb-[8px]"
            v-else-if="userSignInfo.totalDay === item"
          />
          <img src="@/assets/svg/lock.svg" class="w-[60%] mb-[8px]" v-else />
          <span class="text-[14px] whitespace-nowrap">{{ item }}天</span>
        </div>
      </div>

      <div class="flex justify-center mt-[24px]">
        <div class="pb-[3px] border-[1.5px] border-black min-w-[120px]">
          <AdButton
            :loading="loading"
            :disabled="
              userSignInfo.status || userSignInfo.totalDay <= userSignInfo.day
                ? true
                : false
            "
            :fallBack="onDaySign"
            type="3"
            :class="{
              'shadow-btn-primary': userSignInfo.status === 0,
              'shadow-btn-grey': userSignInfo.status === 1,
            }"
            class="rounded-[4px]"
          >
            <div
              class="text-[18px]"
              v-if="userSignInfo.totalDay <= userSignInfo.day"
            >
              已领奖
            </div>
            <div v-else class="text-[18px] flex items-center">
              <img
                v-if="!userSignInfo.status"
                src="@/assets/newbie/check-icon.png"
                class="w-[24px] mr-[4px]"
              />
              {{ userSignInfo.status ? '已签到' : '签到' }}
            </div>
          </AdButton>
        </div>
      </div>
    </div>

    <div class="text-center pt-[30px]">
      <div class="inline-block" @click="emit('close')">
        <img src="@/assets/svg/close.svg" class="w-[28px]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { signInfo, daySign } from '@/services/user'
import AdButton from '@/components/AdButton/index.vue'

const emit = defineEmits(['close', 'success'])

const userSignInfo: any = ref({})
const getSignInfo = async () => {
  loading.value = true
  const { success, data } = await signInfo()
  loading.value = false
  if (success) {
    userSignInfo.value = data
  }
}
const loading = ref(false)
const onDaySign = async () => {
  if (userSignInfo.value.status) return
  if (userSignInfo.value.totalDay <= userSignInfo.value.day) return
  loading.value = true
  const { success, data } = await daySign()
  loading.value = false
  if (success) {
    if (userSignInfo.value.day + 1 >= userSignInfo.value.totalDay) {
      emit('success', data)
    } else {
      getSignInfo()
    }
  }
}

onMounted(() => {
  getSignInfo()
})
</script>

<style scoped></style>
