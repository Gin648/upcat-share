<template>
  <div class="pb-[20px]">
    <NavBar title="等级权益"></NavBar>
    <div class="pt-[20px] flex px-[16px] gap-[10px]">
      <div class="flex-1">
        <div
          class="flex flex-col items-center info-container pt-[20px] pb-[17px]"
        >
          <div class="w-[95px] h-[95px] rounded-full bg-[#D9D9D9]"></div>
          <div class="mt-[10px] user-name">Elon musk</div>
          <div class="mt-[4px]">
            <span class="mr-[2px] text-[#FFCD6B] text-[12px] font-semibold">
              LV.2
            </span>
            <span class="text-[12px] mr-[5px]">infancy</span>
          </div>
        </div>

        <div class="bg-[#292D34] mt-[10px] rounded-[20px] px-[11px] py-[22px]">
          <div class="mb-[22px]">
            <div class="opacity-60 text-[12px]">升级消耗</div>
            <div class="flex items-center text-[16px] font-semibold">
              <span class="mr-[3px]">500M</span>
              <img src="@/assets/svg/Cat_Coin.svg" class="w-[13px] h-[13px]" />
            </div>
          </div>
          <div class="mb-[22px]">
            <div class="opacity-60 text-[12px]">能量上限</div>
            <div class="flex items-center text-[16px] font-semibold">5000</div>
          </div>
          <div class="mb-[22px]">
            <div class="opacity-60 text-[12px]">点击效率</div>
            <div class="flex items-center text-[16px] font-semibold">10/次</div>
          </div>
          <div class="mb-[22px]">
            <div class="opacity-60 text-[12px]">能量恢复速度</div>
            <div class="flex items-center text-[16px] font-semibold">10/秒</div>
          </div>
          <div class="mb-[22px]">
            <div class="opacity-60 text-[12px]">空投速度</div>
            <div class="flex items-center text-[16px] font-semibold">
              5k<img
                src="@/assets/svg/Cat_Coin.svg"
                class="w-[13px] h-[13px]"
              />/H
            </div>
          </div>
          <div class="mb-[22px]">
            <div class="opacity-60 text-[12px]">任务奖励加成</div>
            <div class="flex items-center text-[16px] font-semibold">+200%</div>
          </div>
          <div class="mb-[20px]">
            <div class="opacity-60 text-[12px]">浏览奖励加成</div>
            <div class="flex items-center text-[16px] font-semibold">+200%</div>
          </div>

          <div
            class="pb-[3px] w-full rounded-[4px] mt-[12px] border-[1.5px] border-black"
          >
            <van-button class="shadow-btn-primary" type="primary" block>
              <div class="text-[18px] flex items-center gap-[8px]">
                <img src="@/assets/svg/up.svg" class="w-[18px]" />
                <span>升级</span>
              </div>
            </van-button>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-[5px] pb-[20px] flex-1">
        <div
          v-for="item in 30"
          @click="onSelect(item)"
          :key="item"
          class="h-[81px] bg-[#292D34] rounded-[14px] relative"
          :class="{ active: selectIds.includes(item) }"
        >
          <img
            v-if="selectIds.includes(item)"
            src="@/assets/svg/checked_round.svg"
            class="w-[27px] absolute right-[8px] bottom-[8px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const selectIds = ref([])

const onSelect = (val) => {
  let index = selectIds.value.indexOf(val)
  if (index !== -1) {
    selectIds.value.splice(index, 1)
  } else {
    selectIds.value = [...selectIds.value, val]
  }
}
</script>

<style scoped lang="less">
.active {
  border: 1px solid #0fbb29;
}

.info-container {
  border-radius: 20px;
  background: linear-gradient(180deg, #292d34 0%, rgba(0, 149, 255, 0.1) 100%);
}

.user-name {
  color: #fff;
  text-align: center;
  font-family: 'Alibaba PuHuiTi';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
}
</style>
