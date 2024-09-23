<template>
  <van-popup
    teleport="body"
    :show="show"
    style="width: 100vw"
    class="van-popup--transparent max-w-[100vw] w-[100vw]"
    :close-on-click-overlay="true"
    @close="() => emit('close')"
  >
    <div class="px-[16px] pt-[24px]">
      <div class="common-linear pb-[20px] px-[16px] relative">
        <div class="text-[20px] font-bold py-[20px] text-center">
          {{ name || t('ti-shi') }}
        </div>
        <slot></slot>
        <div class="w-[100%] flex flex-col gap-[10px]" v-if="!onBtn">
          <van-button
            :loading="loading"
            class="w-full shadow-btn-primary"
            type="primary"
            @click="emit('confirm')"
          >
            <div class="flex items-center gap-[8px]">
              <span class="text-[18px]">{{ t('que-ren') }}</span>
            </div>
          </van-button>
          <van-button
            class="w-full shadow-btn-grey"
            type="primary"
            @click="emit('close')"
          >
            <div class="flex items-center gap-[8px]">
              <span class="text-[18px]">{{ t('qu-xiao') }}</span>
            </div>
          </van-button>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps<{
  show: boolean
  loading?: boolean
  name?: string
  onBtn?: boolean
}>()
const emit = defineEmits(['close', 'confirm'])
</script>

<style scoped></style>
