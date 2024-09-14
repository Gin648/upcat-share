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
        <img src="@/assets/png/Rat_Coin.png" class="w-[25px] h-auto" />
        <van-icon v-if="toolShow" name="arrow-down" size="12px" />
      </div>

      <Transition name="fade">
        <div
          v-if="toolShow"
          key="tool"
          class="w-[48px] rounded-b-[12px] bg-black/80"
        >
          <div
            class="flex flex-col items-center justify-center mt-[6px]"
            @touchstart.native.prevent="gmousedown"
            @touchend.native.prevent="gmouseup"
          >
            <img
              src="@/assets/png/star.png"
              class="w-[30px]"
              :class="{ gray: !canBuyStar }"
            />
            <div class="text-[10px] leading-[18px]">
              {{ formatNumberUnit(starPrice) }}
            </div>
          </div>

          <div
            class="flex flex-col items-center justify-center pt-[5px] mb-[6px] mt-[5px] border-t border-[#5F5F5F]"
            @click="buyLevel"
          >
            <img
              :class="{ gray: !canBuylevel }"
              src="@/assets/png/up_buy.png"
              class="w-[24px]"
            />
            <div class="text-[10px] leading-[18px]">
              {{
                props.baseInfo?.maxLv > props.baseInfo?.lv
                  ? formatNumberUnit(baseInfo.nextLvAmount)
                  : 'Max'
              }}
            </div>
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
        <img src="@/assets/png/Cat_Coin.png" class="w-[25px] h-auto" />

        <van-icon v-if="medalShow" name="arrow-down" size="12px" />
      </div>

      <Transition name="fade">
        <div
          v-if="medalShow"
          class="w-[48px] rounded-b-[12px] pb-[6px] bg-black/80"
        >
          <div
            class="flex flex-col items-center justify-center mt-[8px]"
            :class="{ gray: !baseInfo.ibo || baseInfo.ibo < item.amount }"
            v-for="item in bacteriaConfig"
            @click="_buyBacteria(item)"
            :key="item.id"
          >
            <img :src="getPng(item.url)" class="w-[30px]" />
            <div class="text-[10px] leading-[18px]">
              {{ formatNumberUnit(item.amount) }}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'animate.css'
import { ref, onMounted, computed } from 'vue'
import { useToggle } from '@vueuse/core'
import { formatNumberUnit, getPng } from '@/utils/utils'
import { queryStartPrice, buyStar, userUpgrade } from '@/services/study'
import { getBacteriaConfig, buyBacteria } from '@/services/bigStar'
import { useLoading } from '@/hooks/useLoading'
import useStore from '@/store'
import { useRouter } from 'vue-router'

const { loadingToggle } = useLoading()
const { studyStore } = useStore()
const router = useRouter()
const [toolShow, setToolShow] = useToggle(true)
const [medalShow, setMedalShow] = useToggle(true)

const props = defineProps({
  baseInfo: {
    type: Object,
    default: () => ({}),
  },
})

const starPrice = ref(0)
const _queryStartPrice = async () => {
  const { success, data }: any = await queryStartPrice()
  if (success) {
    starPrice.value = +data.rate
      ? +data.amount * +data.rate * 0.1
      : +data.amount
  }
}

const canBuyStar = computed(() => {
  if (starPrice.value && studyStore?.learningCoinAmount >= starPrice.value) {
    return true
  }
  return false
})

const canBuylevel = computed(() => {
  if (
    starPrice.value &&
    studyStore?.learningCoinAmount >= props.baseInfo?.nextLvAmount &&
    props.baseInfo?.maxLv > props.baseInfo?.lv
  ) {
    return true
  }
  return false
})

const myTimeDisplay = ref(null)
const bugStarNum = ref(0)
//长按事件（起始）
const downKey = ref(false)
const gmousedown = () => {
  if (!canBuyStar.value) return
  bugStarNum.value = 0
  downKey.value = true
  myTimeDisplay.value = setInterval(() => {
    if (canBuyStar.value) {
      bugStarNum.value += 1
      const amount = studyStore.learningCoinAmount - starPrice.value
      studyStore.changeCoin(amount)
    } else {
      bugStarNum.value = 0
      downKey.value = false
      _buyStar(bugStarNum.value)
      clearInterval(myTimeDisplay.value)
      myTimeDisplay.value = null
    }
  }, 150)
}
const gmouseup = async () => {
  if (!myTimeDisplay.value) return
  if (!canBuyStar.value) return
  // 修复点击一次不扣钱的问题
  if (downKey.value && bugStarNum.value === 0) {
    const amount = studyStore.learningCoinAmount - starPrice.value
    studyStore.changeCoin(amount)
    _buyStar(1)
    downKey.value = false
    clearInterval(myTimeDisplay.value)
    myTimeDisplay.value = null
    return
  }
  const num = bugStarNum.value < 1 ? 1 : bugStarNum.value
  _buyStar(num)
  downKey.value = false
  myTimeDisplay.value && clearInterval(myTimeDisplay.value)
  myTimeDisplay.value = null
}

const emit = defineEmits(['init'])
const _buyStar = async (num) => {
  const { success } = await buyStar({ num: num })
  if (!success) {
    emit('init')
  }
}

const buyLevel = async () => {
  if (!canBuylevel.value) {
    return
  }
  loadingToggle(true, 1, true)
  const { success } = await userUpgrade()
  loadingToggle(false)
  if (success) {
    emit('init')
  }
}

const bacteriaList = ['purple_medal.png', 'pink_medal.png', 'yellow_medal.png']
const bacteriaConfig: any = ref([])
const _getBacteriaConfig = async () => {
  const { success, data }: any = await getBacteriaConfig()
  if (success) {
    bacteriaConfig.value = data.map((t, index) => {
      return {
        ...t,
        url: `${bacteriaList[index]}`,
      }
    })
  }
}

const _buyBacteria = async (item) => {
  if (props.baseInfo?.ibo && props.baseInfo.ibo >= item.amount) {
    loadingToggle(true, 1, true)
    const { success }: any = await buyBacteria(item.id)
    loadingToggle(false)
    if (success) {
      emit('init')
    }
  }
}
onMounted(() => {
  _queryStartPrice()
  _getBacteriaConfig()
})

router.beforeEach(async (to, from) => {
  // 动态删除keep-alive缓存
  if (from.path === '/my' && to.path === '/home') {
    if (from.params.refresh) {
      _queryStartPrice()
    }
  }
})
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
