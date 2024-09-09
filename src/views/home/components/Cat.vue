<template>
  <div
    id="waterBox"
    class="flex items-end justify-center pb-[10px] flex-1 relative"
  >
    <div
      class="w-full h-full bg pt-[80px]"
      @touchstart.prevent="numberAdd"
    ></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getSvg } from '@/utils/utils'
const emits = defineEmits(['addCoin', 'receiveClick'])

const props = defineProps({
  clickNumber: {
    type: Number,
    default: 0,
  },
  currentEnergy: {
    type: Number,
    default: 0,
  },
})

const isAnimated = ref(false)
const number = ref([])
const timer = ref(null)

const numberAdd = (event) => {
  if (event.changedTouches) {
    for (let index = 0; index < event.changedTouches.length; index++) {
      const touch = event.changedTouches[index]
      const x = touch.pageX
      const y = touch.pageY
      generateCoin(x, y)
      number.value.push({ x, y })
      if (timer.value) {
        clearTimeout(timer.value)
      }
    }
  }
}

const generateCoin = (x, y) => {
  // 水波纹效果
  let coin = document.createElement('img')
  let box = document.getElementById('waterBox')
  coin.setAttribute('src', getSvg('Rat_Coin.svg'))

  const randomInt = getRandomInt(30, 40)
  coin.setAttribute('class', 'rat-coin')
  box.appendChild(coin)
  coin.style.width = `${randomInt}px`
  coin.style.height = `${randomInt}px`
  coin.style.marginLeft = `-${randomInt / 2}px`
  coin.style.marginTop = `-${randomInt / 2}px`
  coin.style.top = `${y}px`
  coin.style.left = `${x}px`
  setTimeout(() => {
    box.removeChild(coin)
  }, 1000)
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

defineExpose({ number })
</script>

<style scoped lang="less">
.bg {
  background-image: url('@/assets/home/cat.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>

<style>
.rat-coin {
  position: fixed;
  border-radius: 50%;
  animation-name: waterDrop;
  animation-duration: 1s;
  animation-timing-function: linear;
}

@keyframes waterDrop {
  0% {
    opacity: 1;
  }

  100% {
    top: 110px;
    opacity: 0.6;
  }
}
</style>
