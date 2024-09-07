<template>
  <div class="absolute bottom-[50px] left-[8px]">
    <div class="flex flex-col items-center justify-center overflow-hidden">
      <div
        class="flex flex-col items-center justify-center w-[48px] py-[6px] bg-black/80"
        :class="{ 'rounded-[12px]': !toolShow, 'rounded-t-[12px]': toolShow }"
        @click="setToolShow(!toolShow)"
      >
        <van-icon
          v-if="!toolShow"
          name="arrow-up"
          size="12px"
          class="-mt-[3px]"
        />
        <img src="@/assets/svg/Cat_Coin.svg" class="w-[25px] h-auto" />
        <van-icon v-if="toolShow" name="arrow-down" size="12px" />
      </div>

      <Transition name="fade">
        <div
          v-if="toolShow"
          key="tool"
          class="w-[48px] rounded-b-[12px] bg-black/80"
        >
          <div class="flex flex-col items-center justify-center mt-[6px]">
            <img src="@/assets/svg/star.svg" class="w-[30px]" />
            <div class="text-[10px] leading-[18px]">100k</div>
          </div>

          <div
            class="flex flex-col items-center justify-center pt-[5px] mb-[6px] mt-[5px] border-t border-[#5F5F5F]"
          >
            <img src="@/assets/svg/up_buy.svg" class="w-[24px]" />
            <div class="text-[10px] leading-[18px]">100k</div>
          </div>
        </div>
      </Transition>
    </div>

    <div
      class="flex flex-col items-center justify-center overflow-hidden mt-[4px]"
    >
      <div
        class="flex flex-col items-center justify-center w-[48px] py-[6px] bg-black/80"
        :class="{ 'rounded-[12px]': !medalShow, 'rounded-t-[12px]': medalShow }"
        @click="setMedalShow(!medalShow)"
      >
        <van-icon
          name="arrow-up"
          size="12px"
          class="-mt-[3px]"
          v-if="!medalShow"
        />
        <img src="@/assets/svg/Rat_Coin.svg" class="w-[25px] h-auto" />
        <van-icon v-if="medalShow" name="arrow-down" size="12px" />
      </div>

      <Transition name="fade">
        <div
          v-if="medalShow"
          class="w-[48px] rounded-b-[12px] pb-[6px] bg-black/80"
        >
          <div class="flex flex-col items-center justify-center mt-[8px]">
            <img src="@/assets/svg/purple_medal.svg" class="w-[30px]" />
            <div class="text-[10px] leading-[18px]">100k</div>
          </div>
          <div
            class="flex flex-col items-center justify-center pt-[8px] border-t border-[#5F5F5F]"
          >
            <img src="@/assets/svg/pink_medal.svg" class="w-[30px]" />
            <div class="text-[10px] leading-[18px]">100k</div>
          </div>

          <div
            class="flex flex-col items-center justify-center pt-[8px] border-t border-[#5F5F5F]"
          >
            <img src="@/assets/svg/yellow_medal.svg" class="w-[30px]" />
            <div class="text-[10px] leading-[18px]">100k</div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'animate.css'
import { ref, reactive } from 'vue'
import { useToggle } from '@vueuse/core'
const [toolShow, setToolShow] = useToggle(false)
const [medalShow, setMedalShow] = useToggle(false)
</script>

<style lang="less" scoped>
// .bounce-enter-active {
//   animation-name: fadeIn;
//   animation-duration: 1s;
//   animation-timing-function: linear;
// }
// .bounce-leave-active {
//   animation-direction: reverse;
//   animation-name: fadeIn;
//   animation-duration: 1s;
//   animation-timing-function: linear;
//   animation-fill-mode: forwards;
// }

@keyframes fadeIn {
  0% {
    max-height: 0;
  }
  100% {
    max-height: 200px;
  }
}

.fade-enter-active {
  animation-name: fadeIn;
  animation-duration: 0.6s;
  animation-timing-function: linear;
}

.fade-leave-active {
  animation-direction: reverse;
  animation-name: fadeIn;
  animation-duration: 0.6s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>
