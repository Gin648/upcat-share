<template>
  <div
    class="app-wrapper pb-[100px]"
    :class="{
      'home-bg': (currentPath || '').indexOf('/home'.split('-')[0]) != -1,
    }"
  >
    <!-- <nav-bar /> -->
    <router-view class="h-full" v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <tabbar />
  </div>
</template>

<script setup lang="ts">
import tabbar from '@/components/Tabbar/index.vue'
import NavBar from '@/components/NavBar/index.vue'
import { useCachedViewStoreHook } from '@/store/modules/cachedView'
import { useDarkMode } from '@/hooks/useToggleDarkMode'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList
})

const router = useRouter()
const currentPath = computed(() => {
  return router.currentRoute.value.path || '/'
})
</script>

<style lang="less" scoped>
@import '@/styles/mixin.less';

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}

.home-bg {
  background-image: url('@/assets/home/home_bg.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
