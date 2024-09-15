<template>
  <div class="px-[16px] pt-[24px]">
    <div class="common-linear py-[18px] px-[20px] relative">
      <img
        src="@/assets/friend/gift.svg"
        alt=""
        class="w-[48px] h-[48px] absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-50%] z-[2002]"
      />
      <div class="text-[20px] text-center my-[16px]">{{ t('bang-ding-huo-de-xin-ren-da-li')}}</div>
      <div class="mb-2.5">
        <span class="text-[14px] opacity-60">{{ t('jin-xian-bang-ding')}}</span>
        <span class="text-[14px] text-[#FF2A00] ml-0.5">&nbsp;{{ t('1-ci')}}</span>
      </div>
      <div class="mb-[24px]">
        <code-input
          ref="codeInput"
          inputType="text"
          width="100%"
          :maxlength="5"
          :focus="true"
        ></code-input>
      </div>
      <div class="my-button text-center bottom-[50px] w-[100%]">
        <van-button
          :loading="loading"
          class="shadow-btn-primary w-[50%]"
          type="primary"
          @click="handleBinding"
        >
          <div class="flex items-center gap-[8px]">
            <img src="@/assets/my/bind.png" alt="" class="h-[24px]" />
            <span>{{ t('bang-ding')}}</span>
          </div>
        </van-button>
      </div>
    </div>
    <div class="text-center pt-[30px]">
      <div @click="emit('close')">
        <img src="@/assets/svg/close.svg" class="inline-block w-[28px]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import CodeInput from '@/views/my/components/code-input.vue'
import { showToast } from 'vant'
import { bindInviteCode } from '@/services/user'
import useStore from '@/store'
import { useRoute } from 'vue-router'
import {useI18n} from "vue-i18n";
const {t} = useI18n();
const route = useRoute()
const { accountStore } = useStore()

const codeInput = ref(null)
const emit = defineEmits(['close', 'updateUserInfo', 'success'])

const loading = ref(false)
const handleBinding = async () => {
  const code = codeInput.value.codeValue
  if (code.length < 6) {
    return showToast('请输入验证码')
  }
  loading.value = true
  const res = await bindInviteCode(code)
  loading.value = false
  if (res.code == 200) {
    await accountStore.changeUserInfo()
    route.params.refresh = '1'
    emit('success')
    return showToast('绑定成功')
  }
}
</script>

<style scoped></style>
