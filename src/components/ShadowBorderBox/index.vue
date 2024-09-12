<template>
  <div class="relative w-full" style="border-radius: 9px">
    <img :src="getSvg(icon)" class="box-shadow" style="border-radius: 9px" />
    <div class="absolute top-0 left-0 z-10 w-full h-full">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSvg } from '@/utils/utils'

withDefaults(
  defineProps<{
    icon?: string
  }>(),
  {
    icon: 'border_bg.svg',
  }
)
</script>

<style scoped lang="less">
.box-shadow {
  width: 100%;
  box-shadow: 0 -3px 6px #26b3f8;
}
</style>
