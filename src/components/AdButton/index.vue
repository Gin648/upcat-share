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
const props = defineProps<{
  size?: any
  loading: boolean
  disabled?: boolean
  classes?: string
  fallBack?: () => void
}>()

const onClick = () => {
  try {
    props?.fallBack()
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
