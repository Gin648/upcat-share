<template>
  <div class="mt-[12px] p-[16px] common-linear">
    <div class="flex items-center pb-[16px] border-b-[1px] border-[#717171]">
      <img
        class="w-[41px] h-[41px] mr-[10px]"
        :src="getSvg(data.status === 0 ? 'warn.svg' : 'checked_round.svg')"
      />
      <div>
        <div class="text-[18px]">
          {{
            data.status === 0 ? t('dui-huan-zhong') : t('dui-huan-cheng-gong')
          }}
        </div>
        <div class="text-[14px]">{{ t('dui-huan-ma') }}{{ data.sn }}</div>
      </div>

      <div @click="handleCopy(data.sn)" class="w-[20px] self-end ml-auto">
        <img src="@/assets/svg/copy.svg" class="w-full" />
      </div>
    </div>

    <div class="flex text-[12px] leading-[12px] pt-[12px]">
      <div>
        <div class="flex items-center mb-[8px]">
          <span>{{ t('dui-huan-xing-xing') }}</span>
          <img
            src="@/assets/star/star.png"
            class="w-[14px] h-[14px] mr-[4px]"
          />
          <span>{{ data.amount }}</span>
        </div>
        <div>{{ t('dui-huan-shi-jian') }}{{ data.createTime }}</div>
      </div>
      <div
        class="w-[20px] h-[20px] ml-auto self-end mb-[5px]"
        @click="setCodeShow(true)"
      >
        <img src="@/assets/svg/code.svg" class="w-full h-full" />
      </div>
    </div>

    <van-popup v-model:show="codeShow" round>
      <div class="p-[20px]">
        <QrcodeVue :value="data.sn" class="qr-code" level="H" />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { useToggle } from '@vueuse/core'
import { getSvg, handleCopy } from '@/utils/utils'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const [codeShow, setCodeShow] = useToggle(false)
</script>

<style scoped lang="less">
.qr-code {
  width: 240px !important;
  height: 240px !important;
}
</style>
