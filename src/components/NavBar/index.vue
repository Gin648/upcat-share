<template>
  <van-nav-bar
    :safe-area-inset-top="true"
    fixed
    :border="false"
    placeholder
    :title="title"
    z-index="999"
    :left-arrow="leftArrow"
    @click-left="handleBack"
  >
  </van-nav-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const props = withDefaults(
  defineProps<{
    title?: string
    leftArrow?: any
    url?: string
  }>(),
  {
    title: '.svg',
    leftArrow: () => true,
    url: '',
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
:deep(.van-nav-bar) {
  background: #191a1c;

  .van-nav-bar__title {
    color: #fff;
    text-align: center;
    font-family: 'PingFang SC';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  }
}

:deep(.van-nav-bar .van-icon) {
  color: #fff;
}
</style>
