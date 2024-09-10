<template>
  <div>
    <div class="mt-[20px]">
      <ShadowBorderBox icon="my-start-bg.svg">
        <div class="p-[20px] flex flex-col h-full justify-between">
          <div class="flex items-center">
            <span class="text-[16px] font-semibold">我的星星</span>

            <div
              @click="emit('handleTo', '/home')"
              class="ml-auto pb-[3px] rounded-[4px] border-[1.5px] border-black"
            >
              <van-button
                @click=""
                class="shadow-btn-primary"
                type="primary"
                size="small"
                block
              >
                <div class="text-[12px] flex items-center px-[16px]">
                  <img src="@/assets/star/car.png" class="w-[16px] mr-[4px]" />
                  购买
                </div>
              </van-button>
            </div>
          </div>
          <div class="flex items-center mt-[8px]">
            <img
              class="w-[47px] h-[47px] mr-[8px]"
              src="@/assets/star/star.png"
            />
            <div>
              <span class="big_number text-[40px] leading-[40px] mr-[14px]">{{
                info.teamHelpNum + info.buyNum || '-'
              }}</span>
              <span
                class="text-[12px] opacity-60 mr-[4px] self-end"
                v-if="info.buyNum"
                >折扣 {{ info.rate * 10 }}%</span
              >
              <!-- <van-icon name="question-o" class="self-end" /> -->
            </div>
          </div>
          <div class="flex mt-[20px]">
            <div class="flex-1 text-center border-r border-[#6C6C6C]">
              <div class="text-[12px] opacity-60">我购买的</div>
              <div class="big_number text-[20px]">{{ info.buyNum || 0 }}</div>
            </div>
            <div class="flex-1 text-center">
              <div class="text-[12px] opacity-60">群助力</div>
              <div class="big_number text-[20px]">
                {{ info.teamHelpNum || 0 }}
              </div>
            </div>
          </div>
        </div>
      </ShadowBorderBox>

      <div
        class="mt-[12px] common-linear py-[20px] px-[16px] flex items-center"
      >
        <img src="@/assets/svg/Cat_Coin.svg" class="w-[38px]" />
        <div class="ml-[10px]">
          <div class="text-[12px]">昨日瓜分：</div>
          <div class="text-[16px] font-semibold">{{ amount }}</div>
        </div>
        <div class="ml-auto pb-[3px] rounded-[4px] border-[1.5px] border-black">
          <AdButton
            type="4"
            :loading="loading"
            class="shadow-btn-primary"
            size="small"
            :fallBack="onReceived"
            :disabled="!amount"
          >
            <div class="text-[12px] flex items-center px-[16px]">
              <img src="@/assets/star/ad.png" class="w-[20px] mr-[4px]" />
              领取
            </div>
          </AdButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import ShadowBorderBox from '@/components/ShadowBorderBox/index.vue'
import AdButton from '@/components/AdButton/index.vue'
import { receiveYesterdayAward } from '@/services/bigStar'

const props = defineProps({
  info: {
    type: Object,
    default: () => {},
  },
  amount: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['handleTo', 'init'])

const loading = ref(false)
const onReceived = async () => {
  loading.value = true
  const { success } = await receiveYesterdayAward()
  loading.value = false
  if (success) {
    emit('init')
  }
}
</script>

<style scoped lang="less">
//
</style>
