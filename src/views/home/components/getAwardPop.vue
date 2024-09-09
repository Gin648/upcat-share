<template>
  <div
    v-if="!isComplete"
    ref="animation"
    style="width: 100%; height: 100vh; position: fixed; top: 0; z-index: 99999"
  ></div>
  <van-popup
    :show="show"
    class="van-popup--transparent max-w-[100vw] w-[100vw]"
    @close="onClose"
  >
    <Awarded :val="val" @close="onClose"></Awarded>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import lottie from 'lottie-web'
import toJSON from '@/assets/json/json_xuexibi.json'
import Awarded from '@/components/NewbiePack/components/Awarded.vue'

const props = withDefaults(
  defineProps<{
    show?: boolean
    val?: number
  }>(),
  {
    show: () => false,
  }
)
const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
}

const animation = ref(null)
const animationEle = ref(null)
const isComplete = ref(false)
const initAnimation = () => {
  if (animation.value) {
    animationEle.value = lottie.loadAnimation({
      container: animation.value,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: toJSON,
    })
    animationEle.value.addEventListener('complete', () => {
      isComplete.value = true
    })
  }
}
watch(
  () => animation.value,
  (val) => {
    if (val) {
      initAnimation()
    }
  },
  { deep: true }
)

watch(
  () => props.show,
  (val) => {
    if (!animation.value) return
    if (val) {
      isComplete.value = false
      animationEle.value && animationEle.value.play()
    } else {
      animationEle.value && animationEle.value.stop()
    }
  },
  { deep: true }
)
</script>

<style scoped></style>
