<template>
  <van-popup
    teleport="#app"
    :show="show"
    class="van-popup--transparent"
    style="max-width: 100vw"
    @close="onClose"
  >
    <div class="w-full">
      <div
        class="text-[24px] z-10 relative leading-[24px] text-[#FDF7E6] font-semibold text-center"
      >
        {{ t('gong-xi-huo-de-mang-he') }}
      </div>
      <div class="-mt-[110px] relative">
        <img src="@/assets/newbie/bg.png" class="w-full" />
        <div
          class="absolute bottom-[20px] left-0 flex flex-col items-center w-full"
        >
          <img src="@/assets/newbie/gift-open.png" class="w-[38px]" />
          <div class="flex items-center mt-[10px]">
            <img src="@/assets/png/Cat_Coin.png" class="w-[50px] mr-[10px]" />
            <div
              class="text-[#EDC88C] flex items-center text-[48px] font-bold"
              style="font-family: Alibaba PuHuiTi"
            >
              +
              <count-up
                v-if="getAmount"
                :startVal="0"
                :endVal="getAmount"
                duration="0.3"
                :decimalPlaces="0"
                :options="{ useGrouping: false }"
              ></count-up>
              <span v-else>???</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center pt-[4px] text-[14px]" v-if="!getAmount">
        {{ t('mang-he-jiang-li') }}&nbsp;{{ boxInfo.boxMinAmount }}-{{
          boxInfo.boxMaxAmount
        }}
      </div>

      <div class="flex flex-col items-center justify-center mt-[50px]">
        <div
          class="pb-[3px] border-[1.5px] border-black min-w-[176px]"
          @click="onClose"
        >
          <van-button class="w-full shadow-btn-grey" type="primary">
            <div class="text-[18px] flex items-center px-[16px]">
              <img
                src="@/assets/png/close-plain.png"
                class="w-[24px] mr-[4px]"
              />
              {{ t('guan-bi') }}
            </div>
          </van-button>
        </div>

        <div
          v-if="!getAmount"
          class="pb-[3px] border-[1.5px] mt-[16px] border-black min-w-[176px]"
        >
          <AdButton
            :sourceId="boxInfo.openNumber + 1"
            :loading="loading"
            type="2"
            class="shadow-btn-primary"
            :fallBack="onReceived"
          >
            <div class="text-[18px] flex items-center px-[16px]">
              <img
                src="@/assets/png/watch_ad_icon.png"
                class="w-[24px] mr-[4px]"
              />
              {{ t('ling-qu') }}
            </div>
          </AdButton>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CountUp from 'vue-countup-v3'
import { openBox } from '@/services/study'
import AdButton from '@/components/AdButton/index.vue'
import { prodEnvAssert } from '@/utils/utils'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'
import useStore from '@/store'
const { t } = useI18n()
const { reloadStore } = useStore()

const props = withDefaults(
  defineProps<{
    show?: boolean
    boxInfo?: any
  }>(),
  {
    show: () => false,
    boxInfo: () => ({}),
  }
)

watch(
  () => props.show,
  (val) => {
    if (val) {
      getAmount.value = null
      loading.value = false
    }
  },
  { deep: true }
)

const emit = defineEmits(['close', 'addCatCoin'])

const onClose = () => {
  emit('close')
}

const loading = ref(false)

const getAmount = ref(null)
const onReceived = async () => {
  //TODO coming soon
  if (prodEnvAssert()) {
    return showToast('coming soon')
  }
  loading.value = true
  const { success, data } = await openBox({
    num: props.boxInfo.openNumber + 1,
  })
  loading.value = false
  if (success) {
    getAmount.value = data
    emit('addCatCoin', data)
  } else {
    reloadStore.reload()
  }
}
</script>

<style scoped></style>
