<template>
  <van-popup
    :show="show"
    class="van-popup--transparent max-w-[100vw] w-[100vw]"
    @close="onClose"
  >
    <div class="px-[32px] py-[10px]">
      <div class="bg-black" style="border-radius: 16px">
        <ShadowBorderBox icon="cat-bg.svg">
          <div
            class="flex flex-col items-center justify-center w-full py-[28px]"
          >
            <img src="@/assets/svg/Cat_Coin.svg" class="w-[50px]" />
            <div class="big mt-[8px]">100,23K</div>
            <div class="mt-[16px] flex items-center">
              <div class="mr-[24px] pr-[24px] border-r border-white/20">
                <div class="text-[14px] font-semibold">1.1223K</div>
                <div class="text-[12px] mt-[2px]">可用数量</div>
              </div>
              <div>
                <div class="text-[14px] font-semibold">1.1223K</div>
                <div class="text-[12px] mt-[2px]">可用数量</div>
              </div>
            </div>

            <div class="flex justify-center mt-[24px]">
              <div class="pb-[3px] border-[1.5px] border-black min-w-[120px]">
                <AdButton class="shadow-btn-primary rounded-[4px]">
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
import { ref, reactive } from 'vue'
import ShadowBorderBox from '@/components/ShadowBorderBox/index.vue'
import AdButton from '@/components/AdButton/index.vue'

const props = withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  {
    show: () => false,
  }
)

const emit = defineEmits(['close'])

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
