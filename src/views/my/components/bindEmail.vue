<template>
  <div class="px-[16px] py-[24px]">
    <div class="common-linear py-[18px] px-[20px] relative">
      <div class="text-[20px] text-center mb-[16px]">绑定邮箱</div>

      <div class="secure mt-2.5">
        <div class="mb-[16px]">
          <div class="text-[16px] opacity-80 mb-2.5">邮箱地址</div>
          <div class="field-grey">
            <van-field
              :error="formError.email"
              v-model="form.email"
              placeholder="请输入"
            />
          </div>
        </div>

        <div class="mb-[30px]">
          <div class="text-[16px] opacity-80 mb-2.5">验证码</div>
          <div class="field-grey">
            <van-field
              placeholder="请输入"
              autocomplete="off"
              :error="formError.emailCode"
              v-model="form.emailCode"
            >
              <template #button>
                <div @click="_sendEmailCodeNew">
                  <div class="flex gap-2">
                    <span v-if="!isCountDownNew" class="send-msg"
                      >发送验证码</span
                    >
                    <van-count-down
                      v-show="isCountDownNew"
                      ref="countDownNew"
                      class="send-msg"
                      :auto-start="false"
                      :time="countDownTime"
                      format="ss"
                      @finish="onFinishNew"
                    />
                    <van-loading
                      color="#1ba0ff"
                      size="16px"
                      v-if="newCodeLoading"
                    />
                  </div>
                </div>
              </template>
            </van-field>
          </div>
        </div>

        <div class="gift-button flex items-center justify-center w-[100%]">
          <van-button
            :disabled="!form.emailCode || !form.email"
            :loading="btnLoading"
            class="shadow-btn-primary w-[176px]"
            type="primary"
            @click="handleClickBind"
          >
            <div class="flex items-center gap-[8px]">
              <img src="@/assets/my/bind.png" alt="" class="h-[24px]" />
              <span>绑定</span>
            </div>
          </van-button>
        </div>
      </div>
    </div>
    <div class="text-center pt-[30px]">
      <div class="inline-block" @click="emit('close')">
        <img src="@/assets/svg/close.svg" class="w-[28px]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToggle } from '@vueuse/core'
import useStore from '@/store'
import { showToast } from 'vant'
import { sendEmailCode } from '@/services/login'
import { telegramMiniBindEmail } from '@/services/telegram'

const emit = defineEmits(['close', 'updateUserInfo'])

const router = useRouter()
const countDownNew = ref(null)
const isCountDownNew = ref(false)
const [newCodeLoading, setNewCodeLoading] = useToggle(false)
const countDownTime = ref(180 * 1000)
const { accountStore } = useStore()
const form = reactive({
  email: '',
  emailCode: '',
})

const init = () => {
  form.email = ''
  form.emailCode = ''
  formError.email = false
  formError.emailCode = false
}

const [btnLoading, setBtnLoading] = useToggle(false)

const handleClickBind = async () => {
  if (!form.email) {
    return showToast('请输入邮箱')
  }
  if (!form.emailCode) {
    return showToast('请输入邮箱验证码')
  }
  setBtnLoading(true)
  const { success } = await telegramMiniBindEmail(form)
  setBtnLoading(false)
  if (success) {
    showToast('邮箱绑定成功！')
    accountStore.changeUserInfo()
  }
}

const onFinishNew = () => {
  isCountDownNew.value = false
  countDownNew.value.reset()
}
const startCountDownNew = () => {
  isCountDownNew.value = true
  countDownNew.value.start()
}

const formError = reactive({
  email: false,
  emailCode: false,
})

const _sendEmailCodeNew = async () => {
  if (newCodeLoading.value) return
  if (isCountDownNew.value) return
  if (!form.email) {
    formError.email = true
    return
  }
  setNewCodeLoading(true)
  const { success } = await sendEmailCode({
    email: form.email,
    type: 5,
  })
  setNewCodeLoading(false)
  if (success) {
    startCountDownNew()
    showToast('邮箱验证码已发送，请注意查收！')
  }
}

defineExpose({
  init,
})
</script>

<style scoped lang="less">
.send-msg {
  color: #1ba0ff;
  font-size: 16px;
}
</style>
