<template>
  <div class="linear-box mb-[16px] px-[12px] pt-[12px] pb-[16px]">

    <div class="text-[12px] text-white/30 mt-[16px]">
      注册时间 {{ item.createTime }}
    </div>
    <div class="py-[16px] flex justify-around">
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

    <div class="flex justify-around pb-[10px]">
      <div class="flex-1 text-left">
        <div class="text-[12px] text-white/30 mb-[4px]">今日注册</div>
        <div class="text-[18px] font-semibold">12</div>
      </div>
      <div class="flex-1">
        <div class="text-[12px] text-white/30 mb-[4px]">今日活跃</div>
        <div class="text-[20px] font-semibold flex items-center">21</div>
      </div>
    </div>


    <div class="flex justify-end">
      <div class="p-[8px] bg-white/10 rounded-[10px] mr-[12px]">
        <img src="@/assets/svg/email.svg" class="w-[20px]"/>
      </div>
      <div class="p-[8px] bg-white/10 rounded-[10px] mr-[12px]">
        <img src="@/assets/svg/tg.svg" class="w-[20px]"/>
      </div>
      <div class="p-[8px] bg-white/10 rounded-[10px] text-sm text-[#2C84FF]">
        设置身份
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getPng} from "@/utils/utils";

const props = withDefaults(
    defineProps<{
      item?: Object
    }>(),
    {
      item: {},
    }
)
import {ref, reactive} from 'vue'
</script>

<style scoped></style>
