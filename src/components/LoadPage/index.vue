<template>
  <div
    class="fixed z-50 flex items-center justify-center w-full h-full bg-black"
  >
    <div class="__spinner-container">
      <div class="__spinner"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.__spinner-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
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
