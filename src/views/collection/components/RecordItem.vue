<template>
  <div class="mt-[12px] p-[16px] common-linear">
    <div class="flex items-center pb-[16px] border-b-[1px] border-[#717171]">
      <img
        class="w-[41px] h-[41px] mr-[10px]"
        src="@/assets/svg/checked_round.svg"
      />
      <div>
        <div class="text-[18px]">兑换成功</div>
        <div class="text-[14px]">兑换码：183767484987hjo</div>
      </div>
      <img
        @click="handleCopy('111')"
        src="@/assets/svg/copy.svg"
        class="w-[20px] self-end ml-auto"
      />
    </div>

    <div class="flex text-[12px] leading-[12px] pt-[12px]">
      <div>
        <div class="flex items-center mb-[8px]">
          <span>兑换星星：</span>
          <img
            src="@/assets/star/star.png"
            class="w-[14px] h-[14px] mr-[4px]"
          />
          <span>28647489</span>
        </div>
        <div>兑换时间：2023-07-29</div>
      </div>
      <img
        @click="setCodeShow(true)"
        src="@/assets/svg/code.svg"
        class="w-[20px] h-[20px] ml-auto self-end mb-[5px]"
      />
    </div>

    <van-popup v-model:show="codeShow" round>
      <div class="p-[20px]">
        <QrcodeVue value="44465456465" class="qr-code" level="H" />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { useToggle } from '@vueuse/core'
import { handleCopy } from '@/utils/utils'

const [codeShow, setCodeShow] = useToggle(false)

const showCode = () => {}
</script>

<style scoped lang="less">
.qr-code {
  width: 240px !important;
  height: 240px !important;
}
</style>
