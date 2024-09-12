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
      <div class="common-linear py-[32px] px-[20px] relative">
        <div class="text-[20px] font-bold mb-[20px] text-center">
          {{ name || '提示' }}
        </div>
        <div
          class="text-[16px] mb-[20px] text-center flex items-center justify-center"
        >
          <slot></slot>
        </div>
        <div class="w-[100%] flex justify-around">
          <van-button
            class="shadow-btn-grey w-[30%] mr-5"
            type="primary"
            @click="emit('close')"
          >
            <div class="flex items-center gap-[8px]">
              <span class="text-[18px]">再想想</span>
            </div>
          </van-button>
          <van-button
            :loading="loading"
            class="shadow-btn-primary w-[60%]"
            type="primary"
            @click="emit('confirm')"
          >
            <div class="flex items-center gap-[8px]">
              <span class="text-[18px]">确认</span>
            </div>
          </van-button>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  loading?: boolean
  name?: string
}>()
const emit = defineEmits(['close', 'confirm'])
</script>

<style scoped></style>
