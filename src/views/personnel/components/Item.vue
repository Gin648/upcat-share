<template>
  <div class="linear-box mb-[16px] px-[12px] pt-[12px] pb-[16px]">
    <div
        class="pb-[16px] flex items-center gap-[10px] border-b border-solid border-white/10"
    >
      <img src="@/assets/png/avater.png" class="w-[42px] rounded-full"/>
      <span class="text-[14px] font-semibold">CZ ZHAO</span>
      <div class="p-[8px] bg-white/10 rounded-[10px] ml-auto">
        <img src="@/assets/svg/email.svg" class="w-[20px]"/>
      </div>
      <div class="p-[8px] bg-white/10 rounded-[10px]">
        <img src="@/assets/svg/tg.svg" class="w-[20px]"/>
      </div>
      <div class="p-[8px] bg-white/10 rounded-[10px] text-sm text-[#2C84FF]" @click="upgradePopup=true">
        升级
      </div>
    </div>
    <div class="flex mt-[16px]">
      <div
          class="border flex items-center border-solid border-white/10 rounded-[30px] py-[6px] px-[16px] gap-[4px]"
          @click="setIdentity=true"
      >
        <img src="@/assets/png/second.png" class="w-[20px]"/>
        <span class="text-[14px]">频道主</span>
      </div>
    </div>
    <div class="py-[12px] flex justify-around">
      <div class="flex-1 text-left">
        <div class="text-[12px] text-white/30 mb-[4px]">团队总人数</div>
        <div class="text-[18px] font-semibold">154824</div>
      </div>
      <div class="flex-1">
        <div class="text-[12px] text-white/30 mb-[4px]">团队总获得</div>
        <div class="text-[20px] font-semibold flex items-center">
          154824
          <img src="@/assets/png/masonry.png" class="w-[18px]"/>
        </div>
      </div>
    </div>

    <div class="flex justify-around">
      <div class="flex-1 text-left">
        <div class="text-[12px] text-white/30 mb-[4px]">今日注册</div>
        <div class="text-[18px] font-semibold">12</div>
      </div>
      <div class="flex-1">
        <div class="text-[12px] text-white/30 mb-[4px]">今日活跃</div>
        <div class="text-[20px] font-semibold flex items-center">21</div>
      </div>
    </div>
  </div>

  <CommonPop
      @close="upgradePopup=false"
      :name="t('sheng-ji') "
      :show="upgradePopup"
      :onBtn="false"
  >
    <div class="text-center text-[16px] mb-[20px]">{{ t('sheng-ji-desc') }}</div>
  </CommonPop>


  <CommonPop
      :name="t('she-zhi-shen-fen') "
      :show="setIdentity"
      :onBtn="false"
      @close="setIdentity=false"
  >
    <div class="text-[16px] flex flex-col gap-[16px] mb-[16px]">
      <div
          class="font-semibold border border-solid flex items-center border-white/20 rounded-[12px] px-[16px] py-[12px]"
      >
        <div class="flex">
          <img src="@/assets/png/second.png" class="w-[20px] mr-[5px]"/>
          <span class="text-[14px]">频道主</span>
        </div>
        <span class="ml-auto text-[#2C84FF]">
          <van-checkbox v-model="checked1" @click="changeChecked1"></van-checkbox>
        </span>
      </div>
    </div>
    <div class="text-[16px] flex flex-col gap-[16px] mb-[16px]">
      <div
          class="font-semibold border border-solid flex items-center border-white/20 rounded-[12px] px-[16px] py-[12px]"
      >
        <div class="flex">
          <img src="@/assets/png/first.png" class="w-[20px] mr-[5px]"/>
          <span class="text-[14px]">城市MCN</span>
        </div>
        <span class="ml-auto text-[#2C84FF]">
          <van-checkbox v-model="checked2" @click="changeChecked2"></van-checkbox>
        </span>
      </div>
    </div>
  </CommonPop>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'

import {useI18n} from "vue-i18n";
import CommonPop from "@/components/CommonPop/index.vue";

const {t} = useI18n()
const upgradePopup = ref(false)
const setIdentity = ref(false)
const checked1 = ref(false)
const checked2 = ref(false)

const handleUpgrade = () => {

}
const handleSetIdentity = () => {

}
const changeChecked1 = () => {
  if (checked2.value) {
    checked2.value = false
  }
}
const changeChecked2 = () => {
  if (checked1.value) {
    checked1.value = false
  }
}
</script>

<style scoped></style>
