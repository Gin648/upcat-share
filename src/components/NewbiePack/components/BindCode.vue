<template>
  <bind-code @close="emit('close')" @success="emit('success')"></bind-code>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BindCode from '@/views/my/components/bindCode.vue'

const emit = defineEmits(['close', 'success'])
</script>

<style scoped></style>
