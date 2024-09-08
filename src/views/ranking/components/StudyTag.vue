<template>
  <div class="flex w-full rounded-3xl p-0.5" :style="{ background: bgcolor }">
    <div
      class="flex-1 py-2.5 text-center text-base rounded-3xl"
      :class="{ 'bg-[#F4D316] text-black': value === item.value }"
      v-for="item in list"
      :key="item.value"
      @click="emits('onChange', item.value)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  list: {
    default: () => [],
  },
  value: {
    type: Number,
    default: null,
  },
  bgcolor: {
    type: String,
    default: '#282B30',
  },
})

const emits = defineEmits(['onChange'])
</script>

<style scoped></style>
