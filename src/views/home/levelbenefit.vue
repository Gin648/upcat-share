<template>
  <div class="">
    <NavBar title="等级权益"></NavBar>
    <div class="pt-[20px] flex px-[16px] relative gap-[10px] ">
      <div class="w-1/2 h-[80%] sticky top-[66px]">
        <div
            class="flex flex-col items-center info-container pt-[20px] pb-[17px]"
        >
          <div class="w-[95px] h-[95px] rounded-full bg-[#D9D9D9]">
            <img :src="userInfo.avatar" class="w-[100%] h-[100%] rounded-full" alt=""/>
          </div>
          <div class="mt-[10px] user-name">{{ userInfo.nickname }}</div>
          <div class="mt-[4px]">
            <span class="mr-[2px] text-[#FFCD6B] text-[12px] font-semibold">
              LV.{{ userInfoSt.lv }}
            </span>
            <span class="text-[12px] mr-[5px]">infancy</span>
          </div>
        </div>

        <div class="bg-[#292D34] mt-[10px] rounded-[20px] px-[11px] py-[22px]">
          <div class="mb-[22px]">
            <div class="opacity-60 text-[12px]">升级消耗</div>
            <div class="flex items-center text-[16px] font-semibold">
              <span class="mr-[3px]">{{ currentLevel.amount || 0 }}</span>
              <img src="@/assets/svg/Cat_Coin.svg" class="w-[13px] h-[13px]"/>
            </div>
          </div>
          <div class="mb-[22px]">
            <div class="opacity-60 text-[12px]">能量上限</div>
            <div class="flex items-center text-[16px] font-semibold">{{ currentLevel.basicEnergy || 0 }}</div>
          </div>
          <div class="mb-[22px]">
            <div class="opacity-60 text-[12px]">点击效率</div>
            <div class="flex items-center text-[16px] font-semibold">{{ currentLevel.clickAmount || 0 }}/次</div>
          </div>
          <div class="mb-[22px]">
            <div class="opacity-60 text-[12px]">能量恢复速度</div>
            <div class="flex items-center text-[16px] font-semibold">{{ currentLevel.energySecondAmount || 0 }}/秒</div>
          </div>
          <div class="mb-[22px]">
            <div class="opacity-60 text-[12px]">空投速度</div>
            <div class="flex items-center text-[16px] font-semibold">
              {{ currentLevel.dropSecondAmount || 0 }}
              <img
                  src="@/assets/png/Cat_Coin.png"
                  class="w-[13px] h-[13px]"
              />/H
            </div>
          </div>
          <div class="mb-[22px]">
            <div class="opacity-60 text-[12px]">任务奖励加成</div>
            <div class="flex items-center text-[16px] font-semibold">+{{ currentLevel.dropTaskRate || 0 }}%</div>
          </div>
          <div class="mb-[20px]">
            <div class="opacity-60 text-[12px]">浏览奖励加成</div>
            <div class="flex items-center text-[16px] font-semibold">+{{ currentLevel.articleRate || 0 }}%</div>
          </div>

          <div
              class="pb-[3px] w-full rounded-[4px] mt-[12px] border-[1.5px] border-black"
              @click="handleClickUpGrade"
          >
            <van-button class="shadow-btn-primary" type="primary" block>
              <div class="text-[18px] flex items-center gap-[8px]">
                <img src="@/assets/svg/up.svg" class="w-[18px]"/>
                <span>升级</span>
              </div>
            </van-button>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-[5px] pb-[20px] flex-grow overflow-y-auto">
        <div
            v-for="item in levelList"
            @click="onSelect(item)"
            :key="item"
            class="h-[81px] bg-[#292D34] rounded-[14px] relative flex items-center justify-center"
            :class="{ active: selectIds.includes(item) }"
        >
          <div class="w-[60px] h-[60px]">
            <img :src="item.iconUrl" class="w-[100%] h-[100%]" alt="">
          </div>
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
import {ref, reactive, onMounted, computed} from 'vue'
import {getGradePage, userLevelInfo, userUpgrade} from "@/services/user";
import useStore from "@/store";
import {useLoading} from "@/hooks/useLoading";
import {getStUserInfo} from "@/services/study";
import {showToast} from "vant";

const {accountStore} = useStore()
const {loadingToggle} = useLoading()

const selectIds = ref([])
const currentLevel = ref({})
const userInfo = computed(() => accountStore.$state.userInfo)

const levelList = ref([])
const userInfoSt = ref({})
//获取当前选中等级信息
const getCuttentLevel = async (levelId) => {
  const res = await userLevelInfo(levelId)
  currentLevel.value = res.data
}
//获取等级列表
const getLevelList = async () => {
  const res = await getGradePage()
  levelList.value = res.data
}
onMounted(async () => {
  await init()
  // await getUserLevel()

})
const init = async () => {
  loadingToggle(true)
  await getLevelList()
  const res = await getStUserInfo() //获取当前等级
  if (res.success) {
    userInfoSt.value = res.data
    await getCuttentLevel(res.data.gradeConfigId)
  }
  levelList.value.forEach(v => {
    if (v.id == res.data.gradeConfigId) {
      selectIds.value.push(v)
    }
  })
  loadingToggle(false)
}
const onSelect = async (val) => {
  console.log("val=>", val)
  loadingToggle(true)
  let index = selectIds.value.indexOf(val)
  if (index !== -1) {
    selectIds.value.splice(index, 1)
  } else {
    selectIds.value = [val]
  }
  await getCuttentLevel(val.id)
  loadingToggle(false)
}
//用户升级
const handleClickUpGrade = async () => {
  loadingToggle(true)
  const res = await userUpgrade()
  await init()
  showToast('升级成功')
  loadingToggle(false)

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
  //position: relative;
}

</style>
