<template>
  <div>
    <van-popover
      v-model:show="showPopover"
      :actions="langOptions"
      @select="onSelectLang"
      placement="bottom-end"
    >
      <template #reference>
        <div class="min-w-[36px] px-[6px] flex flex-col items-center gap-1">
          <div class="text-[12px] font-semibold">简中</div>
          <img src="@/assets/svg/change.svg" class="w-[14px] h-auto" />
        </div>
      </template>
    </van-popover>
  </div>
</template>

<script setup lang="ts">
import { useToggleDarkMode } from '@/hooks/useToggleDarkMode'
import { ref } from 'vue'
import { setLocale } from '@/locales'

const showPopover = ref(false)
const langOptions = [
  { text: '简体中文', key: 'zh' },
  { text: 'English', key: 'en' },
]
const onSelectLang = (action) => {
  setLocale(action.key)
}
</script>

<style scoped></style>
