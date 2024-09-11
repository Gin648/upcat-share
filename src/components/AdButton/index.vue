<template>
  <van-button
    :class="classes ?? 'shadow-btn-primary'"
    type="primary"
    :size="size"
    block
    :loading="loading"
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

const onClick = async () => {
  try {
    const { success } = await addLookAd({
      type: props.type,
      sourceId: props.sourceId,
    })
    if (success) {
      props?.fallBack()
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
