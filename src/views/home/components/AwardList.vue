<template>
  <div class="relative linear-box mt-[12px] p-[8px]">
    <div class="px-[12px] border-[#2C84FF] border-solid border rounded-[10px]">
      <div class="py-[16px] flex items-center gap-[10px]">
        <div
            class="px-[21px] rounded-[30px] py-[4px] text-white/60 bg-[#191A1C] text-[14px] leading-[18px]"
            @click="active = 0"
            :class="active === 0 ? 'active' : ''"
        >
          所有
        </div>
        <div
            class="px-[21px] rounded-[30px] py-[4px] text-white/60 bg-[#191A1C] text-[14px] leading-[18px]"
            @click="active = 1"
            :class="active === 1 ? 'active' : ''"
        >
          今日
        </div>
        <div
            class="px-[21px] rounded-[30px] py-[4px] text-[14px] bg-[#191A1C] text-white/60 leading-[18px]"
            @click="active = 2"
            :class="active === 2 ? 'active' : ''"
        >
          昨日
        </div>
      </div>
      <div
          v-for="(item,index) in statisticsList"
          :key="index"
          class="py-[16px] flex items-center bg-[#191A1C] px-[10px] rounded-[12px] mb-[10px]"
      >
        <div class="">
          <span class="text-[15px]">{{ item.title }}</span>
          <div class="text-[16px] text-white/60 flex items-center">
            <img
                src="@/assets/png/user.png"
                alt=""
                class="w-[20px] h-[20px] mr-[5px]"
            />
            <div class="text-[16px]">{{ statisticsInfo[item.numberOfPeople] }}</div>
          </div>
        </div>
        <span class="ml-auto text-[17px] font-semibold">+{{ formatBalance(statisticsInfo[item.profit]) }}</span>
        <img src="@/assets/png/masonry.png" class="w-[20px] ml-[4px]"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted, watch} from "vue";
import {allyHomeStatisticsInfo} from "@/services/share";
import {useLoading} from "@/hooks/useLoading";
import {formatBalance} from "@/utils/utils";

const active = ref(0);
const statisticsInfo = ref({});
const statisticsList = ref([
  {
    title: "我的好友",
    numberOfPeople: "userDirectTotalAmount",
    profit: "userDirectTotal",
  },
  {
    title: "好友邀请",
    numberOfPeople: "userInterpositionTotal",
    profit: "userInterpositionTotalAmount",
  },
  {
    title: "我的频道",
    numberOfPeople: "userChannelTotal",
    profit: "userChannelTotalAmount",
  },
  {
    title: "我的城市",
    numberOfPeople: "userCityTotal",
    profit: "userCityTotalAmount",
  },
]);
const {loadingToggle} = useLoading();
const init = async () => {
  loadingToggle(true);
  const res = await allyHomeStatisticsInfo({type: active.value});
  if (res && res.data) {
    statisticsInfo.value = res.data
  }
  loadingToggle(false);
};
onMounted(async () => {
  await init();
});
watch(active, async (newValue) => {
  // console.log("newValue :>> ", newValue)
  await init();
})

</script>

<style scoped>
.active {
  background-color: #2c84ff;
  color: #fff;
}
</style>
