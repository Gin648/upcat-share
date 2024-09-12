<template>
  <div class="relative flex justify-center">
    <div class="cat_border">
      <div
        class="flex items-center w-[247px] info border-box"
        @click="emit('handleTo', '/my')"
      >
        <img
          :src="
            (userInfo && userInfo.avatar) || getImage('png/header-default-trans.png')
          "
          class="h-full "
        />
        <span class="user-name truncate mr-[8px]">{{
          (baseInfo && baseInfo.nickname) || 'Tom'
        }}</span>
        <div
          class="flex items-center flex-shrink-0 ml-auto"
          @click.stop="emit('handleTo', '/home/level')"
        >
          <span class="mr-[2px] text-[#FFCD6B] text-[12px] font-semibold">
            LV.{{ (baseInfo && baseInfo.lv) || 0 }}
          </span>
          <span class="text-[12px] mr-[5px]">{{
            baseInfo && baseInfo.lvName
          }}</span>
          <img src="@/assets/png/up.png" class="h-[16px] w-auto mr-[12px]" />
        </div>
      </div>
    </div>

    <div class="cat_border absolute right-[11px]">
      <div class="border-box h-[48px] flex items-center">
        <ChangeLang></ChangeLang>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChangeLang from '@/components/ChangeLang/index.vue'
import { getImage } from '@/utils/utils'
import {computed} from "vue";
import useStore from "@/store";
const { accountStore } = useStore()
const userInfo = computed(() => accountStore.$state.userInfo)
const emit = defineEmits(['handleTo'])

const props = defineProps({
  baseInfo: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style lang="less" scoped>
.info {
  width: 247px;
  height: 48px;
  .user-name {
    color: #fff;
    text-align: center;
    font-family: 'Alibaba PuHuiTi';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px; /* 112.5% */
    letter-spacing: -0.165px;
    margin-left: 7px;
  }
}
</style>
