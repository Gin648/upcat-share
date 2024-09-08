<template>
  <div
    class="absolute rounded-tl-[12px] rounded-bl-[12px] bg-black/80 p-[13px] right-0 -translate-y-1/2 top-1/2"
  >
    <div>
      <van-badge :content="5" :show-zero="false">
        <img src="@/assets/svg/blind_Box.svg" class="w-[36px]" />
      </van-badge>
      <div class="w-full h-[4px] rounded-[37px] bg-[#4A4848] mt-[8px]">
        <div class="w-1/2 rounded-[37px] bg-white h-full"></div>
      </div>
    </div>

    <div class="mt-[27px]">
      <van-badge :content="5" :show-zero="false">
        <img src="@/assets/svg/gift.svg" class="w-[36px]" />
      </van-badge>
    </div>
    <div class="mt-[30px]" @click="emit('handleTo', '/task')">
      <van-badge :content="0" :show-zero="false">
        <img src="@/assets/svg/list_home.svg" class="w-[35px]" />
      </van-badge>
    </div>
    <div class="mt-[30px]">
      <van-badge :content="10" :show-zero="false">
        <img src="@/assets/svg/ToDo.svg" class="w-[36px]" />
      </van-badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const emit = defineEmits(['handleTo'])
</script>

<style scoped></style>
