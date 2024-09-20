<template>
  <div class="">
    <NavBar :title="t('deng-ji-quan-yi')"></NavBar>
    <div class="flex px-[16px] relative gap-[10px]">
      <div
        class="w-1/2 sticky top-[46.0078px] flex flex-col"
        style="height: calc(100vh - 60px)"
      >
        <div class="flex flex-col items-center py-[10px] info-container">
          <div class="rounded-full">
            <img
              :src="
                userInfoSt.lv
                  ? getImage('level/' + userInfoSt.lv + '.png')
                  : getImage('level/0.png')
              "
              class="w-[68px] h-auto rounded-full"
            />
          </div>
          <div class="mt-[4px] user-name text-[12px]">
            {{ userInfo.nickname }}
          </div>
          <div class="">
            <span class="mr-[2px] text-[#FFCD6B] text-[12px] font-semibold">
              LV.{{ userInfoSt.lv }}
            </span>
            <span class="text-[12px] mr-[5px]">{{ userInfoSt.lvName }}</span>
          </div>
        </div>

        <div
          class="bg-[#292D34] flex-1 flex flex-col justify-between mt-[10px] rounded-[20px] px-[11px] py-[10px]"
        >
          <div class="">
            <div class="opacity-60 text-[12px]">
              {{ t('sheng-ji-xiao-hao') }}
            </div>
            <div class="flex items-center text-[16px] font-semibold">
              <span class="mr-[3px]">{{ currentLevel.amount || 0 }}</span>
              <img src="@/assets/png/Rat_Coin.png" class="w-[13px] h-[13px]" />
            </div>
          </div>
          <div class="">
            <div class="opacity-60 text-[12px]">
              {{ t('neng-liang-shang-xian') }}
            </div>
            <div class="flex items-center text-[16px] font-semibold">
              {{ currentLevel.basicEnergy || 0 }}
            </div>
          </div>
          <div class="">
            <div class="opacity-60 text-[12px]">{{ t('dian-ji-xiao-lv') }}</div>
            <div class="flex items-center text-[16px] font-semibold">
              {{ currentLevel.clickAmount || 0
              }}<img
                src="@/assets/png/Rat_Coin.png"
                class="w-[13px] h-[13px]"
              />/{{ t('ci') }}
            </div>
          </div>
          <div class="">
            <div class="opacity-60 text-[12px]">
              {{ t('neng-liang-hui-fu-su-du') }}
            </div>
            <div class="flex items-center text-[16px] font-semibold">
              {{ currentLevel.energySecondAmount || 0 }}/{{ t('miao') }}
            </div>
          </div>
          <div class="">
            <div class="opacity-60 text-[12px]">{{ t('kong-tou-su-du') }}</div>
            <div class="flex items-center text-[16px] font-semibold">
              {{
                (currentLevel.dropSecondAmount &&
                  (currentLevel.dropSecondAmount * 3600).toFixed(0)) ||
                0
              }}
              <img
                src="@/assets/png/Rat_Coin.png"
                class="w-[13px] h-[13px]"
              />/{{ t('xiao-shi') }}
            </div>
          </div>
          <div class="">
            <div class="opacity-60 text-[12px]">
              {{ t('ren-wu-jiang-li-jia-cheng') }}
            </div>
            <div class="flex items-center text-[16px] font-semibold">
              +{{ currentLevel.dropTaskRate || 0 }}%
            </div>
          </div>
          <div class="">
            <div class="opacity-60 text-[12px]">
              {{ t('liu-lan-jiang-li-jia-cheng') }}
            </div>
            <div class="flex items-center text-[16px] font-semibold">
              +{{ currentLevel.articleRate || 0 }}%
            </div>
          </div>

          <div
            class="pb-[3px] w-full rounded-[4px] border-[1.5px] border-black"
            v-if="selectIds === userInfoSt.lv + 1"
          >
            <van-button
              @click="handleClickUpGrade"
              :disabled="currentLevel.amount > studyStore.learningCoinAmount"
              :loading="loading"
              class="shadow-btn-primary"
              type="primary"
              block
            >
              <div class="text-[18px] flex items-center gap-[8px]">
                <img src="@/assets/png/up.png" class="w-[18px]" />
                <span>{{ t('sheng-ji') }}</span>
              </div>
            </van-button>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-[5px] pb-[20px] flex-grow">
        <div
          v-for="item in levelList"
          @click="onSelect(item)"
          :key="item"
          class="h-[81px] bg-[#292D34] rounded-[14px] relative flex items-center justify-center"
          :class="{
            current: userInfoSt.lv === item.lv,
            active: selectIds === item.lv,
          }"
        >
          <div class="w-[60px]">
            <img
              :src="getImage('level/' + item.lv + '.png')"
              class="w-[100%] h-auto rounded-[10px]"
              alt=""
            />
          </div>
          <img
            v-if="selectIds === item.lv"
            src="@/assets/svg/checked_round.svg"
            class="w-[27px] absolute right-[8px] bottom-[8px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { getGradePage, userLevelInfo, userUpgrade } from '@/services/user'
import useStore from '@/store'
import { useLoading } from '@/hooks/useLoading'
import { getStUserInfo } from '@/services/study'
import { showToast } from 'vant'
import { getImage } from '@/utils/utils'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const route = useRoute()
const { accountStore, studyStore } = useStore()
const { loadingToggle } = useLoading()

const selectIds = ref()
const currentLevel: any = ref({})
const userInfo: any = computed(() => accountStore.$state.userInfo)

const levelList: any = ref([])
const userInfoSt: any = ref({})
//获取当前选中等级信息
const getCuttentLevel = (lv) => {
  levelList.value.forEach((v) => {
    if (v.lv == lv) {
      currentLevel.value = v
    }
  })
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
  const res: any = await getStUserInfo() //获取当前等级
  if (res.success) {
    userInfoSt.value = res.data
    selectIds.value = res.data.lv
    getCuttentLevel(res.data.lv)
  }
  loadingToggle(false)
}
const onSelect = async (val) => {
  if (selectIds === val.lv) return
  loadingToggle(true)
  selectIds.value = val.lv
  getCuttentLevel(val.lv)
  loadingToggle(false)
}
//用户升级
const loading = ref(false)
const handleClickUpGrade = async () => {
  loading.value = true
  const { success } = await userUpgrade()
  loading.value = false
  if (success) {
    await init()
    route.params.refresh = '1'
    showToast(t('sheng-ji-cheng-gong'))
  }
}
</script>

<style scoped lang="less">
.current {
  border: 1px solid #ffffff;
}
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
  font-style: normal;
  font-weight: 700;
  //position: relative;
}
</style>
