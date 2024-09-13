<template>
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
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { addLookAd } from '@/services/user'
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
</script>

<style scoped></style>
