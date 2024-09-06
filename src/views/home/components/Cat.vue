<template>
  <div
    class="flex items-end justify-center pb-[10px] pt-[80px] flex-1 relative"
  >
    <div class="w-full h-full bg">
      <slot></slot>
    </div>
    <!-- <img src="@/assets/home/cat.png" class="w-[220px]" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped>
.bg {
  background-image: url('@/assets/home/cat.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
