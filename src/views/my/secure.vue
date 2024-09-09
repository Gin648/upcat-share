<template>
  <!--  安全密码-->
  <nav-bar title="安全密码"></nav-bar>
  <div class="secure px-[20px] mt-2.5">
    <div class="mb-[16px]">
      <div class="text-[16px] opacity-80 mb-2.5">输入新密码</div>
      <div class="field-grey ">
        <van-field
            v-model="onePassword"
            placeholder="请输入"
            type="password"
        />
      </div>
    </div>
    <div class="mb-[16px]">
      <div class="text-[16px] opacity-80 mb-2.5">确认密码</div>
      <div class="field-grey ">
        <van-field
            v-model="twoPassword"
            placeholder="请输入"
            type="password"
        />
      </div>
    </div>

    <div class=" mb-[30px]">
      <div class="text-[16px] opacity-80 mb-2.5">邮箱验证码</div>
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


    <div class="gift-button flex items-center justify-between w-[100%] mt-[30px]" @click="handleCopyLink">
      <van-button class="shadow-btn-primary w-[100%]" type="primary">
        <div class="flex items-center gap-[8px]">
          <span>修改密码</span>
        </div>
      </van-button>
    </div>
  </div>

</template>
<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {showToast} from "vant";
import {useRoute, useRouter} from 'vue-router';
import {useToggle} from "@vueuse/core";
import {register, sendEmailCode} from "@/services/login";
import useStore from "@/store";
import {changePassword} from "@/services/user";

const router = useRouter()
const countDownNew = ref(null)
const isCountDownNew = ref(false)
const [newCodeLoading, setNewCodeLoading] = useToggle(false)
const countDownTime = ref(180 * 1000)
const {accountStore} = useStore()
const onePassword = ref('')
const twoPassword = ref('')
const form = reactive({
  email: accountStore.$state.userInfo.email,
  emailCode: '',
})

const handleCopyLink = async () => {
  if (!onePassword.value || !twoPassword.value) {
    return showToast('请输入密码')
  }
  if (onePassword.value !== twoPassword.value) {
    return showToast('俩次输入密码不一致,请重新输入')
  }
  if (!form.emailCode) {
    return showToast('请输入邮箱验证码')
  }
  const res = await changePassword({
    type: 2,
    newPassword: twoPassword.value,
    mailCode: form.emailCode
  })
  if (res.code == 200) {
    onePassword.value = ''
    twoPassword.value = ''
    form.emailCode = ''
    countDownTime.value = 180 * 1000
    countDownTime.value = false
    return showToast('修改成功')
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
  const {success} = await sendEmailCode({
    email: form.email,
    type: 2,
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
  const {success, data}: any = await register({
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
.send-msg {
  color: #1ba0ff;
  font-size: 16px;
}
</style>