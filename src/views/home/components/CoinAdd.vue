<template>
  <div
    v-if="myInterval"
    class="fixed number-box"
    :style="`top:${y}px;left:${x}px`"
  >
    <img
      src="@/assets/png/Rat_Coin.png"
      :style="{
        width: `${randomInt}px`,
        height: `${randomInt}px`,
        transform: `translate(-${randomInt / 2}px,-${randomInt / 2}px)`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'

const myInterval = ref(true)

defineProps({
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  clickNumber: {
    type: Number,
    default: 0,
  },
})

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomInt = ref(0)

onBeforeMount(() => {
  randomInt.value = getRandomInt(30, 40)
})

onMounted(() => {
  setTimeout(() => {
    myInterval.value = false
  }, 1300)
})
</script>

<style scoped lang="less">
.number-box {
  z-index: 999;
  animation-name: myFrames;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
}

@keyframes myFrames {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.6;
    top: 110px;
  }
}
</style>
