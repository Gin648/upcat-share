<template>
  <div class="pt-[20px] flex flex-col">
    <Info />
    <Gold></Gold>
    <Cat>
      <LeftColumn></LeftColumn>
      <RightColumn @handleTo="handleTo"></RightColumn>
      <Energy></Energy>
    </Cat>
  </div>
</template>

<script setup lang="ts" name="Home">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Info from './components/Info.vue'
import Gold from './components/Gold.vue'
import Cat from './components/Cat.vue'
import LeftColumn from './components/LeftColumn.vue'
import RightColumn from './components/RightColumn.vue'
import Energy from './components/Energy.vue'

const router = useRouter()
const handleTo = (path) => {
  router.push(path)
}
</script>

<style lang="less" scoped>
//
</style>
