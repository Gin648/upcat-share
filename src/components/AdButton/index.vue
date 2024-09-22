<template>
  <div>
    <van-button
      :class="classes ?? 'shadow-btn-primary'"
      type="primary"
      :size="size"
      block
      :loading="loading || adLoading"
      :disabled="disabled"
      @click="onClick"
    >
      <slot></slot>
    </van-button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import useStore from '@/store'
import { addLookAd } from '@/services/user'
import { data } from 'autoprefixer'
import { showToast } from 'vant'
const { globalStore } = useStore()
const props = defineProps<{
  size?: any
  loading?: boolean
  disabled?: boolean
  classes?: string
  type: string
  sourceId?: any
  fallBack?: () => void
}>()

const adLoading = ref(false)
const onClick = async () => {
  if (globalStore.environment === 'webview') {
    const body = {
      type: 'ad',
      data: {
        type: 'loadRewardVideo',
      },
    }
    scriptHandler.postMessage(JSON.stringify(body))
    return
  } else {
    onReceived()
  }
}

const onReceived = async () => {
  try {
    adLoading.value = true
    const { success } = await addLookAd({
      type: props.type,
      sourceId: props.sourceId,
    })
    adLoading.value = false
    if (success) {
      props?.fallBack()
    }
  } catch (error) {
    console.log(error)
  }
}
// 激励视频监听
const webViewHandler = (body) => {
  if (body?.type === 'ad') {
    if (body?.data?.listenerType === 'onFail') {
      showToast('打开广告失败')
    } else if (body?.data?.listenerType === 'onError') {
      showToast('获取奖励失败')
    } else if (body?.data?.listenerType === 'onReward') {
      onReceived()
    }
  }
}

onBeforeMount(() => {
  window['webViewHandler'] = (info) => {
    webViewHandler(info)
  }
})
</script>

<style scoped></style>
