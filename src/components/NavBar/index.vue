<template>
  <van-nav-bar
    :safe-area-inset-top="true"
    fixed
    :border="false"
    placeholder
    z-index="999"
    @click-left="handleBack"
  >
    <template v-slot:left>
      <div v-if="type === 'home'" class="items-center flex gap-[5px]">
        <img src="@/assets/png/icon.png" class="w-[28px]" />
        <img src="@/assets/png/TomUPShare.png" class="w-[106px] h-auto" />
      </div>

      <div class="flex items-center gap-[4px]" v-else>
        <van-icon name="arrow-left" size="24px" />
        {{ title }}
      </div>
    </template>
    <template v-slot:right>
      <van-icon name="bars" size="24px" @click="setShowRight(true)" />
    </template>
  </van-nav-bar>

  <!-- 右侧弹出 -->
  <van-popup
    safe-area-inset-top
    safe-area-inset-bottom
    v-model:show="showRight"
    position="right"
    :style="{ width: '100%', height: '100%', backgroundColor: '#000' }"
  >
    <Sidebar @close="setShowRight(false)"></Sidebar>
  </van-popup>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToggle } from '@vueuse/core'
import Sidebar from '@/components/Sidebar/index.vue'

const router = useRouter()
const props = withDefaults(
  defineProps<{
    title?: string
    leftArrow?: any
    url?: string
    type?: string
  }>(),
  {
    title: '',
    leftArrow: () => true,
    url: '',
    type: '',
  }
)
const emits = defineEmits(['back'])

const [showRight, setShowRight] = useToggle(false)

const handleBack = () => {
  if (props.type === 'home') {
    router.replace('home')
    return
  }
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
  background: #000;

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
