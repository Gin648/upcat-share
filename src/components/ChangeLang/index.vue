<template>
  <div>
    <div
      @click="showPicker = true"
      class="min-w-[42px] px-[6px] flex flex-col items-center gap-1"
    >
      <div class="text-[12px] font-semibold">EN</div>
      <img src="@/assets/svg/change.svg" class="w-[14px] h-auto" />
    </div>

    <van-popup
      class="van-popup--transparent"
      v-model:show="showPicker"
      round
      position="bottom"
    >
      <div class="lang-picker px-[16px] pb-[20px]">
        <van-picker
          v-model="selectedValues"
          ref="picker"
          :columns="langOptions"
          :show-toolbar="false"
          @cancel="showPicker = false"
        />

        <van-button
          type="primary"
          class="mt-[30px] shadow-btn-primary"
          block
          @click="onConfirm"
        >
          <span>{{ t('que-ding') }}</span>
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { setLocale, getDefaultLanguage } from '@/locales'
import {useI18n} from "vue-i18n";
const {t} = useI18n();
const showPicker = ref(false)
const langOptions = [
  // { text: '简体中文', value: 'zh' },
  { text: 'English', value: 'en' },
]

const selectedValues = ref([])

const picker = ref(null)
const onConfirm = () => {
  showPicker.value = false
  const selectedOptions = picker.value?.getSelectedOptions()
  setLocale(selectedOptions[0].value)
}
onMounted(() => {
  selectedValues.value = [getDefaultLanguage()]
})
</script>

<style scoped lang="less">
.lang-picker {
  :deep(.van-picker) {
    border-radius: 12px;
    color: #fff;
    overflow: hidden;
    background: linear-gradient(180deg, #4b4f55 0%, #232830 100%);
    .van-picker__mask {
      background-image: linear-gradient(
          180deg,
          rgba(75, 79, 85, 1),
          rgba(75, 79, 85, 0)
        ),
        linear-gradient(0deg, rgba(75, 79, 85, 1), rgba(75, 79, 85, 0)) !important;
    }

    .van-picker-column__item {
      color: #fff;
    }
    .van-picker__frame {
      // background: rgba(0, 0, 0, 0.6);
      border-radius: 8px;
    }
    .van-picker__frame:after {
      border-width: 0px !important;
    }

    .van-picker-column__item--selected {
      display: block;
      height: 44px;
      text-align: center;
      background: #292d34;
      line-height: 44px;
      margin: 0 20px;
      border-radius: 8px;
    }
  }
}
</style>
