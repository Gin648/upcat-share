<template>
  <div class="w-full">
    <div
      class="text-[36px] z-10 relative leading-[36px] font-semibold text-center"
    >
      新人大礼包 <br />
      已到账
    </div>
    <div class="-mt-[80px] relative">
      <img src="@/assets/newbie/bg.png" class="w-full" />
      <div
        class="absolute -bottom-[50px] left-0 flex flex-col items-center w-full"
      >
        <div class="flex items-center -mb-[20px]">
          <img src="@/assets/svg/Cat_Coin.svg" class="w-[50px] mr-[10px]" />
          <div
            class="text-[#EDC88C] text-[48px] flex items-center font-bold"
            style="font-family: Alibaba PuHuiTi"
          >
            +
            <count-up
              :startVal="0"
              :endVal="inviterGiveAmount"
              duration="0.3"
              :decimalPlaces="0"
              :options="{ useGrouping: false }"
            ></count-up>
          </div>
        </div>

        <img src="@/assets/newbie/gift.png" class="w-[150px]" />
      </div>
    </div>

    <div class="flex justify-center mt-[50px]">
      <div
        class="pb-[3px] border-[1.5px] border-black max-w-[176px]"
        @click="emit('close')"
      >
        <van-button class="shadow-btn-primary" type="primary">
          <div class="text-[18px] flex items-center px-[16px]">
            <img src="@/assets/newbie/finger.png" class="w-[24px] mr-[4px]" />
            领取
          </div>
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CountUp from 'vue-countup-v3'
import { onMounted, ref } from 'vue'
import { getInviterGiveAmount } from '@/services/user'

const emit = defineEmits(['close'])

const inviterGiveAmount = ref<number>(0)
const _getInviterGiveAmount = async () => {
  const { success, data } = await getInviterGiveAmount()
  if (success) {
    inviterGiveAmount.value = +data
  }
}

onMounted(() => {
  _getInviterGiveAmount()
})
</script>

<style scoped></style>
