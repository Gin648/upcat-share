<template>
  <div @click="handleBack" class="z-10 flex items-center gap-1">
    <van-icon
      name="arrow-left"
      class="text-lg font-black"
      :class="{ white: isWhite }"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const props = withDefaults(
  defineProps<{
    isWhite?: boolean
    url?: any
  }>(),
  {
    isWhite: true,
  }
)
const emits = defineEmits(['back'])
const handleBack = () => {
  if (props.url) {
    emits('back')
    return router.replace(props.url)
  }
  try {
    router.back()
  } catch (e) {
    router.push('/')
  }
  emits('back')
}
</script>

<style scoped lang="less">
.white {
  color: white;
}
</style>
