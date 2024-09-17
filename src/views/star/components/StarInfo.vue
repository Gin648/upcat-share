<template>
  <div>
    <div class="mt-[20px]">
      <ShadowBorderBox icon="my-start-bg.svg">
        <div class="px-[20px] py-[16px] flex flex-col h-full  justify-between">
          <div class="flex items-center">
            <span class="text-[16px] font-semibold">{{ t('wo-de-xing-xing') }}</span>
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
                  {{ t('gou-mai') }}
                </div>
              </van-button>
            </div>
          </div>
          <div class="flex items-center">
            <img
              class="w-[47px] h-[47px] mr-[8px]"
              src="@/assets/star/star.png"
            />
            <div>
              <van-loading v-if="lotteryLoading" />

              <span
                v-else
                class="big_number text-[40px] leading-[40px] mr-[14px]"
                >{{
                  (info.teamHelpNum + info.buyNum &&
                    Number(info.teamHelpNum + info.buyNum).toFixed(0)) ||
                  '0'
                }}</span
              >
              <span
                class="text-[12px] opacity-60 mr-[4px] self-end"
                v-if="info.rate"
                >{{ t('zhe-kou') }} {{ Number(info.rate * 10).toFixed(2) }}%</span
              >
              <!-- <van-icon name="question-o" class="self-end" /> -->
            </div>
          </div>
          <div class="flex">
            <div class="flex-1 text-center border-r border-[#6C6C6C]">
              <div class="text-[12px] opacity-60">{{ t('wo-gou-mai-de') }}</div>
              <div class="big_number text-[20px]">
                <van-loading v-if="lotteryLoading" />
                <span v-else> {{ info.buyNum || 0 }}</span>
              </div>
            </div>
            <div class="flex-1 text-center">
              <div class="text-[12px] opacity-60">{{ t('xiao-dio-zhu-li') }}</div>
              <div class="big_number text-[20px]">
                <van-loading v-if="lotteryLoading" />
                <span v-else> {{ info.teamHelpNum || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </ShadowBorderBox>

      <div
        class="mt-[12px] common-linear py-[20px] px-[16px] flex items-center"
      >
        <img src="@/assets/png/Cat_Coin.png" class="w-[38px]" />
        <div class="ml-[10px]">
          <div class="text-[12px]">{{ t('zuo-ri-gua-fen') }}：</div>
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
              {{ t('ling-qu') }}
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
import {useI18n} from "vue-i18n";
const {t} = useI18n();
const props = defineProps({
  info: {
    type: Object,
    default: () => {},
  },
  amount: {
    type: Number,
    default: 0,
  },
  lotteryLoading: {
    type: Boolean,
    default: () => false,
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
