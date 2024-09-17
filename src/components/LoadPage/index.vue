<template>
  <div
    class="fixed z-50 flex justify-center w-full bg-black"
  >
    <img src="@/assets/png/loading.png" class="w-[200px] mt-[100px]" />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">

.__spinner {
  position: relative;
  width: 68px;
  height: 68px;
  background-color: #41b883;
  animation: cube-shadow-spinner 1.8s cubic-bezier(0.75, 0, 0.5, 1) infinite;
}

@keyframes cube-shadow-spinner {
  50% {
    border-radius: 50%;
    transform: scale(0.5) rotate(360deg);
  }
  100% {
    transform: scale(1) rotate(720deg);
  }
}
</style>
