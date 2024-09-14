<template>
  <van-popup
    :show="show"
    class="van-popup--transparent max-w-[100vw] w-[100vw] px-[20px]"
    @close="onClose"
  >
    <div class="py-[10px]">
      <div class="bg-black" style="border-radius: 16px">
        <ShadowBorderBox icon="cat-bg.svg">
          <div class="flex flex-col items-center justify-center w-full h-full">
            <img src="@/assets/png/Cat_Coin.png" class="w-[50px]" />
            <div class="big mt-[8px]">
              {{ formatBalance(walletInfo.temporaryAwaitIbo, 0) || 0 }}
            </div>
            <div class="mt-[16px] flex items-center">
              <div class="mr-[24px] pr-[24px] border-r border-white/20">
                <div class="text-[14px] font-semibold">
                  {{ formatBalance(walletInfo.ibo, 0) || 0 }}
                </div>
                <div class="text-[12px] mt-[2px]">可用数量</div>
              </div>
              <div>
                <div class="text-[14px] font-semibold">
                  {{ formatBalance(walletInfo.awaitIbo, 0) || 0 }}
                </div>
                <div class="text-[12px] mt-[2px]">总数</div>
              </div>
            </div>

            <div class="flex justify-center mt-[24px]">
              <div class="pb-[3px] border-[1.5px] border-black min-w-[120px]">
                <AdButton
                  type="5"
                  :fallBack="onReceived"
                  :disabled="!walletInfo.temporaryAwaitIbo"
                  :loading="loading"
                  class="shadow-btn-primary rounded-[4px]"
                >
                  <div class="text-[18px] flex items-center">
                    <img
                      src="@/assets/svg/watch_ad_icon.svg"
                      class="w-[24px] mr-[4px]"
                    />
                    领取
                  </div>
                </AdButton>
              </div>
            </div>
          </div>
        </ShadowBorderBox>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ShadowBorderBox from '@/components/ShadowBorderBox/index.vue'
import AdButton from '@/components/AdButton/index.vue'
import { userWalletInfo, receiveReleasedAmount } from '@/services/user'
import { releaseCoin } from '@/services/study'
import { formatBalance } from '@/utils/utils'
const props = withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  {
    show: () => false,
  }
)

const emit = defineEmits(['close', 'init'])

const loading = ref(false)

watch(
  () => props.show,
  async (val) => {
    if (val) {
      await _releaseCoin()
      _getUserWalletInfo()
    }
  },
  { deep: true }
)

const _releaseCoin = async () => {
  await releaseCoin()
}

const walletInfo: any = ref({})
const _getUserWalletInfo = async (val?: any) => {
  const { success, data } = await userWalletInfo()
  if (success) {
    walletInfo.value = data
  }
}

const onReceived = async () => {
  loading.value = true
  const { success } = await receiveReleasedAmount()
  if (success) {
    walletInfo.value = {}
    emit('init')
    onClose()
  }
  loading.value = false
}

const onClose = () => {
  emit('close')
}
</script>

<style scoped lang="less">
.big {
  color: #edc88c;
  font-family: 'Alibaba PuHuiTi';
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px; /* 100% */
}
</style>
