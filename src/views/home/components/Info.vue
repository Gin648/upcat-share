<template>
  <div class="relative flex justify-center">
    <div class="cat_border">
      <div
        class="flex items-center info border-box"
        @click="emit('handleTo', '/my')"
      >
        <img src="@/assets/home/cat_avatar.png" class="h-full rounded-[12px]" />
        <span class="user-name">Elon musk</span>
        <div
          class="flex items-center ml-auto"
          @click.stop="emit('handleTo', '/home/level')"
        >
          <span class="mr-[2px] text-[#FFCD6B] text-[12px] font-semibold">
            LV.2
          </span>
          <span class="text-[12px] mr-[5px]">infancy</span>
          <img src="@/assets/svg/up.svg" class="h-[16px] w-auto mr-[12px]" />
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

const emit = defineEmits(['handleTo'])
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
