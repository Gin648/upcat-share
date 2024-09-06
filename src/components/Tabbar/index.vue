<template>
  <div class="upcat-bar">
    <div class="flex items-center justify-between w-full px-2">
      <RouterLink
        v-for="item in tabbarData"
        :key="item.url"
        :to="item.url"
        class="flex-1 text-center text-primary"
        :class="
          item.url &&
          (currentPath || '').indexOf((item.url || '').split('-')[0]) != -1
            ? 'opacity-100 font-semibold'
            : 'opacity-30'
        "
      >
        <div v-if="item.url !== '/home'">
          <img
            class="object-cover block w-[40px] h-[40px] m-auto"
            :src="getImage(`tabbar/${item.icon}.svg`)"
          />
          <div class="text-[12px] mt-[4px]">{{ item.title }}</div>
        </div>
        <div class="relative w-full h-full" v-else>
          <img
            class="object-cover mb-[45px] w-[70px] h-auto mx-auto"
            :src="getImage(`tabbar/cat_claws.svg`)"
          />
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { $t } from '@/locales'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { getImage } from '@/utils/utils'
import useLocale from '@/hooks/useLocale'
const { currentLocale } = useLocale()
const { t } = useI18n()

const active = ref(0)
// 使用 computed 保持视图实时更新
const tabbarData = computed(() => [
  {
    icon: 'ranking',
    title: t('pai-hang'),
    url: '/ranking',
  },
  {
    icon: 'friend',
    title: '朋友',
    url: '/friend',
  },
  {
    icon: 'home',
    title: '主页',
    url: '/home',
  },

  {
    icon: 'star',
    title: '星星',
    url: '/star',
  },
  {
    icon: 'collection',
    title: '藏品',
    url: '/collection',
  },
])

const router = useRouter()
const currentPath = computed(() => {
  return router.currentRoute.value.path || '/'
})
</script>

<style lang="less" scoped>
.upcat-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: content-box;
  width: 100%;
  height: 96px;
  background: rgba(0, 0, 0, 0.2);
  background-blend-mode: overlay;
  box-shadow: 0px 0.962px 0.481px 0px rgba(255, 255, 255, 0.5) inset;
  filter: drop-shadow(0px -4.808px 28.846px rgba(41, 39, 130, 0.1));
  backdrop-filter: blur(38.4615364074707px);
  border-top-left-radius: 55px;
  border-top-right-radius: 55px;
}
</style>
