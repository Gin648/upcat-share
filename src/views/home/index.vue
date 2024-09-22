<template>
  <div class="px-[16px]">
    <nav-bar></nav-bar>

    <div
      class="flex justify-center z-[9999] relative overflow-hidden -mt-[40px]"
    >
      <img src="@/assets/png/cat.png" class="w-[122px] absolute" />
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
            <div class="text-[14px] text-white/60 mb-[4px]mb-[4px]">
              我的团队
            </div>
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
              <img src="@/assets/png/masonry.png" class="w-[16px]" />
              总获得
            </div>
            <div class="text-[20px] font-semibold">15,247</div>
          </div>
          <div>
            <div
              class="text-[14px] text-white/60 flex items-center gap-[4px] mb-[4px]"
            >
              <img src="@/assets/png/masonry.png" class="w-[16px]" />
              余额
              <div
                class="text-[11px] border border-solid border-[#2C84FF] text-[#2C84FF] leading-[18px] px-[6px] rounded-[30px]"
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
              <img src="@/assets/png/star.png" class="w-[16px]" />
              星星
            </div>
            <div class="text-[20px] font-semibold">15,247</div>
          </div>
        </div>

        <div></div>
      </div>
    </div>

    <AwardList></AwardList>
  </div>
</template>

<script setup lang="ts">
import AwardList from './components/AwardList.vue'
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
