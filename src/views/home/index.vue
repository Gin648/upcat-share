<template>
  <div class="px-[16px]">
    <nav-bar type="home"></nav-bar>

    <div class="relative flex justify-center overflow-hidden">
      <img src="@/assets/png/cat.png" class="w-[122px] absolute"/>
      <div
          class="px-[10px] pb-[10px] w-full linear-box mt-[100px] z-10 relative"
      >
        <div class="flex justify-center">
          <div class="flex items-center box gap-[10px]">
            <span class="text-[20px] font-semibold">开放联盟</span>
            <span class="text-[16px] font-semibold">User Name</span>
          </div>
        </div>

        <div
            class="py-[20px] flex justify-around border-b border-dashed border-white/20"
        >
          <div class="text-center">
            <div class="text-[14px] text-white/60 mb-[4px]">我的团队</div>
            <div class="text-[20px] font-semibold">15,247</div>
          </div>
          <div>
            <div class="text-[14px] text-white/60 mb-[4px]">今日活跃</div>
            <div class="text-[20px] font-semibold">15,247</div>
          </div>
        </div>

        <div class="py-[20px] flex justify-around">
          <div class="text-center">
            <div
                class="text-[14px] text-white/60 flex items-center gap-[4px] mb-[4px]"
            >
              <img src="@/assets/png/masonry.png" class="w-[16px]"/>
              总获得
            </div>
            <div class="text-[20px] font-semibold">15,247</div>
          </div>
          <div>
            <div
                class="text-[14px] text-white/60 flex items-center gap-[4px] mb-[4px]"
            >
              <img src="@/assets/png/masonry.png" class="w-[16px]"/>
              余额
              <div
                  class="text-[11px] border border-solid border-[#2C84FF] text-[#2C84FF] leading-[18px] px-[6px] rounded-[30px]"
                  @click="setDecompose(true)"
              >
                分解
              </div>
            </div>
            <div class="text-[20px] font-semibold">15,247</div>
          </div>
          <div>
            <div
                class="text-[14px] text-white/60 flex items-center gap-[4px] mb-[4px]"
            >
              <img src="@/assets/png/star.png" class="w-[16px]"/>
              星星
            </div>
            <div class="text-[20px] font-semibold">15,247</div>
          </div>
        </div>

        <div></div>
      </div>
    </div>

    <AwardList></AwardList>


    <CommonPop
        :name="t('fem-jie')"
        :show="decompose"
        :onBtn="false"
        @close="setDecompose(false)"
    >
      <div class="text-[16px] flex flex-col gap-[16px] mb-[16px]">
        <div
            class="font-semibold border border-solid flex items-center border-white/20 rounded-[12px] px-[16px] py-[12px]"
        >
          <div class="field-transparent">
            <van-field
                placeholder="请输入需要分解数量"
                autocomplete="off"
                v-model="decompositionQuantity"
            >
              <template #button>
                <div class="text-[#2C84FF] text-[16px] font-normal">最大</div>
              </template>
            </van-field>
          </div>
        </div>
      </div>
      <div class="flex mb-[16px]">
        <div class="mr-[5px] text-[14px] text-[#fff]">预计获得1234</div>
        <img class="w-[16px] h-[16px]" src="@/assets/png/star.png" alt="">
      </div>
    </CommonPop>
  </div>
</template>

<script setup lang="ts">
import AwardList from './components/AwardList.vue'
import CommonPop from "@/components/CommonPop/index.vue";
import {useI18n} from 'vue-i18n'
import {ref} from "vue";
import {useToggle} from "@vueuse/core";

const {t} = useI18n()
const [decompose, setDecompose] = useToggle(false)
const decompositionQuantity = ref(null)
</script>

<style scoped lang="less">
.box {
  border-radius: 0px 0px 30px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
  box-shadow: 0px 4px 4px 0px rgba(17, 35, 95, 0.25);
  padding: 10px 30px;
}
</style>
