<template>
  <div class="w-full h-full px-[16px] overflow-y-auto">
    <div class="h-[44px] flex items-center justify-end">
      <van-icon size="26px" name="cross" @click="emit('close')" />
    </div>

    <div
      v-for="item in barList"
      :key="item.id"
      @click="changePage(item)"
      class="py-[16px] border-b border-solid border-white/20"
    >
      {{ item.text }}
    </div>

    <van-popup
      class="van-popup--transparent"
      v-model:show="showPicker"
      teleport="#app"
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
        <div class="h-[30px]"></div>
        <van-button
          type="primary"
          class="shadow-btn-primary"
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
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAccount } from '@/hooks/useAccount'

const { onLogout } = useAccount()
const { t } = useI18n()

const router = useRouter()
const emit = defineEmits(['close'])

const barList = computed(() => {
  return [
    {
      id: 1,
      text: t('shou-ye'),
      path: '/home',
    },
    {
      id: 2,
      text: t('fen-jie-ji-lu'),
      path: '/home',
    },
    {
      id: 3,
      text: t('wo-de-yong-hu'),
      path: '/home',
    },
    {
      id: 4,
      text: t('ren-yuan-guan-li'),
      path: '/home',
    },
    {
      id: 5,
      text: t('yu-yan'),
      path: '',
    },
    {
      id: 6,
      text: t('tui-chu-deng-lu'),
      path: '',
    },
  ]
})

const changePage = (item) => {
  if (item.path) {
    router.push({
      path: item.path,
    })
    emit('close')
  } else {
    if (item.id === 5) {
      showPicker.value = true
      emit('close')
    } else if (item.id === 6) {
      onLogout()
    }
  }
}

const showPicker = ref(false)
const langOptions = [
  { text: '简体中文', value: 'zh' },
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
