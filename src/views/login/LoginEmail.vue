<template>
  <div class="login-wrapper">
    <BackIcon class="header" />
    <div class="title">开启你的UP之旅</div>
    <div class="sub-title my-[4px]">登录TomUP</div>
    <div class="level-3-title mb-[60px]">输入邮箱获取验证码注册/登录</div>
    <div class="w-full">
      <div class="field-lable">邮箱</div>
      <div class="field-grey mb-[16px]">
        <van-field
          :error="formError.email"
          placeholder="请输入"
          autocomplete="off"
          v-model="form.email"
        />
      </div>
      <div class="field-lable">输入验证码</div>
      <div class="field-grey mb-[30px]">
        <van-field
          placeholder="请输入"
          autocomplete="off"
          :error="formError.emailCode"
          v-model="form.emailCode"
        >
          <template #button>
            <div @click="_sendEmailCodeNew">
              <div class="flex gap-2">
                <span v-if="!isCountDownNew" class="send-msg">发送验证码</span>
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
    <div class="pb-[3px] w-full rounded-[4px] border-[1.5px] border-black">
      <van-button
        :loading="btnLoading"
        :disabled="canNext"
        @click="onRegister"
        class="shadow-btn-primary"
        type="primary"
        block
      >
        <span class="text-[18px]"> 注册/登陆 </span>
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useToggle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import BackIcon from '@/components/BackIcon/index.vue'
import { showToast } from 'vant'
import { sendEmailCode, register } from '@/services/login'
import useStore from '@/store'
const { accountStore } = useStore()

const router = useRouter()
const countDownNew = ref(null)
const isCountDownNew = ref(false)
const [newCodeLoading, setNewCodeLoading] = useToggle(false)
const countDownTime = ref(180 * 1000)

const onFinishNew = () => {
  isCountDownNew.value = false
  countDownNew.value.reset()
}
const startCountDownNew = () => {
  isCountDownNew.value = true
  countDownNew.value.start()
}

const form = reactive({
  email: '',
  emailCode: '',
})
const canNext = computed(() => {
  if (!form.email || !form.emailCode) {
    return true
  }
  return false
})

const handleTo = (path) => {
  router.push(path)
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
    type: 0,
  })
  setNewCodeLoading(false)
  if (success) {
    startCountDownNew()
    showToast('邮箱验证码已发送，请注意查收！')
  }
}

const [btnLoading, setBtnLoading] = useToggle(false)
const onRegister = async () => {
  setBtnLoading(true)
  // 登录类型 1.邮箱验证码 2.密码
  const { success, data }: any = await register({
    email: form.email,
    emailCode: form.emailCode,
  })
  setBtnLoading(false)
  if (success) {
    accountStore.changeToken(data.token)
    accountStore.changeUserInfo()
    handleTo('/')
  }
}
</script>

<style scoped lang="less">
.login-wrapper {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 100px 22px;
  .header {
    position: fixed;
    height: 44px;
    width: 100%;
    top: 0;
    padding-left: 18px;
    z-index: 50;
  }
}

.send-msg {
  color: #1ba0ff;
  font-size: 16px;
}
</style>
